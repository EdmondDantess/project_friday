import {AppThunk} from "../../app/store";
import {cardsAPI, CardType} from "../../api/cardAPI";
import {AxiosError} from "axios";
import {handleError} from "../../common/utils/error-utils";
import { startCircular, stopCircular } from "../userFeedback/userFeedback-reducer";

type stateType = {
    cards: Array<CardType>
}

const initialState: stateType = {
    cards: []
}

const friendsPackReducer = (state = initialState, action: friendsPackAT): stateType => {
    switch (action.type) {
        case 'FRIENDS/SET_CARDS': {
            return {...state, cards: action.cards}
        }
        
        default: {
            return state
        }
    }
}

export default friendsPackReducer;

export const setCardsAC = (cards: CardType[]) => {
    return {
        type: 'FRIENDS/SET_CARDS',
        cards
    } as const
}

export type friendsPackAT = ReturnType<typeof setCardsAC>

export const getFriendsCards = (id: string): AppThunk => {
    return (dispatch) => {
        dispatch(startCircular())
        cardsAPI.fetchCard({cardsPack_id: id}).then((res) => {
            dispatch(setCardsAC(res.data.cards))
        }).catch((error: AxiosError & any) => {
            handleError(error, dispatch)
        }).finally(() => {
            dispatch(stopCircular())
        })
    }
}