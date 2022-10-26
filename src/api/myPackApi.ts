import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const myPackApi = {
    getCards(packId: string, page: number, pageCount: number, cardQuestion?: string, cardAnswer?: string) {
        return instance.get<ResponseGetCardsType>(`/cards/card`, {
            params: {
                cardsPack_id: packId,
                page,
                pageCount,
                cardAnswer,
                cardQuestion,
            }
        })
    },
    postCard(cardsPack_id: string, question?: string, answer?: string) {
        return instance.post(`/cards/card`, {
            card: {
                question,
                answer,
                cardsPack_id,

            }
        })
    },
    deleteCard(id: string) {
        return instance.delete(`/cards/card?id=${id}`)
    },
    updateCard(id: string, question?: string, answer?: string) {
        return instance.put(`/cards/card`, {
            card: {
                _id: id,
                question,
                answer
            }
        })
    },
  }

type ResponseGetCardsType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: Date
    updated: Date
    _id: string
}

type postCardBodyType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: string
        shots?: string
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}