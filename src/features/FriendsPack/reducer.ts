import {Dispatch} from 'redux';
import {AxiosError} from 'axios';
import {getCardApi, getPackApi} from "../../api/api";
import {AppThunk} from '../../app/store';
import {startCircular, stopCircular} from '../userFeedback/userFeedback-reducer';
import {handleError} from '../../common/utils/error-utils';
import {setIsLoggedAC, setUserEmailAC, setUserNameAC} from '../profile/profile-reducer';

type cardType = {
    _id: string
    user_id: string
    question: string
    answer: string 
    cardsPack_id: string
    grade: number
    shots: 1
    created: string
    updated: string
}

type stateType = {
    cards: Array<cardType>
}

const initialState: stateType = {
    cards: [
        { 
            _id: "5ebbd48876810f1ad0e7ece3",
            user_id: "142151531535151",
            question: "Какой цвет граната?",
            answer: "Красный",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4" ,
            grade: 4.987525071790364,
            shots: 1,
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13T11:05:44.867Z",
        },
        { 
            _id: "5ebbd48876810f1ad0e7ece3",
            user_id: "142151531535151",
            question: "Цвет изумруда?",
            answer: "Зеленый",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.487525071790364,
            shots: 1,
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13T11:05:44.867Z",
        }
    ]
}

const friendsPackReducer = (state = initialState, action: friendsPackAT): stateType => {
    switch (action.type) {
        case 'FRIENDS/SET_CARDS': {
            return {...state, cards: action.cards, }
        }
        
        default: {
            return state
        }
    }
}

export default friendsPackReducer;

export const setCardsAC = (cards: cardType[]) => {
    return {
        type: 'FRIENDS/SET_CARDS',
        cards
    } as const
}

export type friendsPackAT = ReturnType<typeof setCardsAC>

export const getFriendsPack = (): AppThunk => {
    return (dispatch: Dispatch) => {
        dispatch(startCircular())
        getPackApi()
            .then((res) => {
                dispatch(setIsLoggedAC(true))
                dispatch(setUserNameAC(res.data.name))
                dispatch(setUserEmailAC(res.data.email))
            })
            .catch((error: AxiosError) => {
                handleError(error, dispatch)
            })
            .finally(() => {
                dispatch(stopCircular())
            })
    }
}