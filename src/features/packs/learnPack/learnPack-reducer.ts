const initialState = {
    packName: '' ,
}

type InitialStateType = typeof initialState

export const learnPackReducer = (state: InitialStateType = initialState, action: LearnPackActionsType): InitialStateType => {
    switch (action.type) {
        case "learnPack/SET-PACKNAME":
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const setPackName = (packName: string) => ({
    type: "learnPack/SET-PACKNAME",
    payload: {packName}
} as const)



export type LearnPackActionsType =
    ReturnType<typeof setPackName>