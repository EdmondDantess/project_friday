import React, {useEffect} from 'react';
import {NavLink, useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {Paper, Rating, TableHead} from '@mui/material';
import css from './css.module.scss';
import {PreviousPage} from '../../../common/components/previousPage/PreviousPage';
import {PATH} from '../../pages/Pages';
import {getCardsTC, setPackUserId} from '../myPack/mypack-reducer';
import {TableFooterPagination} from '../myPack/components/tableFooter/TableFooterPagination';

type propsType = {
    question: string
    answer: string
    updated: string
    grade: number
}

const Row = (props: propsType) => {
    const data = new Date(Date.parse(props.updated)).toLocaleDateString();
    return (
        <TableRow>
            <TableCell>      {
                props.question.includes('data:image/jpeg;base64') ?
                    <img src={props.question} alt="" style={{height: '104px', width: '104px'}}/> :
                    props.question.slice(0, 30)
            }</TableCell>
            <TableCell>     {
                props.answer.includes('data:image/jpeg;base64') ?
                    <img src={props.question} alt="" style={{height: '104px', width: '104px'}}/> :
                    props.answer.slice(0, 30)
            }</TableCell>
            <TableCell>{`${data}`}</TableCell>
            <TableCell>
                <Rating value={props.grade} readOnly/>
            </TableCell>
        </TableRow>
    )
}

const FriendsPack = () => {

    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.myPack.cards)
    const packId = useAppSelector(state => state.myPack.idOfCardsPack)
    const pageCount = useAppSelector(state => state.myPack.pageCount)
    const sortCards = useAppSelector(state => state.myPack.cardsSorted)
    const page = useAppSelector(state => state.myPack.page)
    const cardsTotalCount = useAppSelector(state => state.myPack.cardsTotalCount)

    const valueInputFromState = useAppSelector(state => state.myPack.searchValueInput)
    const [searchParams, setSearchParams] = useSearchParams();

    const cardsJSX = cards.map(el => <Row question={el.question} answer={el.answer} updated={el.updated}
                                          key={el.updated} grade={el.grade}/>)

    const packQuery = searchParams.get('packId') || ''
    const pageQuery = searchParams.get('page') || ''

    useEffect(() => {
        setSearchParams({packId, page: `${page}`})
    }, [packId, page])

    useEffect(() => {
        if (packId === '') {
            dispatch(setPackUserId(packQuery))
        }

        if (packId !== '') {
            dispatch(getCardsTC({
                cardsPack_id: packId,
                pageCount: pageCount,
                sortCards: sortCards,
                cardQuestion: valueInputFromState,
                page: pageQuery !== '' ? +pageQuery : page
            }))
        }
    }, [valueInputFromState, packId, sortCards])

    return (
        <Container fixed>
            <PreviousPage routeNavigate={PATH.PACKSLIST} title={'Back to packlist'}/>
            <div className={css.box}>
                <h1 className={css.title}>Friend’s Pack</h1>
                <NavLink to={PATH.LEARNPACK} className={css.link}>Learn to pack</NavLink>
            </div>

            <p className={css.search}>Search</p>
            <input className={css.input} placeholder="Provide your text"/>

            <Paper className={css.wrapper} elevation={3}>
                <TableContainer className={css.info}>
                    <Table>
                        <TableHead className={css.head}>
                            <TableRow>
                                <TableCell className={css.tableTitle}>Question</TableCell>
                                <TableCell className={css.tableTitle}>Answer</TableCell>
                                <TableCell className={css.tableTitle}>Last updated</TableCell>
                                <TableCell className={css.tableTitle}>Grade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cardsJSX}
                        </TableBody>
                        <TableFooterPagination packId={packId} page={page} cardsTotalCount={cardsTotalCount}
                                               sortCards={sortCards} pageCount={pageCount}/>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    )
}

export default FriendsPack;