import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {getFriendsPack} from "./reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {Paper, Rating, TableHead} from "@mui/material";

import arrow from "../../assets/images/arrow.svg";
import css from "./css.module.scss";

type propsType = {
    question: string
    answer: string
    updated: string
    grade: number
}

const Row = (props: propsType) => {
    const data = props.updated
    return (
        <TableRow>
            <TableCell>{props.question}</TableCell>
            <TableCell>{props.answer}</TableCell>
            <TableCell>{data}</TableCell>
            <TableCell>
                <Rating value={props.grade} readOnly/>
            </TableCell>
        </TableRow>
    )
}

const FriendsPack = () => {

    const dispatch = useAppDispatch();
    const cards = useAppSelector(state => state.friendsPack.cards)

    useEffect(() => {
        //dispatch(getFriendsPack())
    }, [])

    const cardsJSX = cards.map(el => <Row question={el.question} answer={el.answer} updated={el.updated} grade={el.grade}/>) 

    return (
        <Container fixed>
            <NavLink className={css.returnLink} to='/'>
                <img className={css.arrow} src={arrow} alt="arrow"/>
                Back to Packs List
            </NavLink>

            <div className={css.box}>
                <h1 className={css.title}>Friend’s Pack</h1>
                <NavLink to='/' className={css.link}>Learn to pack</NavLink>
            </div>
            

            <p className={css.search}>Search</p>
            <input className={css.input} placeholder='Provide your text'/>

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
                    </Table>
                </TableContainer>
            </Paper>

        </Container>
    )
}

export default FriendsPack;