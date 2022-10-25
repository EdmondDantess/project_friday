import {AppThunk} from '../../../app/store';
import {CardsType, myPackApi} from '../../../api/myPackApi';

type InitStateType = typeof initialState

const initialState = {
    cards: [] as CardsType[],
    packUserId: '6358089461a8d500046944db'
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

export const postCardTC = (cardsPack_id: string): AppThunk => async dispatch => {
    try {
        const res = await myPackApi.postCard(cardsPack_id)
        console.log(res)
    } catch (e) {
        alert(JSON.stringify(e))
    }
}

export const getCardsTC = (packId: string, page: number = 1): AppThunk => async dispatch => {
    try {
        const res = await myPackApi.getCards(packId, page)
        console.log(res)
        dispatch(setCardsAC(res.data))
    } catch (e) {
        console.log(e)
    }
}

export const deleteCardTC = (id: string): AppThunk => async dispatch => {
    try {
        const res = await myPackApi.deleteCard(id)
        console.log(res)
    } catch (e) {
        alert(JSON.stringify(e))
    }
}
export const updateCardTC = (id: string, question?: string, answer?: string): AppThunk => async dispatch => {
    try {
        const res = await myPackApi.updateCard(id, question, answer)
        console.log(res)
    } catch (e) {
        alert(JSON.stringify(e))
    }
}
export const ff = (): AppThunk => async dispatch => {
    try {
        const res = await myPackApi.postP()
        console.log(res)
    } catch (e) {
        alert(JSON.stringify(e))
    }
}


type SetCardsACType = ReturnType<typeof setCardsAC>

export type MyPackActionsType = SetCardsACType