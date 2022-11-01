import {instance} from "./instance";

export const packAPI = {
    fetchCardPack(params: FetchCardPackParamsType) {
        return instance.get<FetchCardPacksRespType>('cards/pack', {params})
    },
    createCardPack(newPack: CreateNewPackDataType) {
        return instance.post<CreateCardPacksRespType>('cards/pack', {cardsPack: newPack})
    },
    deleteCardPack(id: string) {
        return instance.delete<DeleteCardPackRespType>(`cards/pack?id=${id}`)
    },
    updateCardPack(data: UpdateCardsPackDataType) {
        return instance.put<ChangeCardPackNameRespType>('cards/pack', {cardsPack: data})
    },
}

//Types --Payload--

export type FetchCardPackParamsType = {
    user_id?: string
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    block?: boolean
}
export type CreateNewPackDataType = {
    name: string
    deckCover?: string
    private?: boolean
}
export type UpdateCardsPackDataType = {
    _id: string
    name?: string
}

//Types --Response--

export type FetchCardPacksRespType = BaseCardsPackRespType & {
    cardPacks: CardPackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
}

export type CardPackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: Date | null
    updated: string
    more_id: string
    __v: number
}

export type CreateCardPacksRespType = BaseCardsPackRespType & {
    newCardsPack: CardPackType
}

export type DeleteCardPackRespType = BaseCardsPackRespType & {
    deletedCardsPack: CardPackType
}

export type ChangeCardPackNameRespType = BaseCardsPackRespType & {
    updatedCardsPack: CardPackType
}

export type BaseCardsPackRespType = {
    token: string
    tokenDeathTime: number
}

//Types --Error--

export type RejCardsPackErrorType = {
	more: {
        body: any;
    };
	error: string;
	in: string;
	info: string;
}