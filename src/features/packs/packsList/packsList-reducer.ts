import {AppThunk} from "../../../app/store";
import {startCircular, stopCircular} from "../../userFeedback/userFeedback-reducer";
import {AxiosError} from "axios";
import {handleError} from "../../../common/utils/error-utils";
import {CardPackType, CreateNewPackDataType, FetchCardPacksRespType, packAPI} from "../../../api/packAPI";

const initialState = {
    cardPacks: [] as CardPackType[],
    page: 1,
    pageCount: 8,
    cardPacksTotalCount: 200,
    minCardsCount: null as null | number,
    maxCardsCount: null as null | number,
    sortPacks: "",
    packName: "",
    _id: "",
    currentUserId: "",
    min: null as null | number,
    max: null as null | number,
    isFetching: true,
}

type InitialStateType = typeof initialState

export const packsListReducer = (state: InitialStateType = initialState, action: FinalPacksListActionTypes): InitialStateType => {
    switch (action.type) {
        case "PACKSLIST/GET_ALL_PACKS":
        case "PACKSLIST/SET_USER_ID":
        case "PACKSLIST/SET_PAGE":
        case "PACKSLIST/SET_MIN_MAX_CARDS":
        case "PACKSLIST/SET_PAGE_COUNT":
        case "PACKSLIST/SET_PACK_NAME":
        case "PACKSLIST/SET_CURRENT_USER_ID":
        case "PACKSLIST/SET_IS_FETCHING":
        case "PACKSLIST/SET_SORT_PACKS":
        case "PACKSLIST/SET_MIN_MAX_CARDS_COUNT":
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const setAllPacks = (data: FetchCardPacksRespType) =>{
//space for debugger
    return ({
        type: "PACKSLIST/GET_ALL_PACKS", payload: {
            cardPacks: data.cardPacks,
            page: data.page,
            pageCount: data.pageCount,
            cardPacksTotalCount: data.cardPacksTotalCount,
            minCardsCount: data.minCardsCount,
            maxCardsCount: data.maxCardsCount,
        }
    } as const)
}

export const setSortPacks = (sortPacks: string) => ({
    type: "PACKSLIST/SET_SORT_PACKS", payload: {sortPacks}
} as const)

export const setSearchUserId = (_id: string) => ({
    type: "PACKSLIST/SET_USER_ID", payload: {_id}
} as const)

export const setCurrentUserId = (currentUserId: string) => ({
    type: "PACKSLIST/SET_CURRENT_USER_ID", payload: {currentUserId}
} as const)

export const setPackName = (packName: string) => ({
    type: "PACKSLIST/SET_PACK_NAME", payload: {packName}
} as const)

export const setPage = (page: number) => ({
    type: "PACKSLIST/SET_PAGE", payload: {page}
} as const)

export const setPageCount = (pageCount: number) => ({
    type: "PACKSLIST/SET_PAGE_COUNT", payload: {pageCount}
} as const)

export const setMinMaxCards = (min: number | null, max: number | null) => ({
    type: "PACKSLIST/SET_MIN_MAX_CARDS",
    payload: {min, max}
} as const)

export const setMinMaxCardsCount = (minCardsCount: number | null, maxCardsCount: number | null) => ({
    type: "PACKSLIST/SET_MIN_MAX_CARDS_COUNT",
    payload: {minCardsCount, maxCardsCount}
} as const)

export const setIsFetching = (isFetching: boolean) => ({
    type: "PACKSLIST/SET_IS_FETCHING",
    payload: {isFetching}
} as const)


export const getAllPacks = (): AppThunk => async (dispatch, getState) => {

    const {min, max, page, pageCount, packName, _id, sortPacks} = getState().packs;

    try {
        dispatch(startCircular())
        let res = await packAPI.fetchCardPack({
            user_id: _id,
            sortPacks: sortPacks,
            min: min ? min : "",
            max: max ? max : "",
            page,
            pageCount,
            packName,
        })
        dispatch(setAllPacks(res.data))
    } catch (error: AxiosError & any) {
        handleError(error, dispatch)
    } finally {
        dispatch(stopCircular())
    }
}

export const dropFilters = (): AppThunk => async (dispatch) => {

    try {
        dispatch(startCircular())
        dispatch(setIsFetching(true))
        dispatch(setPackName(""))
        dispatch(setSearchUserId(""))
        dispatch(setMinMaxCards(null, null))
        dispatch(setMinMaxCardsCount(null, null))
        dispatch(setSortPacks(""))
    } catch (error: AxiosError & any) {
        handleError(error, dispatch)
    } finally {
        dispatch(setIsFetching(false))
        dispatch(stopCircular())
    }
}

export const createPack = (newPack: CreateNewPackDataType): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(startCircular())
            await packAPI.createCardPack(newPack)
            dispatch(getAllPacks())
        } catch (error: AxiosError & any) {
            handleError(error, dispatch)
        } finally {
            dispatch(stopCircular())
        }
    }

export const editPack = (data: UpdateCardsPackDataType, params: FetchCardPackParamsType): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(startCircular())
            await packAPI.updateCardPack(data)
            let res = await packAPI.fetchCardPack(params)
            dispatch(setAllPacks(res.data))
        } catch (error: AxiosError & any) {
            handleError(error, dispatch)
        } finally {
            dispatch(stopCircular())
        }
    }

export const deletePack = (packId: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(startCircular())
            await packAPI.deleteCardPack(packId)
            dispatch(getAllPacks())
        } catch (error: AxiosError & any) {
            handleError(error, dispatch)
        } finally {
            dispatch(stopCircular())
        }
    }


export type FinalPacksListActionTypes =
    ReturnType<typeof setAllPacks> |
    ReturnType<typeof setSearchUserId> |
    ReturnType<typeof setMinMaxCards> |
    ReturnType<typeof setPageCount> |
    ReturnType<typeof setPackName> |
    ReturnType<typeof setCurrentUserId> |
    ReturnType<typeof setIsFetching> |
    ReturnType<typeof setSortPacks> |
    ReturnType<typeof setMinMaxCardsCount> |
    ReturnType<typeof setPage>