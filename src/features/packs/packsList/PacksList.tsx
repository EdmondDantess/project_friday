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
import {getAllPacks, setIsFetching, setMinMaxCards, setPage, setSearchUserId} from "./packsList-reducer";
import {useNavigate, useSearchParams} from "react-router-dom";
import {setPackCreatorId, setPackUserId} from "../myPack/mypack-reducer";
import TableHead from "@mui/material/TableHead";
import {PATH} from "../../pages/Pages";
import SchoolIcon from "@mui/icons-material/School";
import {CustomTablePagination} from "./components/customTablePagination/CustomTablePagination";
import {CustomTableHeadCell} from "./components/customTableHeadCell/CustomTableHeadCell";
import {PackListsNavbar} from "./components/packListsNavbar/PackListsNavbar";
import {ModalEditAddPack} from "./components/modalPack/ModalPack";

export const PacksList = React.memo(() => {

    const cardPacks = useAppSelector(state => state.packs.cardPacks)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const packName = useAppSelector(state => state.packs.packName)
    const sortPacks = useAppSelector(state => state.packs.sortPacks)
    const page = useAppSelector(state => state.packs.page)
    const min = useAppSelector(state => state.packs.min)
    const max = useAppSelector(state => state.packs.max)

    const currentUserId = useAppSelector(state => state.packs.currentUserId)
    const userSearchId = useAppSelector(state => state.packs._id)
    const isLogged = useAppSelector(state => state.profile.isLogged)

    const isFetching = useAppSelector(state => state.packs.isFetching)

    const queryParams = useAppSelector(state => state.packs.queryParams)

    let [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const disabler = useAppSelector(state => state.packs.disabler)

    const packQuery = searchParams.get("pack") || ""
    const pageQuery = searchParams.get("page") || ""

    useEffect(() => {
        if (!isFetching) {
            dispatch(getAllPacks())
        }
    }, [dispatch, userSearchId, isLogged, min, max, pageCount, packName, currentUserId, isFetching, page, sortPacks]);

    useEffect(() => {
        return () => {
            dispatch(setIsFetching(true))
        }
    }, [dispatch]);

    useEffect(() => {
        if (!isLogged) {
            return navigate(PATH.LOGIN)
        }
    }, [navigate, isLogged])

    useEffect(() => {
        if (packQuery === currentUserId) {
            dispatch(setIsFetching(true))
            dispatch(setMinMaxCards(null, null))
            dispatch(setPage(1))
            dispatch(setSearchUserId(currentUserId))
            setSearchParams({pack: `${currentUserId}`})
            dispatch(setIsFetching(false))
        } else {
            dispatch(setIsFetching(true))
            dispatch(setMinMaxCards(null, null))
            dispatch(setPage(1))
            dispatch(setSearchUserId(""))
            setSearchParams({pack: `all`})
            dispatch(setIsFetching(false))
        }
    }, [dispatch, currentUserId, packQuery, setSearchParams])

    // useEffect(() => {
    //     console.log("Hello, I'm query useEffect")
    // }, [dispatch]);


    //-----Redirect-to-friendsPack-or-MyPack-----

    const handleRedirect = (packId: string, creatorId: string) => {
        return () => {
            navigate(PATH.MYPACK)
            dispatch(setPackUserId(packId))
            dispatch(setPackCreatorId(creatorId))
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
                <TableCell component="th"
                           scope="row"
                           sx={{cursor: "pointer"}}
                           onClick={handleRedirect(pack._id, pack.user_id)}>
                    {pack.name.slice(0, 40)}
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
                    {pack.user_name}
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
                                    <TableHead sx={{background: "#EFEFEF"}}>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="center">Cards</TableCell>
                                            <CustomTableHeadCell title={"Last Updated"} value={"updated"} align="center" sx={{paddingLeft: "30px"}}/>
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