import {cardsAPI, CardType} from '../../../api/cardAPI';
import {AppThunk} from '../../../app/store';
import {startCircular, stopCircular} from '../../userFeedback/userFeedback-reducer';
import {handleError} from '../../../common/utils/error-utils';

type InitStateType = typeof initialState

const initialState = {
    idOfCardsPack: '',
    cards: [
        {
            _id: '',
            cardsPack_id: '',
            user_id: '',
            answer: '',
            question: '',
            grade: 0,
            shots: 0,
            comments: '',
            type: '',
            rating: 0,
            more_id: '',
            created: '',
            updated: '',
            __v: 0,
        }
    ] as CardType[],
    page: 1,
    cardsTotalCount: 1,
    pageCount: 8,
}

export const learnPackReducer = (state: InitStateType = initialState, action: LearnPackActions): InitStateType => {
    switch (action.type) {
        case 'learnPack/SET-CARDS':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setCards = (cards: CardType[]) => {
    return {
        type: 'learnPack/SET-CARDS',
        payload: {cards}
    } as const
}

export const getCardsToLearn = (cardsPack_id: string, pageCount: number = 1000): AppThunk => async dispatch => {
    try {
        dispatch(startCircular())
        const res = await cardsAPI.fetchCard({cardsPack_id , pageCount})
        dispatch(setCards(res.data.cards))
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(stopCircular())
    }
}

export type LearnPackActions =
    ReturnType<typeof setCards>

