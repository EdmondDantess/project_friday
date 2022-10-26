import {AppThunk} from '../../../app/store';
import {CardsType, myPackApi} from '../../../api/myPackApi';
import {startCircular, stopCircular} from '../../userFeedback/userFeedback-reducer';
import {handleError} from '../../../common/utils/error-utils';

type InitStateType = typeof initialState

const initialState = {
    cards: [] as CardsType[],
    //  packUserId:
}
console.log(initialState)
export const mypackReducer = (state: InitStateType = initialState, action: MyPackActionsType): InitStateType => {
    switch (action.type) {
        case 'mypack/SET-CARDSDATA':
            return {...state, ...action.cards}
        default:
            return state
    }
}

export const setCardsAC = (cards: any) => {
    return {
        type: 'mypack/SET-CARDSDATA',
        cards
    } as const
}

export const postCardTC = (cardsPack_id: string, question?: string, answer?: string): AppThunk => async dispatch => {
    try {
        dispatch(startCircular())
        const res = await myPackApi.postCard(cardsPack_id, question, answer)
        console.log(res)
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(stopCircular())
    }
}

export const getCardsTC = (packId: string, page: number = 1, pageCount: number = 8, cardAnswer?: string, cardQuestion?: string): AppThunk => async dispatch => {
    try {
        dispatch(startCircular())
        const res = await myPackApi.getCards(packId, page, pageCount, cardAnswer, cardQuestion)
        console.log(res)
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
        const res = await myPackApi.deleteCard(id)
        console.log(res)
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(stopCircular())
    }
}
export const updateCardTC = (id: string, question?: string, answer?: string): AppThunk => async dispatch => {
    try {
        dispatch(startCircular())
        const res = await myPackApi.updateCard(id, question, answer)
        console.log(res)
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(stopCircular())
    }
}

type SetCardsACType = ReturnType<typeof setCardsAC>

export type MyPackActionsType = SetCardsACType