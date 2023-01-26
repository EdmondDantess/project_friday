import {
    deleteCardTC,
    getCardsTC,
    setCardsToEmptyState,
    setPackCreatorId,
    setPackEmptyStatus,
    setPackName,
    setPackUserId
} from './mypack-reducer';
import {TableBodySkeleton} from '../packsList/components/tableBodySkeleton/TableBodySkeleton';
import {TableFooterPagination} from './components/tableFooter/TableFooterPagination';
import {ModalAddEditCard} from './components/modalPack/ModalWorkWithCards';
import {MyPackNavbar} from './components/mypackNavbar/MyPackNavbar';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {TableHeadCell} from './components/tableHead/TableHead';
import {Box, Container, IconButton, Rating, styled} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import {useSearchParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {CardType} from '../../../api/cardAPI';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';

type RowType = {
    question: string
    cardId: string
    answer: string
    grade: number
    date: string
}

export const MyPack = () => {

    const valueInputFromState = useAppSelector(state => state.myPack.searchValueInput)
    const cardsTotalCount = useAppSelector(state => state.myPack.cardsTotalCount)
    const isFetching = useAppSelector(state => state.userFeedback.circularEntity)
    const currentUserId = useAppSelector(state => state.packs.currentUserId)
    const packUserId = useAppSelector(state => state.myPack.packCreatorId)
    const packIsEmpty = useAppSelector(state => state.myPack.packIsEmpty)
    const sortCards = useAppSelector(state => state.myPack.cardsSorted)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const packId = useAppSelector(state => state.myPack.cardsPackId)
    const packName = useAppSelector(state => state.myPack.packName)
    const cards = useAppSelector(state => state.myPack.cards)
    const page = useAppSelector(state => state.myPack.page)

    const [sortButState, setSortButState] = useState<boolean>(true)
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useAppDispatch()

    const pack = searchParams.get('pack') || ''
    const pageQuery = searchParams.get('page') || ''
    const packQuery = searchParams.get('packId') || ''
    const packCreatorId = searchParams.get('packCreatorId') || ''

    useEffect(() => {
        setSearchParams({
            packId, page: `${page}`, packName, packCreatorId: packUserId,
            pack: currentUserId === packUserId
                ? 'My pack'
                : 'Friends pack'
        })
    }, [packId, page, cards, packCreatorId, pack])

    useEffect(() => {
        if (packId === '') {
            dispatch(setPackUserId(packQuery))
        }
        if (packUserId === '') {
            dispatch(setPackCreatorId(packCreatorId))
        }
        if (packId !== '') {
            dispatch(getCardsTC({
                cardsPack_id: packId,
                pageCount,
                sortCards,
                cardQuestion: valueInputFromState,
                page: pageQuery !== '' ? +pageQuery : page
            }))
        }
    }, [valueInputFromState, packId, sortCards])

    useEffect(() => {
        return () => {
            dispatch(setCardsToEmptyState([]))
            dispatch(setPackName(''))
            dispatch(setPackEmptyStatus(false))
        }
    }, [dispatch])

    const deleteCard = async (id: string) => {
        await dispatch(deleteCardTC(id))
        await dispatch(getCardsTC({cardsPack_id: packId, pageCount, sortCards}))
    }

    function createData(
        question: string,
        answer: string,
        date: string,
        grade: number,
        cardId: string,
    ) {
        return {question, answer, date, grade, cardId};
    }

    const rows: RowType[] = [];
    cards.forEach((c: CardType) => {
        rows.push(createData(c.question, c.answer, c.updated, c.grade, c._id))
    })

    return (
        <Container fixed>
            <ParentContainerMyPack>
                <MyPackNavbar disabledBut={isFetching}/>
                <TableContainer component={Paper} sx={{maxWidth: 1008, margin: '10px auto 50px auto'}}>
                    <Table size="small" aria-label="custom pagination table">
                        <TableHeadCell sortButState={sortButState} setSortButState={setSortButState}/>
                        <TableBody>
                            {
                                isFetching
                                    ? <TableBodySkeleton rows={pageCount } cols={4}/>
                                    : <> {
                                        packIsEmpty && <TableRow>
                                            <Box component="th" scope="row" style={{fontWeight: 'bold'}}>
                                                no cards found</Box></TableRow>
                                    }
                                        {rows.map((row, index) => {
                                            let data: Date = new Date(Date.parse(row.date))
                                            return <TableRow
                                                key={index}
                                                sx={{
                                                    height: '48px',
                                                    width: '100%',
                                                }}>
                                                <TableCell component="th" scope="row">
                                                    {
                                                        row.question.startsWith('data:image/')
                                                            ? <img src={row.question} alt="img question"
                                                                   style={{height: '104px', width: '104px'}}/>
                                                            : <span title={row.question}>{
                                                                row.question.length > 50
                                                                    ? row.question.slice(0, 50).concat('...')
                                                                    : row.question
                                                            }</span>
                                                    }
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {
                                                        row.answer.startsWith('data:image/')
                                                            ? <img src={row.answer} alt="img answer"
                                                                   style={{height: '104px', width: '104px'}}/>
                                                            : <span title={row.answer}>{
                                                                row.answer.length > 50
                                                                    ? row.answer.slice(0, 50).concat('...')
                                                                    : row.answer
                                                            }</span>
                                                    }
                                                </TableCell>
                                                <TableCell component="th"
                                                           scope="row">{row.answer && data.toLocaleDateString()}</TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                        {row.answer && <>
                                                            <Rating name="read-only" value={row.grade} readOnly
                                                                    sx={{verticalAlign: 'middle'}}/>
                                                            {currentUserId === packUserId && <>
                                                                <ModalAddEditCard disabled={isFetching}
                                                                                  icon={'edit'}
                                                                                  cardId={row.cardId}
                                                                                  answer={row.answer}
                                                                                  question={row.question}
                                                                />
                                                                <IconButton
                                                                    disabled={isFetching}
                                                                    onClick={() => deleteCard(row.cardId)}>
                                                                    <DeleteOutlineIcon/>
                                                                </IconButton> </>}
                                                        </>}</Box>
                                                </TableCell>
                                            </TableRow>
                                        })}</>
                            }
                        </TableBody>
                        <TableFooterPagination packId={packId} page={page}
                                               cardsTotalCount={cardsTotalCount}
                                               sortCards={sortCards} pageCount={pageCount}/>
                    </Table>
                </TableContainer>
            </ParentContainerMyPack>
        </Container>
    );
}

export const ParentContainerMyPack = styled(Box)(({theme}) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    minHeight: '200px',
    width: '1008px',
    margin: '60px auto',


    [theme.breakpoints.down('lg')]: {
        width: '852px',
    },
    [theme.breakpoints.down('md')]: {
        width: '552px',
    },
    [theme.breakpoints.down('md')]: {
        maxWidth: '100%',
    },
}));
