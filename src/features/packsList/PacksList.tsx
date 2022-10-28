import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    TextField,
    useTheme
} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {createPack, getAllPacks} from "./packsList-reducer";
import {useNavigate} from "react-router-dom";
import {setPackUserId} from "../packs/myPack/mypack-reducer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import TableHead from "@mui/material/TableHead";
import {PATH} from "../pages/Pages";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import SearchIcon from "@mui/icons-material/Search";
import style from "./packsList.module.scss"

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

export function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </Box>
    );
}

export const PacksList = () => {

    useEffect(() => {
        dispatch(getAllPacks({
            pageCount: 8
        }))
    }, []);

    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    // const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    // const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const cardPacks = useAppSelector(state => state.packs.cardPacks)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const userId = useAppSelector(state => state.packs._id)
    const page = useAppSelector(state => state.packs.page)

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const [valueTextField, setValueTextField] = useState<string>("")

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        dispatch(getAllPacks({
            page: ++newPage,
            pageCount: pageCount,
        }))
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(getAllPacks({
            pageCount: +event.target.value
        }))
    };

    const handleRedirect = (packId: string, userPackId: string) => {
        return () => {
            if (userId === userPackId) {
                navigate(PATH.MYPACK)
            } else {
                navigate(PATH.FRIENDSPACK)
            }
            dispatch(setPackUserId(packId))
        }
    }

    const addPackHandler = () => {
        dispatch(createPack({
            name: "New pack",
            private: false
        }))
    }

    function useDebounce<T>(value: T): void {
        const [debouncedValue, setDebouncedValue] = useState<T>(value)
        useEffect(() => {
            const timer = setTimeout(() => {
                setDebouncedValue(value);
                // if (debouncedValue) {
                //     dispatch(getCardsTC({
                //         cardsPack_id: packId,
                //         pageCount: pageCount,
                //         cardQuestion: valueTextField.trim()
                //     }))
                // }
            }, 500)
            return () => {
                clearTimeout(timer)
            }
        }, [debouncedValue, value])
    }

    useDebounce<string>(valueTextField)

    return (
        <Container fixed>
                    <div className={style.featuresContainer}>
                        <div className={style.headWithBut}>
                            <label style={{fontSize: "22px"}}><b>Pack List</b>
                                <IconButton size={"small"}>
                                    <MoreVertRoundedIcon/>
                                </IconButton>
                            </label>
                            <Button
                                sx={{borderRadius: "30px", width: "184px", heght: "36px"}} variant={"contained"}
                                onClick={addPackHandler}>Add new pack</Button>
                        </div>
                        <span style={{fontSize: "14px", marginTop: "28px"}}>
                            Search
                        </span>
                        <div>
                            <TextField className={style.inputMyPack} size={"small"} sx={{marginTop: "8px", height: "36px"}}
                                       InputProps={{
                                           startAdornment: <SearchIcon sx={{height: "19px", opacity: 0.5}}/>
                                       }}
                                       placeholder={`Provide your text`}
                                       value={valueTextField}
                                       onChange={(e) => {
                                           setValueTextField(e.currentTarget.value)
                                       }}
                            ></TextField>
                            <div>

                            </div>
                        </div>

                    </div>
                    <TableContainer component={Paper} sx={{maxWidth: 1008, margin: "0 auto 50px auto"}}>
                        <Table sx={{maxWidth: 1008}} aria-label="custom pagination table">
                            <TableHead sx={{background: "#EFEFEF"}}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Cards</TableCell>
                                    <TableCell align="right">
                                        Last Updated
                                        <IconButton size={"small"}>
                                            {true ?
                                                <ArrowDropDownIcon/>
                                                :
                                                <ArrowDropUpIcon/>}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">Created by</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                    <TableCell>Grade</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cardPacks.map((pack, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th"
                                                   scope="row"
                                                   sx={{cursor: "pointer"}}
                                                   onClick={handleRedirect(pack._id, pack.user_id)}>
                                            {pack.name}
                                        </TableCell>
                                        <TableCell style={{width: 200}} align="right">
                                            <div style={{width: 200, overflow: "hidden"}}>
                                                {pack.cardsCount}
                                            </div>
                                        </TableCell>
                                        <TableCell style={{width: 200}} align="right">
                                            {pack.updated}
                                        </TableCell>
                                        <TableCell style={{width: 160}} align="right">
                                            {pack.user_name}
                                        </TableCell>
                                        <TableCell style={{width: 110}} align="right">
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 8, 10]}
                                        colSpan={3}
                                        count={cardPacksTotalCount}
                                        rowsPerPage={pageCount}
                                        page={page - 1}
                                        SelectProps={{
                                            inputProps: {
                                                "aria-label": "Cards per Page",
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
        </Container>
    );
}