import {AppThunk} from "../../app/store";
import {startCircular, stopCircular} from "../userFeedback/userFeedback-reducer";
import {AxiosError} from "axios";
import {handleError} from "../../common/utils/error-utils";
import {
    CardPackType,
    CreateNewPackDataType,
    FetchCardPackParamsType,
    FetchCardPacksRespType,
    packAPI
} from "../../api/packAPI";

const initialState = {
    cardPacks: [] as CardPackType[],
    page: 1,
    pageCount: 1,
    cardPacksTotalCount: 1,
    minCardsCount: 1,
    maxCardsCount: 1,
    _id: ""
}

type InitialStateType = typeof initialState

export const packsListReducer = (state: InitialStateType = initialState, action: FinalPacksListActionTypes): InitialStateType => {
    switch (action.type) {
        case "PACKSLIST/GET_ALL_PACKS":
        case "PACKSLIST/SET_USER_ID":
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const setAllPacks = (data: FetchCardPacksRespType) =>
    ({
        type: "PACKSLIST/GET_ALL_PACKS", payload: {
            cardPacks: data.cardPacks,
            page: data.page,
            pageCount: data.pageCount,
            cardPacksTotalCount: data.cardPacksTotalCount,
            minCardsCount: data.minCardsCount,
            maxCardsCount: data.maxCardsCount,
        }
    } as const)

export const setUserId = (_id: string) =>
    ({
        type: "PACKSLIST/SET_USER_ID", payload: {
            _id
        }
    } as const)

export const getAllPacks = (params: FetchCardPackParamsType): AppThunk => async (dispatch) => {
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

export const createPack = (newPack: CreateNewPackDataType): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(startCircular())
                await packAPI.createCardPack(newPack)
        } catch (error: AxiosError & any) {
            handleError(error, dispatch)
        } finally {
            dispatch(stopCircular())
        }
    }


export type FinalPacksListActionTypes =
    ReturnType<typeof setAllPacks> |
    ReturnType<typeof setUserId>