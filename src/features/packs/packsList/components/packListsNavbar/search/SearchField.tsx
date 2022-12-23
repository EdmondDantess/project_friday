import React, {useEffect, useState} from "react";
import {IconButton, styled, TextField} from "@mui/material";
import styles from "../../../packsList.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import {useAppSelector} from "../../../../../../app/hooks";
import {useDebounce} from "../../../../../../hooks/useDebounce/useDebounce";
import ClearIcon from "@mui/icons-material/Clear";
import {useSearchParams} from "react-router-dom";
import {useAllSearchParams} from "../../../../../../hooks/useAllSearchParams";

export const SearchField = React.memo(() => {

    const disabler = useAppSelector(state => state.packs.disabler)

    const params = useAllSearchParams();

    const [valueTextField, setValueTextField] = useState<string>(params["packName"])
    const debouncedSearch = useDebounce<string>(valueTextField)

    let [searchParams, setSearchParams] = useSearchParams();

    const handleClearClick = () => {
        setValueTextField("")
    }

    useEffect(() => {
        setSearchParams({...params, "packName": valueTextField})
    }, [debouncedSearch]);

    useEffect(() => {
        if (params["packName"] !== valueTextField) {
            setValueTextField(params["packName"])
        }
    }, [params["packName"]]);

    return (
        <div>
            <div className={styles.fieldTitle}>
                Search
            </div>
            <TextField className={styles.inputPack}
                       size={"small"}
                       value={valueTextField}
                       placeholder={`Search...`}
                       sx={{height: "36px", minWidth: "420px"}}
                       InputProps={{
                           startAdornment: <SearchIcon sx={{height: "19px", opacity: 0.5}}/>,
                           endAdornment: (<IconButton sx={{visibility: valueTextField ? "visible" : "hidden"}}
                                                      onClick={handleClearClick}
                           ><ClearIcon/></IconButton>),
                       }}
                       onChange={(e) => {
                           setValueTextField(e.currentTarget.value)
                       }}
                       disabled={disabler}
            ></TextField>
        </div>
    );
});

export const SearchTextField = styled(TextField)(({theme}) => ({
    "&.Mui-disabled": {
        background: "#1976d2",
        color: "#fff",
    }
}));