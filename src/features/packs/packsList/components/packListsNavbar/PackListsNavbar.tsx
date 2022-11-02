import React from "react";
import styles from "../../packsList.module.scss";
import {Button, IconButton} from "@mui/material";
import {SearchField} from "./search/SearchField";
import {ToggleUserButton} from "./toggleUserButton/ToggleUserButton";
import {RangeSlider} from "./rangeSlider/RangeSlider";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {createPack, dropFilters} from "../../packsList-reducer";
import {useAppDispatch} from "../../../../../app/hooks";
import {useNavigate} from "react-router-dom";

export const PackListsNavbar = React.memo(() => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    //-----Add Pack-----

    const addPackHandler = () => {
        dispatch(createPack({name: "New pack", private: false}))
    }

    //-----Drop-filters-----

    const dropFiltersHandler = () => {
        navigate("/packslist/all")
        dispatch(dropFilters())
    }

    return (
        <div className={styles.featuresContainer}>
            <div className={styles.headWithBut}>
                <div className={styles.title}>
                    Packs list
                </div>
                <div>
                    <Button
                    sx={{borderRadius: "30px", width: "184px", height: "36px"}} variant={"contained"}
                    onClick={addPackHandler}>Add new pack
                </Button>
                </div>

            </div>
            <div className={styles.componentsContainer}>
                <SearchField/>
                <ToggleUserButton/>
                <RangeSlider/>
                <div className={styles.dropFilters}>
                    <IconButton onClick={dropFiltersHandler}>
                        <FilterAltOffIcon/>
                    </IconButton>
                </div>
            </div>
        </div>

    )
})