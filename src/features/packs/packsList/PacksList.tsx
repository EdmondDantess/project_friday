import React, {useEffect} from "react";
import {
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableRow
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    getAllPacks,
    setIsFetching,
    setMinMaxCards,
    setPackName,
    setPage,
    setPageCount,
    setSearchUserId
} from "./packsList-reducer";
import {useNavigate, useSearchParams} from "react-router-dom";
import {setPackCreatorId, setPackUserId} from "../myPack/mypack-reducer";
import TableHead from "@mui/material/TableHead";
import {PATH} from "../../pages/Pages";
import SchoolIcon from "@mui/icons-material/School";
import {CustomTablePagination} from "./components/customTablePagination/CustomTablePagination";
import {CustomTableHeadCell} from "./components/customTableHeadCell/CustomTableHeadCell";
import {PackListsNavbar} from "./components/packListsNavbar/PackListsNavbar";
import {ModalEditAddPack} from "./components/modalPack/ModalPack";
import {useAllSearchParams} from "../../../hooks/useAllSearchParams";
import packDecoy from "../../../assets/images/packDecoy.png"

export const PacksList = React.memo(() => {

    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const cardPacks = useAppSelector(state => state.packs.cardPacks)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const packName = useAppSelector(state => state.packs.packName)
    const sortPacks = useAppSelector(state => state.packs.sortPacks)
    const page = useAppSelector(state => state.packs.page)
    const min = useAppSelector(state => state.packs.min)
    const max = useAppSelector(state => state.packs.max)
    const id = useAppSelector(state => state.packs._id)

    const currentUserId = useAppSelector(state => state.packs.currentUserId)
    const userSearchId = useAppSelector(state => state.packs._id)
    const isLogged = useAppSelector(state => state.profile.isLogged)

    const isFetching = useAppSelector(state => state.packs.isFetching) //for disabling first useEffect

    const params = useAllSearchParams();

    let [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const disabler = useAppSelector(state => state.packs.disabler)
    let tempDisabler = false;

    //-----Updating PackList-----

    useEffect(() => {
        let id = setTimeout(() => {
            tempDisabler = true
            if (!isFetching) {
                dispatch(getAllPacks())
            }
        }, 500)
        return () => {
            clearTimeout(id)
            tempDisabler = false
        }
    }, [dispatch, userSearchId, isLogged, min, max, pageCount, packName, currentUserId, isFetching, page, id, sortPacks]);

    //-----Turn off updating after PackList die-----

    useEffect(() => {
        return () => {
            dispatch(setIsFetching(true))
        }
    }, [dispatch]);

    //-----Navigate to login if user isn't authorized-----

    useEffect(() => {
        if (!isLogged) {
            return navigate(PATH.LOGIN)
        }
    }, [navigate, isLogged])

    //-----Updating state after searchParams changing-----

    useEffect(() => {
        dispatch(setIsFetching(true))

        if ((!!params.min && !Number(params.min)) && +params.min !== 0) {
            setSearchParams({...params, "min": `${(Number(minCardsCount) ? minCardsCount : 0)}`})
            return
        }

        if (!!params.max && !Number(params.max)) {
            setSearchParams({...params, "max": `${(Number(maxCardsCount) ? maxCardsCount : 1)}`})
            return
        }

        if (!!params.page && !Number(params.page)) {
            setSearchParams({...params, "page": `1`})
            return
        }

        if (!!params.pageCount && !Number(params.pageCount)) {
            setSearchParams({...params, "pageCount": `8`})
            return
        }

        dispatch(setMinMaxCards(params.min ? +params.min : 0, params.max ? +params.max : null))
        dispatch(setPage(params.page ? +params.page : 1))
        dispatch(setPageCount(params.pageCount ? +params.pageCount : 8))
        dispatch(setSearchUserId(params.pack ? params.pack : ""))
        dispatch(setPackName(params.packName ? params.packName : ""))
        dispatch(setIsFetching(false))
    }, [dispatch, params.min, params.max, params.page, params.pageCount, params.packName, params.pack, setSearchParams, minCardsCount, maxCardsCount])

    //-----Redirect-to-friendsPack-or-MyPack-----

    const handleRedirect = (packId: string, creatorId: string) => {
        return () => {
            if (!disabler && !tempDisabler) {
                navigate(PATH.MYPACK)
                dispatch(setPackUserId(packId))
                dispatch(setPackCreatorId(creatorId))
            }
        }
    }

    //-----Redirect-to-LearnPage-----

    const handleLearnRedirect = (packId: string) => {
        return async () => {
            dispatch(setPackUserId(packId))
            navigate(`${PATH.LEARNPACK}`)
        }
    }


    const finalCardPacks = cardPacks.map((pack, index) => {
        let data: Date = new Date(Date.parse(pack.updated))
        return (
            <TableRow key={index}>
                <TableCell component="th" scope="row" style={{width: 100}}>
                    {
                        pack.deckCover && pack.deckCover.match(/data:image\/jpeg|data:image\/webp/gmi) ?
                            <img src={pack.deckCover} alt="deckCover" style={{height: "30px", width: "60px"}}/> :
                            <img src={packDecoy} alt="deckCoverDefault" style={{height: "30px", width: "60px"}}/>
                    }
                </TableCell>
                <TableCell component="th" scope="row">
                    <span style={{cursor: "pointer", fontWeight: "600", textDecoration: "underline"}}
                          onClick={handleRedirect(pack._id, pack.user_id)}
                    >{pack.name.length >= 20 ? `${pack.name.slice(0, 20)}...` : pack.name}
                    </span>
                </TableCell>
                <TableCell style={{width: 50}} align="center">
                    <div style={{width: 50, overflow: "hidden"}}>
                        {pack.cardsCount}
                    </div>
                </TableCell>
                <TableCell style={{width: 200}} align="center">
                    {data.toLocaleDateString()}
                </TableCell>
                <TableCell style={{width: 160}} align="center">
                    {pack.user_name.length >= 15 ? `${pack.user_name.slice(0, 15)}...` : pack.user_name}
                </TableCell>
                <TableCell style={{width: 120}} align="center">
                    {
                        currentUserId === pack.user_id
                            ? <div style={{display: "flex"}}>
                                <IconButton onClick={handleLearnRedirect(pack._id)} disabled={disabler}>
                                    <SchoolIcon/>
                                </IconButton>
                                <ModalEditAddPack icon={"Edit"} packId={pack._id} name={pack.name}/>
                                <ModalEditAddPack icon={"Delete"} packId={pack._id} page={"packlist"}/>
                            </div>
                            : <IconButton onClick={handleLearnRedirect(pack._id)} disabled={disabler}>
                                <SchoolIcon/>
                            </IconButton>
                    }
                </TableCell>
            </TableRow>
        )
    })

    return (
        <>
            {
                isLogged && <Container fixed>
                    <PackListsNavbar/>
                    {
                        cardPacks.length !== 0
                            ?
                            <TableContainer component={Paper} sx={{maxWidth: 1008, margin: "0 auto 50px auto"}}>
                                <Table sx={{maxWidth: 1008}} aria-label="custom pagination table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Cover</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="center">Cards</TableCell>
                                            <CustomTableHeadCell title={"Last Updated"} value={"updated"} align="center"
                                                                 sx={{paddingLeft: "30px"}}/>
                                            <TableCell align="center">Created by</TableCell>
                                            <TableCell align="center">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {finalCardPacks}
                                    </TableBody>
                                    <TableFooter>
                                        <CustomTablePagination/>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            :
                            <Paper sx={{
                                maxWidth: 1008,
                                textAlign: "center",
                                margin: "50px auto",
                                padding: "50px 0",
                                fontSize: "24px"
                            }}>
                                Packs with cards were not Found!</Paper>
                    }
                </Container>
            }
        </>
    );
})