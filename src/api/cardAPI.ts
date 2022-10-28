import {instance} from "./instance";

export const cardsAPI = {
    fetchCard(params: FetchCardParamsType) {
        return instance.get<FetchCardsRespType>("cards/card", {params})
    },
    createCard(data: CreateCardDataType) {
        return instance.post<CreateCardResponseType>("cards/card", {card: data})
    },
    removeCard(id: string) {
        return instance.delete<DeleteCardResponseType>(`cards/card?id=${id}`)
    },
    updateCard(data: UpdateCardData) {
        return instance.put<UpdateCardResponseType>("cards/card", {card: data})
    }
}

//Types --Payload--

export type FetchCardParamsType = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type CreateCardDataType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type UpdateCardData = {
    _id: string
    question?: string
    answer?: string
    comments?: string
}

//Types --Response--

export type FetchCardsRespType = BaseCardRespType & {
    cards: CardType[]
    packUserId: string
    packName: string
    packPrivate: boolean
    packDeckCover: string
    packCreated: Date | null
    packUpdated: Date | null
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
}

export type CardType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number;
    comments: string;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
}

export type CreateCardResponseType = BaseCardRespType & {
    newCard: CardType
}

export type DeleteCardResponseType = BaseCardRespType & {
    deletedCard: CardType
}

export type UpdateCardResponseType = BaseCardRespType & {
    updatedCard: CardType
}

type BaseCardRespType = {
    token: string
    tokenDeathTime: number
}

//Types --Error--

export type RejCardError = {
    error: string;
    errorObject: {
        stringValue: string;
        kind: string;
        value: string;
        path: string;
        reason: any;
    }
    in: string;
    info: string;
}