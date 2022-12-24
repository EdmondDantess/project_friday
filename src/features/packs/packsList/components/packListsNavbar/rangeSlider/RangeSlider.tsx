import React, {useCallback, useEffect} from "react";
import styles from "../../../packsList.module.scss";
import {Box, Slider} from "@mui/material";
import {useAppSelector} from "../../../../../../app/hooks";
import {useAllSearchParams} from "../../../../../../hooks/useAllSearchParams";
import {useSearchParams} from "react-router-dom";

export const RangeSlider = () => {

    const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);

    const disabler = useAppSelector(state => state.packs.disabler)

    const params = useAllSearchParams();
    let [searchParams, setSearchParams] = useSearchParams();

    const [value, setValue] = React.useState<number[]>([minCardsCount ? minCardsCount : 0, maxCardsCount ? maxCardsCount : 0]);

    useEffect(() => {
        if (params.min !== "" || params.max !== "") {
            setValue([params.min ? +params.min : minCardsCount || 0, params.max ? +params.max : maxCardsCount || 0]);
        } else {
            setValue([minCardsCount ? minCardsCount : 0, maxCardsCount ? maxCardsCount : 0]);
        }
    }, [minCardsCount, maxCardsCount, params.min, params.max]);

    const handleChange = useCallback((event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    }, []);

    const handleChangeCommitted = (
        event: Event | React.SyntheticEvent<Element, Event>,
        value: number | number[],
    ) => {
        if (Array.isArray(value)) {
            setSearchParams({...params, "min": `${value[0]}`, "max": `${value[1]}`})
        }
    }

    return (
        <div className={styles.rangeSliderContainer}>
            <div className={styles.fieldTitle}>
                Number of cards
            </div>
            <div className={styles.rangeSlider}>
                <div className={styles.rangeSliderValueBox}>
                    {value[0]}
                </div>
                <Box sx={{width: 155, margin: "5px 15px 0 15px"}}>
                    <Slider
                        value={value}
                        onChange={handleChange}
                        onChangeCommitted={handleChangeCommitted}
                        valueLabelDisplay="auto"
                        min={minCardsCount ? minCardsCount : 0}
                        max={maxCardsCount ? maxCardsCount : 0}
                        disabled={disabler}
                    />
                </Box>
                <div className={styles.rangeSliderValueBox}>
                    {value[1]}
                </div>
            </div>
        </div>
    );
};

