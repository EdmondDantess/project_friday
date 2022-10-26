import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import style from './myPack.module.scss'
import {Button, IconButton, Rating, TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {CardsType} from '../../../api/myPackApi';
import {deleteCardTC, getCardsTC, postCardTC} from './mypack-reducer';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

type rowType = {
    question: string
    answer: string
    date: any
    grade: number
    cardId: string
}

export const MyPack = () => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.myPack.cards)
    //const packId = useAppSelector(state => state.myPack.packUserId)

    const [sortButState, setSortButState] = useState<boolean>(true)
    const [valueTextField, setValueTextField] = useState<string>('')
    const [disabledBut, setDisabledBut] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getCardsTC('6358089461a8d500046944db'))
    }, [dispatch])

    const postCardHandler = async () => {
        const question = `${Math.random()}`
        const answer = `${Math.random()}`
        setDisabledBut(true)
        await dispatch(postCardTC('6358089461a8d500046944db', question, answer))
        setDisabledBut(false)
    }

    // let sortcards: CardsType[] = []
    const sortCardsOfDate = () => {
        setSortButState(!sortButState)
        //     sortcards.sort((a: CardsType, b: CardsType) => (b.updated - a.updated))
    }

    function createData(
        question: string,
        answer: string,
        date: Date,
        grade: number,
        cardId: string
    ) {
        return {question, answer, date, grade, cardId};
    }

    const deleteCard = async (id: string) => {
        setDisabledBut(true)
        await dispatch(deleteCardTC(id))
        await dispatch(getCardsTC('6358089461a8d500046944db'))
        setDisabledBut(false)
    }

    const rows: rowType[] = [];

    cards.forEach((c: CardsType) => {
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

//-------------------------------------------------------------------------------------------------------------------

    function useDebounce<T>(value: T, delay?: number): T {
        const [debouncedValue, setDebouncedValue] = useState<T>(value)

        useEffect(() => {
            const timer = setTimeout(() => {
                setDebouncedValue(value);
                if (debouncedValue) {
                    dispatch(getCardsTC('6358089461a8d500046944db', 1, 8, valueTextField.trim()))
                }
            }, delay || 500)

            return () => {
                clearTimeout(timer)
            }
        }, [value, delay])

        return debouncedValue
    }

     useDebounce<any>(valueTextField, 500)

    //-------------------------------------------------------------------------------------------------------------------

    return (
        <div className={style.parentContainerMyPack}>
            <div className={style.headwithBut}>
                <label style={{fontSize: '22px'}}><b>My Pack</b>
                    <IconButton size={'small'}>
                        <MoreVertRoundedIcon/>
                    </IconButton>
                </label>
                {

                }
                <Button
                    disabled={disabledBut}
                    sx={{borderRadius: '30px', width: '184px', heght: '36px'}} variant={'contained'}
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
            <TableContainer component={Paper} sx={{marginTop: '24px'}}>
                <Table size="small" aria-label="a dense table">
                    <TableHead sx={{height: 48, backgroundColor: '#EFEFEF'}}>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell>Answer</TableCell>
                            <TableCell> <label onClick={sortCardsOfDate}>Last Update
                                <IconButton size={'small'}>
                                    {sortButState ?
                                        <ArrowDropDownIcon/>
                                        :
                                        <ArrowDropUpIcon/>}
                                </IconButton>
                            </label>
                            </TableCell>
                            <TableCell width={'200px'}>Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableBody}
                    </TableBody>
                </Table>
            </TableContainer>
            PAGINATION!!!!!!!!!!!!!!!!!!!!
        </div>
    );
};

