import React, {useCallback, useEffect} from "react";
import styles from "../../../packsList.module.scss";
import {Box, Slider} from "@mui/material";
import {setMinMaxCards} from "../../../packsList-reducer";
import {useAppDispatch, useAppSelector} from "../../../../../../app/hooks";
import {useAllSearchParams} from "../../../../../../hooks/useAllSearchParams";
import {useSearchParams} from "react-router-dom";

export const RangeSlider = () => {

    const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
    const isFetching = useAppSelector(state => state.packs.isFetching)

    const disabler = useAppSelector(state => state.packs.disabler)

    const dispatch = useAppDispatch();
    const params = useAllSearchParams();
    let [searchParams, setSearchParams] = useSearchParams();

    const [value, setValue] = React.useState<number[]>([minCardsCount ? minCardsCount : 0, maxCardsCount ? maxCardsCount : 0]);

    useEffect(() => {
        setValue([minCardsCount ? minCardsCount : 0, maxCardsCount ? maxCardsCount : 0]);
    }, [minCardsCount, maxCardsCount, isFetching]);


    const handleChange = useCallback((event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    }, []);

    const handleChangeCommitted = useCallback((
        event: Event | React.SyntheticEvent<Element, Event>,
        value: number | number[],
    ) => {
        if (Array.isArray(value)) {
            dispatch(setMinMaxCards(value[0], value[1]));
        }
    },[dispatch]);

    return (
        <div className={styles.rangeSliderContainer}>
            <div className={styles.fieldTitle}>
                Number of cards
            </div>
            <div className={styles.rangeSlider}>
                <div className={styles.rangeSliderValueBox}>
                    {value[0]}
                </div>
                <Box sx={{width: 155, margin: '5px 15px 0 15px'}}>
                    <Slider
                        value={value}
                        onChange={handleChange}
                        onChangeCommitted={handleChangeCommitted}
                        valueLabelDisplay="auto"
                        min={minCardsCount ? minCardsCount : 0}
                        max={maxCardsCount ? maxCardsCount: 0}
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

