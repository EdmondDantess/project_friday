import {instance} from "./instance";

export const packAPI = {
    getCardPacks(params: GetCardPackParams) {
        return instance.get<GetCardPacksRespType>('cards/pack', params = {})
    },
    createPack(newPack: CreateNewPackData) {
        return instance.post<CreateCardPacksRespType>('cards/pack', {cardsPack: newPack})
    },
    removePack(id: string) {
        return instance.delete<RemoveCardPackRespType>(`cards/pack?id=${id}`)
    },
    updatePack(data: UpdateCardsPackDataType) {
        return instance.put<ChangeCardPackNameRespType>('cards/pack', {cardsPack: data})
    },
}

//Types --Payload--

export type GetCardPackParams = {
    user_id?: string
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    block?: boolean
}
export type CreateNewPackData = {
    name: string
    deckCover?: string
    private?: boolean
}
type UpdateCardsPackDataType = {
    _id: string
    name?: string
}

//Types --Response--

export type GetCardPacksRespType = {
    cardPacks: CardPackType
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
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

export type RemoveCardPackRespType = BaseCardsPackRespType & {
    deletedCardsPack: CardPackType
}

export type ChangeCardPackNameRespType = BaseCardsPackRespType & {
    updatedCardsPack: CardPackType
}

type BaseCardsPackRespType = {
    token: string
    tokenDeathTime: number
}

//Types --Error--

export type RejCardsPackError = {
	more: {
        body: any;
    };
	error: string;
	in: string;
	info: string;
}