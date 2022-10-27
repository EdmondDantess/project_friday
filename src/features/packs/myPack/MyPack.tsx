import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import style from './myPack.module.scss'
import {Button, IconButton, Rating, TableFooter, TablePagination, TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {deleteCardTC, getCardsTC, postCardTC, sortCardsAC} from './mypack-reducer';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import {TablePaginationActions} from '../../packsList/PacksList';
import {CardType} from '../../../api/cardAPI';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

type rowType = {
    question: string
    answer: string
    date: string
    grade: number
    cardId: string
}

export const MyPack = () => {

    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.myPack.cards)
    const packId = useAppSelector(state => state.myPack.idOfCardsPack)
    const pageCount = useAppSelector(state => state.myPack.pageCount)
    const cardsTotalCount = useAppSelector(state => state.myPack.cardsTotalCount)
    const sortCards = useAppSelector(state => state.myPack.cardsSorted)
    const page = useAppSelector(state => state.myPack.page)

    const [valueTextField, setValueTextField] = useState<string>('')
    const [disabledBut, setDisabledBut] = React.useState<boolean>(false)
    const [sortButState, setSortButState] = React.useState<boolean>(true)

    const sortCardsOfDate = (value: boolean) => {
        setSortButState(value)
        if (sortButState) {
            dispatch(sortCardsAC('0update'))
        }
        if (!sortButState) {
            dispatch(sortCardsAC(''))
        }
    }

    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: packId, pageCount: pageCount, sortCards: sortCards}));
    }, [sortButState])

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        localStorage.setItem('valueCountCardsOnPage', `${newPage}`)
        dispatch(getCardsTC({
            cardsPack_id: packId,
            page: ++newPage,
            pageCount: pageCount,
            sortCards: sortCards
        }))
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(getCardsTC({
            cardsPack_id: packId,
            pageCount: +event.target.value,
            sortCards: sortCards
        }))
    };

    const postCardHandler = async () => {
        const question = `${Math.random()}`
        const answer = `${Math.random()}`
        setDisabledBut(true)
        await dispatch(postCardTC({cardsPack_id: packId, answer, question}))
        await dispatch(getCardsTC({cardsPack_id: packId, pageCount: pageCount, sortCards: sortCards}))
        setDisabledBut(false)
    }

    function createData(
        question: string,
        answer: string,
        date: string,
        grade: number,
        cardId: string
    ) {
        return {question, answer, date, grade, cardId};
    }

    const deleteCard = async (id: string) => {
        setDisabledBut(true)
        await dispatch(deleteCardTC(id))
        await dispatch(getCardsTC({cardsPack_id: packId, pageCount: pageCount, sortCards: sortCards}))
        setDisabledBut(false)
    }

    const rows: rowType[] = [];

    cards.forEach((c: CardType) => {
        rows.push(createData(c.question, c.answer, c.updated, c.grade, c._id))
    })
    let tableBody = rows.map((row, index) => {
            let data: Date = new Date(Date.parse(row.date))
            return <TableRow
                key={index}
                sx={{
                    '&:last-child td, &:last-child th': {border: 0},
                    height: '48px',
                    width: '100%',
                }}
            >
                <TableCell component="th" scope="row">
                    {row.question}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.answer}
                </TableCell>
                <TableCell component="th" scope="row">{data.toLocaleDateString()}</TableCell>
                <TableCell component="th" scope="row"><Rating name="read-only" value={row.grade} readOnly
                                                              sx={{verticalAlign: 'middle'}}/>
                    <IconButton>
                        <BorderColorOutlinedIcon/>
                    </IconButton>
                    <IconButton
                        disabled={disabledBut}
                        onClick={() => deleteCard(row.cardId)}>
                        <DeleteOutlineIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
        }
    )

    function useDebounce<T>(value: T): void {
        const [debouncedValue, setDebouncedValue] = useState<T>(value)
        useEffect(() => {
            const timer = setTimeout(() => {
                setDebouncedValue(value);
                if (debouncedValue) {
                    dispatch(getCardsTC({
                        cardsPack_id: packId,
                        pageCount: pageCount,
                        cardQuestion: valueTextField.trim()
                    }))
                }
            }, 500)
            return () => {
                clearTimeout(timer)
            }
        }, [debouncedValue, value])
    }

    useDebounce<string>(valueTextField)

    return (
        <div className={style.parentContainerMyPack}>
            <div className={style.headWithBut}>
                <label style={{fontSize: '22px'}}><b>My Pack</b>
                    <IconButton size={'small'}>
                        <MoreVertRoundedIcon/>
                    </IconButton>
                </label>
                <Button
                    disabled={disabledBut}
                    sx={{borderRadius: '30px', width: '184px', height: '36px'}} variant={'contained'}
                    onClick={postCardHandler}>Add new card</Button>
            </div>
            <span style={{fontSize: '14px', marginTop: '28px'}}>
                    Search
                </span>
            <TextField className={style.inputMyPack} size={'small'} sx={{marginTop: '8px', height: '36px'}}
                       InputProps={{
                           startAdornment: <SearchIcon sx={{height: '19px', opacity: 0.5}}/>
                       }}
                       placeholder={`Provide your text`}
                       value={valueTextField}
                       onChange={(e) => {
                           setValueTextField(e.currentTarget.value)
                       }}
            ></TextField>
            <TableContainer component={Paper} sx={{margin: '24px 0 50px 0'}}>
                <Table size="small" aria-label="a dense table">
                    <TableHead sx={{height: 48, backgroundColor: '#EFEFEF'}}>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell>Answer</TableCell>
                            <TableCell>
                                Last Update
                                <IconButton
                                    size={'small'}
                                    onClick={() => sortCardsOfDate(!sortButState)}>
                                    {
                                        sortButState ?
                                            <ArrowDropDownIcon/>
                                            : <ArrowDropUpIcon/>
                                    }
                                </IconButton>
                            </TableCell>
                            <TableCell width={'200px'}>Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableBody}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 8, 10]}
                                colSpan={3}
                                count={cardsTotalCount}
                                rowsPerPage={pageCount}
                                page={page - 1}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'Cards per Page',
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
        </div>
    );
};