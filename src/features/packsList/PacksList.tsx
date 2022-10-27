import React, {useEffect} from "react";
import {
    Box, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow, useTheme
} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getAllPacks} from "./packsList-reducer";
import {useNavigate} from "react-router-dom";
import {setPackUserId} from "../packs/myPack/mypack-reducer";

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
    const page = useAppSelector(state => state.packs.page)

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

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

    return (
        <TableContainer component={Paper} sx={{maxWidth: 1008, margin: "192px auto 0 auto"}}>
            <Table sx={{maxWidth: 1008}} aria-label="custom pagination table">
                <TableBody>
                    {cardPacks.map((pack, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row" onClick={()=> {
                                dispatch(setPackUserId(pack._id))
                                navigate("/mypack")
                            }}>
                                {pack.name}
                            </TableCell>
                            <TableCell style={{width: 200}} align="right">
                                {pack.cardsCount}
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
    );
}

