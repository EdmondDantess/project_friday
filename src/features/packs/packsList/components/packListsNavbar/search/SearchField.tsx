import React, {useEffect, useState} from "react";
import {Box, IconButton, styled, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useAppSelector} from "../../../../../../app/hooks";
import {useDebounce} from "../../../../../../hooks/useDebounce/useDebounce";
import ClearIcon from "@mui/icons-material/Clear";
import {useSearchParams} from "react-router-dom";
import {useAllSearchParams} from "../../../../../../hooks/useAllSearchParams";
import {NavItemTitleBox} from "../components/NavItemTitleBox";

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
        <SearchFieldContainer>
            <NavItemTitleBox>
                Search
            </NavItemTitleBox>
            <SearchTextField size={"small"}
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
            ></SearchTextField>
        </SearchFieldContainer>
    );
});

export const SearchTextField = styled(TextField)(({theme}) => ({
    padding: "0 0 5px 0",
    "&.Mui-disabled": {
        background: "#1976d2",
        color: "#fff",
    },
    [theme.breakpoints.down("xl")]: {
        minWidth: "420px"
    },
    [theme.breakpoints.down("lg")]: {
        minWidth: "220px"
    },
    [theme.breakpoints.down("md")]: {
        minWidth: "100%",
    },
}));

export const SearchFieldContainer = styled(Box)(({theme}) => ({
    margin: "0 15px 3px 0",
    [theme.breakpoints.down("xl")]: {

    },
    [theme.breakpoints.down("lg")]: {

    },
    [theme.breakpoints.down("md")]: {
        flex: "1 1 100%",
        margin: "0 0 15px 0",
    },
}));
