import React from "react";
import styles from "../../packsList.module.scss";
import {IconButton} from "@mui/material";
import {SearchField} from "./search/SearchField";
import {ToggleUserButton} from "./toggleUserButton/ToggleUserButton";
import {RangeSlider} from "./rangeSlider/RangeSlider";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {
    setMinMaxCards,
    setMinMaxCardsCount,
    setPackName,
    setPage,
    setPageCount,
    setSearchUserId,
    setSortPacks
} from "../../packsList-reducer";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {ModalEditAddPack} from "../modalPack/ModalPack";
import {useSearchParams} from "react-router-dom";
import {startCircular} from "../../../../userFeedback/userFeedback-reducer";

export const PackListsNavbar = React.memo(() => {

    const disabler = useAppSelector(state => state.packs.disabler)

    let [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useAppDispatch()

    //-----Drop-filters-----

    const dropFiltersHandler = () => {
        setSearchParams({pack: "all"})
        dispatch(startCircular())
        dispatch(setPackName(""))
        dispatch(setSearchUserId(""))
        dispatch(setMinMaxCards(null, null))
        dispatch(setMinMaxCardsCount(null, null))
        dispatch(setSortPacks(""))
        dispatch(setPage(1))
        dispatch(setPageCount(8))
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