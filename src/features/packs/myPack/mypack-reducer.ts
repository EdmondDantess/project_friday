import {startCircular, stopCircular} from '../../userFeedback/userFeedback-reducer';
import {handleError} from '../../../common/utils/error-utils';
import {packAPI} from '../../../api/packAPI';
import {AppThunk} from '../../../app/store';
import {
    cardsAPI,
    CardType,
    CreateCardDataType,
    FetchCardParamsType,
    FetchCardsRespType,
    UpdateCardData,
    UpdatedGradeType
} from '../../../api/cardAPI';

type InitStateType = typeof initialState

const initialState = {
    cardsSorted: '',
    cardsPackId: '',
    cards: [] as CardType[],
    page: 1,
    cardsTotalCount: 1,
    searchValueInput: '',
    packName: '',
    packUserId: '',
    packCreatorId: '',
    packIsEmpty: false,
    packDeckCover: ''
}

export const mypackReducer = (state: InitStateType = initialState, action: MyPackActionsType): InitStateType => {
    switch (action.type) {
        case 'mypack/SET-CARDSDATA':
            return {...state, ...action.payload.data}
        case 'mypack/SET-CARDSDATAEMPTY':
            return {...state, cards: action.payload.cards}
        case 'mypack/SET-PACHUSERID':
            return {...state, cardsPackId: action.payload.packId}
        case 'mypack/SET-SORTED':
            return {...state, cardsSorted: action.payload.sorted}
        case 'mypack/SET-PAGE':
            return {...state, page: action.payload.page}
        case 'mypack/SET-PACKIDCREATOR':
            return {...state, packCreatorId: action.payload.id}
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
        case 'mypack/SET-DECKCOVER':
            return {
                ...state,
                packDeckCover: action.payload.deckCover
            }
        case 'mypack/SET-PACKNAME':
            return {
                ...state, packName: action.payload.name
            }
        case 'mypack/SET-PACKEMPTYSTATUS':
            return {
                ...state, packIsEmpty: action.payload.status
            }
        default:
            return state
    }
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
export const setCardsAC = (data: FetchCardsRespType) => {
    return {
        type: 'mypack/SET-CARDSDATA',
        payload: {data}
    } as const
}
export const setCardsToEmptyState = (cards: CardType[]) => {
    return {
        type: 'mypack/SET-CARDSDATAEMPTY',
        payload: {cards}
    } as const
}
export const setPackUserId = (packId: string) => {
    return {
        type: 'mypack/SET-PACHUSERID',
        payload: {packId}
    } as const
}
export const setDeckCover = (deckCover: string) => {
    return {
        type: 'mypack/SET-DECKCOVER',
        payload: {deckCover}
    } as const
}
export const setPackEmptyStatus = (status: boolean) => {
    return {
        type: 'mypack/SET-PACKEMPTYSTATUS',
        payload: {status}
    } as const
}
export const setPackName = (name: string) => {
    return {
        type: 'mypack/SET-PACKNAME',
        payload: {name}
    } as const
}
export const setPackCreatorId = (id: string) => {
    return {
        type: 'mypack/SET-PACKIDCREATOR',
        payload: {id}
    } as const
}
export const sortCardsAC = (sorted: string) => {
    return {
        type: 'mypack/SET-SORTED',
        payload: {sorted}
    } as const
}
export const setPageAC = (page: number) => {
    return {
        type: 'mypack/SET-PAGE',
        payload: {page}
    } as const
}

export const getCardsTC = (params: FetchCardParamsType): AppThunk => async dispatch => {
    try {
        dispatch(startCircular())
        const res = await cardsAPI.fetchCard(params)
        dispatch(setCardsAC(res.data))
        if (res.data.cards.length > 0) {
            dispatch(setPackEmptyStatus(false))
        } else {
            dispatch(setPackEmptyStatus(true))
        }
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(stopCircular())
    }
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
export const deletePackOnMyPage = (packId: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(startCircular())
            await packAPI.deleteCardPack(packId)
            dispatch(setPackUserId('deleted'))
        } catch (error: any) {
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
        } catch (error: any) {
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
    ReturnType<typeof setPackCreatorId> |
    ReturnType<typeof setCardsToEmptyState> |
    ReturnType<typeof setPackEmptyStatus> |
    ReturnType<typeof setDeckCover> |
    ReturnType<typeof setPackName> |
    ReturnType<typeof setUpdatedGrade>