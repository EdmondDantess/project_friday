import {AppThunk} from '../../../app/store';
import {startCircular, stopCircular} from '../../userFeedback/userFeedback-reducer';
import {handleError} from '../../../common/utils/error-utils';
import {
    cardsAPI,
    CardType,
    CreateCardDataType,
    FetchCardParamsType,
    FetchCardsRespType,
    UpdateCardData
} from '../../../api/cardAPI';

type InitStateType = typeof initialState

const initialState = {
    cardsSorted: '',
    idOfCardsPack: '',
    cards: [] as CardType[],
    page: 1,
    cardsTotalCount: 0,
    pageCount: 8,
}

export const mypackReducer = (state: InitStateType = initialState, action: MyPackActionsType): InitStateType => {
    switch (action.type) {
        case 'mypack/SET-CARDSDATA':
            return {...state, ...action.cards, pageCount: 8}
        case 'mypack/SET-PACHUSERID':
            return {...state, idOfCardsPack: action.packUserId}
        case 'mypack/SET-SORTED':
            return {...state, cardsSorted: action.sorted}
        case 'mypack/SET-PAGE':
            return {...state, page: action.page}
        default:
            return state
    }
}
export const setPageAC = (page: number) => {
    return {
        type: 'mypack/SET-PAGE',
        page
    } as const
}


export const setCardsAC = (cards: FetchCardsRespType) => {
    return {
        type: 'mypack/SET-CARDSDATA',
        cards
    } as const
}
export const sortCardsAC = (sorted: string) => {
    return {
        type: 'mypack/SET-SORTED',
        sorted
    } as const
}

export const setPackUserId = (packUserId: string) => {
    return {
        type: 'mypack/SET-PACHUSERID',
        packUserId
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
        let numPage = localStorage.getItem('valueCountCardsOnPage')
        if (numPage) {
          dispatch(setPageAC( +numPage))
        }
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

export type MyPackActionsType =
    ReturnType<typeof setCardsAC> |
    ReturnType<typeof setPackUserId> |
    ReturnType<typeof sortCardsAC> |
    ReturnType<typeof setPageAC>
