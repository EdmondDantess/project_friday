import React from "react";
import {Box, IconButton, styled} from "@mui/material";
import {SearchField} from "./search/SearchField";
import {ToggleUserButton} from "./toggleUserButton/ToggleUserButton";
import {RangeSlider} from "./rangeSlider/RangeSlider";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {useAppSelector} from "../../../../../app/hooks";
import {ModalEditAddPack} from "../modalPack/ModalPack";
import {useSearchParams} from "react-router-dom";


export const PackListsNavbar = React.memo(() => {

    const defaultQueryParams = useAppSelector(state => state.packs.defaultQueryParams)

    const disabler = useAppSelector(state => state.packs.disabler)

    let [searchParams, setSearchParams] = useSearchParams()

    //-----Drop-filters-----

    const dropFiltersHandler = () => {
        setSearchParams(defaultQueryParams)
    }

    return (
        <PackListsNavbarContainer>
            <PackListsNavbarTitleContainer>
                <PackListsNavbarTitle>
                    Packs list
                </PackListsNavbarTitle>
                <ModalEditAddPack icon={"Add new pack"}/>
            </PackListsNavbarTitleContainer>
            <PackListsNavComponentsContainer>
                <SearchField/>
                <ToggleUserButton/>
                <RangeSlider/>
                <DropFiltersContainer>
                    <IconButton disabled={disabler} onClick={dropFiltersHandler}>
                        <FilterAltOffIcon/>
                    </IconButton>
                </DropFiltersContainer>
            </PackListsNavComponentsContainer>
        </PackListsNavbarContainer>
    )
})

export const PackListsNavbarContainer = styled(Box)(({theme}) => ({
    width: "1008px",
    minHeight: "100px",
    margin: "40px auto 25px auto",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",

    [theme.breakpoints.down("lg")]: {
        width: "852px",
    },
    [theme.breakpoints.down("md")]: {
        width: "552px",
    },
    [theme.breakpoints.down("md")]: {
        maxWidth: "100%",
    },
}));

export const PackListsNavbarTitleContainer = styled(Box)(({theme}) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
}));

export const PackListsNavbarTitle = styled(Box)(({theme}) => ({
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "22px",
    lineHeight: "27px",
}));

export const DropFiltersContainer = styled(Box)(({theme}) => ({
    margin: "22px 0 0 auto",

    // [theme.breakpoints.down("sm")]: {
    //     margin: "22px 0 0 auto",
    // }
}));

export const PackListsNavComponentsContainer = styled(Box)(({theme}) => ({
    margin: "25px 0 0 0",

    display: "flex",
    alignItems: "flex-end",
    flexWrap: "wrap",

    // [theme.breakpoints.down("md")]: {
    //     alignItems: "center",
    // }
}));