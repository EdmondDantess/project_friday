import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {getFriendsPack} from "./reducer";
import {useAppDispatch} from "../../app/hooks";

import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {Paper, Rating, TableHead} from "@mui/material";

import arrow from "../../assets/images/arrow.svg";
import css from "./css.module.scss";
import {getCardApi, getPackApi} from "../../api/api";

const FriendsPack = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        getCardApi()
        getPackApi()
        //dispatch(getFriendsPack())
    }, [])


    return (
        <Container fixed>
            <NavLink className={css.returnLink} to='/'>
                <img className={css.arrow} src={arrow} alt="arrow"/>
                Back to Packs List
            </NavLink>

            <h1 className={css.title}>Friend’s Pack</h1>

            <p className={css.search}>Search</p>
            <input className={css.input}/>

            <Paper className={css.wrapper} elevation={3}>
                <TableContainer className={css.info}>
                    <Table aria-label="customized table">
                        <TableHead className={css.head}>
                            <TableRow>
                                <TableCell className={css.tableTitle}>Question</TableCell>
                                <TableCell className={css.tableTitle}>Answer</TableCell>
                                <TableCell className={css.tableTitle}>Last updated</TableCell>
                                <TableCell className={css.tableTitle}>Grade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>How "This" works in JavaScript?</TableCell>
                                <TableCell>This is how "This" works in JavaScript</TableCell>
                                <TableCell>18.03.2021</TableCell>
                                <TableCell>
                                    <Rating name="read-only" value={4} readOnly/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        </Container>
    )
}

export default FriendsPack;