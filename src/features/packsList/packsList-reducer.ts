import {AppThunk} from "../../app/store";
import {startCircular, stopCircular} from "../userFeedback/userFeedback-reducer";
import {AxiosError} from "axios";
import {handleError} from "../../common/utils/error-utils";
import {CardPackType, FetchCardPackParamsType, FetchCardPacksRespType, packAPI} from "../../api/packAPI";

const initialState = {
    cardPacks: [] as CardPackType[],
    page: 1,
    pageCount: 1,
    cardPacksTotalCount: 1,
    minCardsCount: 1,
    maxCardsCount: 1,
}

type InitialStateType = typeof initialState

export const packsListReducer = (state: InitialStateType = initialState, action: FinalPacksListActionTypes): InitialStateType => {
    switch (action.type) {
        case "PACKSLIST/GET_ALL_PACKS":
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const getAllPacks = (params: FetchCardPackParamsType): AppThunk =>
    async (dispatch) => {
    try {
        dispatch(startCircular())
        let res = await packAPI.fetchCardPack(params)
        dispatch(setAllPacks(res.data))
    } catch (error: AxiosError & any) {
        handleError(error, dispatch)
    } finally {
        dispatch(stopCircular())
    }
}

export const setAllPacks = (data: FetchCardPacksRespType) =>
    ({type: "PACKSLIST/GET_ALL_PACKS", payload: {
            cardPacks: data.cardPacks,
            page: data.page,
            pageCount: data.pageCount,
            cardPacksTotalCount: data.cardPacksTotalCount,
            minCardsCount: data.minCardsCount,
            maxCardsCount: data.maxCardsCount,
        }} as const)


export type FinalPacksListActionTypes =
    ReturnType<typeof setAllPacks>