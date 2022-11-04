import {AppThunk} from '../../../app/store';
import {startCircular, stopCircular} from '../../userFeedback/userFeedback-reducer';
import {handleError} from '../../../common/utils/error-utils';
import {
    cardsAPI,
    CardType,
    CreateCardDataType,
    FetchCardParamsType,
    UpdateCardData,
    UpdatedGradeType
} from '../../../api/cardAPI';
import {packAPI} from '../../../api/packAPI';
import {AxiosError} from 'axios';

type InitStateType = typeof initialState

const initialState = {
    cardsSorted: '',
    idOfCardsPack: '',
    cards: [] as CardType[],
    page: 1,
    cardsTotalCount: 1,
    pageCount: 8,
    searchValueInput: '',
}

export const mypackReducer = (state: InitStateType = initialState, action: MyPackActionsType): InitStateType => {
    switch (action.type) {
        case 'mypack/SET-CARDSDATA':
            return {...state, ...action.payload.cards, pageCount: 8}
        case 'mypack/SET-PACHUSERID':
            return {...state, idOfCardsPack: action.payload.packUserId}
        case 'mypack/SET-SORTED':
            return {...state, cardsSorted: action.payload.sorted}
        case 'mypack/SET-PAGE':
            return {...state, page: action.payload.page}
        case 'mypack/SET-UPDATEDGRADE':
            return {
                ...state, cards: state.cards.map(card => card._id === action.payload.data.updatedGrade.card_id ?
                    {
                        ...card,
                        grade: action.payload.data.updatedGrade.grade,
                        shots: action.payload.data.updatedGrade.shots
                    } : card)
            }
        case 'mypack/SET-SEARCHVALUEINPUT':
            return {
                ...state, searchValueInput: action.payload.searchValueInput
            }
        default:
            return state
    }
}

export const setPageAC = (page: number) => {
    return {
        type: 'mypack/SET-PAGE',
        payload: {page}
    } as const
}

export const setCardsAC = (cards: any) => {
    return {
        type: 'mypack/SET-CARDSDATA',
        payload: {cards}
    } as const
}
export const sortCardsAC = (sorted: string) => {
    return {
        type: 'mypack/SET-SORTED',
        payload: {sorted}
    } as const
}

export const setPackUserId = (packUserId: string) => {
    return {
        type: 'mypack/SET-PACHUSERID',
        payload: {packUserId}
    } as const
}

export const setUpdatedGrade = (data: UpdatedGradeType) => {
    return {
        type: 'mypack/SET-UPDATEDGRADE',
        payload: {data}
    } as const
}

export const setSearchQuestion = (valueInput: string) => {
    return {
        type: 'mypack/SET-SEARCHVALUEINPUT',
        payload: {searchValueInput: valueInput}
    } as const
}

export const postCardTC = (data: CreateCardDataType): AppThunk => async dispatch => {
    try {
        dispatch(startCircular())
        await cardsAPI.createCard(data)
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(stopCircular())
    }
}

export const getCardsTC = (params: FetchCardParamsType): AppThunk => async dispatch => {
    try {
        dispatch(startCircular())
        const res = await cardsAPI.fetchCard(params)
        dispatch(setCardsAC(res.data))
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(stopCircular())
    }
}

export const deleteCardTC = (id: string): AppThunk => async dispatch => {
    try {
        dispatch(startCircular())
        await cardsAPI.removeCard(id)
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(stopCircular())
    }
}

export const updateCardTC = (data: UpdateCardData): AppThunk => async dispatch => {
    try {
        dispatch(startCircular())
        await cardsAPI.updateCard(data)
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(stopCircular())
    }
}

export const deletePackOnMyPage = (packId: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(startCircular())
            await packAPI.deleteCardPack(packId)
            dispatch(setPackUserId('deleted'))
        } catch (error: AxiosError & any) {
            handleError(error, dispatch)
        } finally {
            dispatch(stopCircular())
        }
    }

export const postCardGrade = (grade: number, card_id: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(startCircular())
            const res = await cardsAPI.postGradeCard(grade, card_id)
            dispatch(setUpdatedGrade(res.data))
        } catch (error: AxiosError & any) {
            handleError(error, dispatch)
        } finally {
            dispatch(stopCircular())
        }
    }

export type MyPackActionsType =
    ReturnType<typeof setCardsAC> |
    ReturnType<typeof setPackUserId> |
    ReturnType<typeof sortCardsAC> |
    ReturnType<typeof setPageAC> |
    ReturnType<typeof setSearchQuestion> |
    ReturnType<typeof setUpdatedGrade>

