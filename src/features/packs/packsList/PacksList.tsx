import React, {useCallback, useEffect, useState} from "react";
import {
    Box,
    Button,
    Container,
    IconButton,
    Paper,
    Slider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    useTheme
} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {createPack, deletePack, getAllPacks} from "./packsList-reducer";
import {useNavigate} from "react-router-dom";
import {setPackUserId} from "../myPack/mypack-reducer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import TableHead from "@mui/material/TableHead";
import {PATH} from "../../pages/Pages";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./packsList.module.scss"
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SchoolIcon from "@mui/icons-material/School";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

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

    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const cardPacks = useAppSelector(state => state.packs.cardPacks)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const isLogged = useAppSelector(state => state.profile.isLogged)
    const userId = useAppSelector(state => state.packs._id)
    const page = useAppSelector(state => state.packs.page)

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) {
            return navigate(PATH.LOGIN)
        }
    }, [navigate, isLogged])

    useEffect(() => {
        dispatch(getAllPacks({
            pageCount: 8
        }))
    }, []);

    //-----Pagination------

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

    //-----Redirect-to-friendsPack-or-MyPack-----

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
        dispatch(createPack({name: "New pack", private: false},
            {
                pageCount: pageCount,
            }))
    }

    //------Toggle-Button-all-my------

    const [alignment, setAlignment] = React.useState("all");

    const handleChange = useCallback(
        (
            event: React.MouseEvent<HTMLElement>,
            newAlignment: string,
        ) => {
            if (newAlignment === "all") {
                dispatch(getAllPacks({
                    pageCount: pageCount,
                }))
            }
            if (newAlignment === "my") {
                dispatch(getAllPacks({
                    user_id: userId,
                    pageCount: pageCount,
                }))
            }
            setAlignment(newAlignment);
        }, [dispatch]);


    //------Search-Debounce-----

    function useSearchDebounce<T>(value: T): void {
        const [debouncedValue, setDebouncedValue] = useState<T>(value)
        useEffect(() => {
            const timer = setTimeout(() => {
                setDebouncedValue(value);
                if (debouncedValue) {
                    dispatch(getAllPacks({
                        pageCount: pageCount,
                        packName: valueTextField.trim()
                    }))
                }
            }, 500)
            return () => {
                clearTimeout(timer)
            }
        }, [debouncedValue, value])
    }

    useSearchDebounce<string>(valueTextField)

    //-----Range-Slider------

    const [rangeValue, setRangeValue] = React.useState<number[]>([minCardsCount, maxCardsCount]);

    const handleRangeChange = (event: Event, newValue: number | number[]) => {
        setRangeValue(newValue as number[]);
    };

    function useRangeDebounce<T>(value: T, data: any): void {
        const [rangeDebouncedValue, setRangeDebouncedValue] = useState<T>(value)
        useEffect(() => {
            const timer = setTimeout(() => {
                setRangeDebouncedValue(value);
                if (rangeDebouncedValue) {
                    dispatch(getAllPacks({
                        pageCount: pageCount,
                        ...data
                    }))
                }
            }, 500)
            return () => {
                clearTimeout(timer)
            }
        }, [rangeDebouncedValue, value])
    }

    useRangeDebounce<number[]>(rangeValue, {min: rangeValue[0], max: rangeValue[1]})

    //-----Delete Pack-----

    const deletePackHandler = (id: string) => {
        return () => {
            dispatch(deletePack(id, {
                pageCount,
                page
            }))
        }
    }

    return (
        <Container fixed>
            <div className={styles.featuresContainer}>
                <div className={styles.headWithBut}>
                    <label style={{fontSize: "22px"}}>
                        <b>Pack List</b>
                    </label>
                    <Button
                        sx={{borderRadius: "30px", width: "184px", height: "36px"}} variant={"contained"}
                        onClick={addPackHandler}>Add new pack</Button>
                </div>
                <div className={styles.componentsContainer}>
                    {/*-----Debounced search field------*/}
                    <div>
                        <div style={{fontSize: "14px", marginTop: "28px"}}>
                            Search
                        </div>
                        <TextField className={styles.inputPack} size={"small"} sx={{marginTop: "8px", height: "36px"}}
                                   InputProps={{
                                       startAdornment: <SearchIcon sx={{height: "19px", opacity: 0.5}}/>
                                   }}
                                   placeholder={`Provide your text`}
                                   value={valueTextField}
                                   onChange={(e) => {
                                       setValueTextField(e.currentTarget.value)
                                   }}
                        ></TextField>
                    </div>
                    {/*-----ToggleButton all-my------*/}
                    <div className={styles.toggledButtonPack}>
                        <div style={{fontSize: "14px", margin: "23px 0 8px 0"}}>
                            Show packs cards
                        </div>
                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                            size={"small"}
                        >
                            <ToggleButton value="my" sx={{width: "100px"}}>My</ToggleButton>
                            <ToggleButton value="all" sx={{width: "100px"}}>All</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    {/*-----Range slider------*/}
                    <div className={styles.rangeSliderContainer}>
                        <div style={{fontSize: "14px", margin: "0 0 8px 0"}}>
                            Show packs cards
                        </div>
                        <div className={styles.rangeSlider}>
                            <div className={styles.rangeSliderValueBox}>
                                {rangeValue[0]}
                            </div>
                            <Box sx={{width: 155, margin: "5px 15px 0 15px"}}>
                                <Slider
                                    getAriaLabel={() => "Temperature range"}
                                    value={rangeValue}
                                    onChange={handleRangeChange}
                                    valueLabelDisplay="auto"
                                    min={minCardsCount}
                                    max={maxCardsCount}
                                />
                            </Box>
                            <div className={styles.rangeSliderValueBox}>
                                {rangeValue[1]}
                            </div>
                        </div>
                    </div>
                    {/*-----Remove filters-----*/}
                    <div style={{margin: "55px 0 0 20px"}}>
                        <IconButton>
                            <FilterAltOffIcon/>
                        </IconButton>
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
                                <TableCell style={{width: 50}} align="right">
                                    <div style={{width: 50, overflow: "hidden"}}>
                                        {pack.cardsCount}
                                    </div>
                                </TableCell>
                                <TableCell style={{width: 200}} align="right">
                                    {pack.updated}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {pack.user_name}
                                </TableCell>
                                <TableCell style={{width: 120}} align="right">
                                    {
                                        userId === pack.user_id
                                            ? <div>
                                                <IconButton>
                                                    <SchoolIcon/>
                                                </IconButton>
                                                <IconButton>
                                                    <BorderColorOutlinedIcon/>
                                                </IconButton>
                                                <IconButton
                                                    onClick={deletePackHandler(pack._id)}>
                                                    <DeleteOutlineIcon/>
                                                </IconButton>
                                            </div>
                                            : <IconButton>
                                                <SchoolIcon/>
                                            </IconButton>
                                    }
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