import React, {useCallback, useEffect} from "react";
import {Box, Slider, styled} from "@mui/material";
import {useAppSelector} from "../../../../../../app/hooks";
import {useAllSearchParams} from "../../../../../../hooks/useAllSearchParams";
import {useSearchParams} from "react-router-dom";
import {NavItemTitleBox} from "../components/NavItemTitleBox";

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
        <RangeSliderContainer>
            <NavItemTitleBox>
                Number of cards
            </NavItemTitleBox>
            <RangeSliderBox>
                <ViewSliderItem>
                    {value[0]}
                </ViewSliderItem>
                <CustomSlider
                    value={value}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommitted}
                    valueLabelDisplay="auto"
                    min={minCardsCount ? minCardsCount : 0}
                    max={maxCardsCount ? maxCardsCount : 0}
                    disabled={disabler}
                />
                <ViewSliderItem>
                    {value[1]}
                </ViewSliderItem>
            </RangeSliderBox>
        </RangeSliderContainer>
    );
};

export const CustomSlider = styled(Slider)(({theme}) => ({
    width: "155px",
    margin: "0 15px 0 15px",
    color: "var(--button-color1)",
}));

export const ViewSliderItem = styled(Box)(({theme}) => ({
    width: "36px",
    height: "36px",

    // background: "var()",
    color: "var(--text-color1)",

    border: "1px solid #D9D9D9",
    borderRadius: "2px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

export const RangeSliderBox = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

export const RangeSliderContainer = styled(Box)(({theme}) => ({
    margin: "0 15px 0 15px",

    [theme.breakpoints.down("md")]: {
        margin: "0 0 0 10px",
    },
    [theme.breakpoints.down("sm")]: {
        margin: "0 0 0 0",
    },
}));


