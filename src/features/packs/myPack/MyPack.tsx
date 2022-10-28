import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import style from './myPack.module.scss'
import {
    Box,
    Button,
    IconButton,
    Menu, MenuItem,
    Rating,
    TableFooter,
    TablePagination,
    TextField,
    Tooltip, Typography
} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {deleteCardTC, getCardsTC, postCardTC, sortCardsAC} from './mypack-reducer';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import {TablePaginationActions} from '../packsList/PacksList';
import {CardType} from '../../../api/cardAPI';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

type rowType = {
    question: string
    answer: string
    date: string
    grade: number
    cardId: string
}

const s: { title: string, link: string, icon: any }[] = [
    {
        title: 'Edit',
        link: '',
        icon: <BorderColorOutlinedIcon/>
    },
    {
        title: 'Delete',
        link: '/packslist',
        icon: <DeleteOutlineIcon/>
    },
    {
        title: 'Learn',
        link: '',
        icon: <SchoolOutlinedIcon/>
    },
];

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
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (action: { title: string, link: string, icon: any }) => {
        return () => {
            if (action.title === 'Delete') {
              //
            }
            setAnchorElUser(null);
        }
    };

    const handleCloseMenu = () => {
        setAnchorElUser(null);
    };


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
                <Box sx={{flexGrow: 0}}>
                    <b style={{fontSize: '22px'}} onClick={handleOpenUserMenu}>My Pack</b>
                    <Tooltip title="Open settings">
                        <IconButton size={'small'} onClick={handleOpenUserMenu}>
                            <MoreVertRoundedIcon/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseMenu}
                    >
                        {s.map((navLink, index) => (
                            <MenuItem key={index} onClick={handleCloseUserMenu(navLink)}>
                                {navLink.icon}
                                <Typography textAlign="center"
                                            sx={{margin: '0 0 0 5px'}}>{navLink.title}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
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