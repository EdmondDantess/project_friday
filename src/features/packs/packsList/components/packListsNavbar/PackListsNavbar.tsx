import React from "react";
import styles from "../../packsList.module.scss";
import {IconButton} from "@mui/material";
import {SearchField} from "./search/SearchField";
import {ToggleUserButton} from "./toggleUserButton/ToggleUserButton";
import {RangeSlider} from "./rangeSlider/RangeSlider";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
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
        <div className={styles.featuresContainer}>
            <div className={styles.headWithBut}>
                <div className={styles.title}>
                    Packs list
                </div>
                <div>
                    <ModalEditAddPack icon={"Add new pack"}/>
                </div>
            </div>
            <div className={styles.componentsContainer}>
                <SearchField/>
                <ToggleUserButton/>
                <RangeSlider/>
                <div className={styles.dropFilters}>
                    <IconButton disabled={disabler} onClick={dropFiltersHandler}>
                        <FilterAltOffIcon/>
                    </IconButton>
                </div>
            </div>
        </div>

    )
})