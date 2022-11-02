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
import {getAllPacks} from "./packsList-reducer";
import {useNavigate} from "react-router-dom";
import {setPackUserId} from "../myPack/mypack-reducer";
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

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if(!isFetching) {
            dispatch(getAllPacks())
        }
    }, [dispatch, userSearchId, isLogged, min, max, pageCount, packName, currentUserId, isFetching, page, sortPacks]);

    useEffect(() => {
        if (!isLogged) {
            return navigate(PATH.LOGIN)
        }
    }, [navigate, isLogged])

    //-----Redirect-to-friendsPack-or-MyPack-----

    const handleRedirect = (packId: string, userPackId: string) => {
        return () => {
            if (currentUserId === userPackId) {
                navigate(PATH.MYPACK)
            } else {
                navigate(PATH.FRIENDSPACK)
            }
            dispatch(setPackUserId(packId))
        }
    }

    //-----Delete Pack-----

    const finalCardPacks = cardPacks.map((pack, index) => (
        <TableRow key={index}>
            <TableCell component="th"
                       scope="row"
                       sx={{cursor: "pointer"}}
                       onClick={handleRedirect(pack._id, pack.user_id)}>
                {pack.name}
            </TableCell>
            <TableCell style={{width: 50}} align="right">
                <div style={{width: 50, overflow: "hidden"}}>
                    {pack.cardsCount}
                </div>
            </TableCell>
            <TableCell style={{width: 200}} align="right">
                {pack.updated}
            </TableCell>
            <TableCell style={{width: 160}} align="right">
                {pack.user_name}
            </TableCell>
            <TableCell style={{width: 120}} align="right">
                {
                    currentUserId === pack.user_id
                        ? <div style={{display: "flex"}}>
                            <IconButton>
                                <SchoolIcon/>
                            </IconButton>
                            <ModalEditAddPack icon={'Edit'} packId={pack._id} name={pack.name}/>
                            <ModalEditAddPack icon={'Delete'} packId={pack._id} page={'packlist'}/>
                        </div>
                        : <IconButton>
                            <SchoolIcon/>
                        </IconButton>
                }
            </TableCell>
        </TableRow>
    ))

    return (
        <>{isLogged && <Container fixed>
            <PackListsNavbar/>
            <TableContainer component={Paper} sx={{maxWidth: 1008, margin: "0 auto 50px auto"}}>
                <Table sx={{maxWidth: 1008}} aria-label="custom pagination table">
                    <TableHead sx={{background: "#EFEFEF"}}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Cards</TableCell>
                            <CustomTableHeadCell title={"Last Updated"} value={"updated"} align="right"/>
                            <TableCell align="right">Created by</TableCell>
                            <TableCell align="right">Actions</TableCell>
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
        </Container>}</>
    );
})