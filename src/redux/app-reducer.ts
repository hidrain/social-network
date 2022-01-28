
import { getAuthUserData } from "./auth-reducer"
import { InferActionsTypes } from "./redux-store"

let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'app/INITIALIZED-SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const actions = {
    initializedSuccess: () => ({ type: 'app/INITIALIZED-SUCCESS' } as const)
}

export const initializeApp = () => { // ThunkCreator
    return (dispatch: any) => {

        let promise = dispatch(getAuthUserData())
        promise.then(() => {
            dispatch(actions.initializedSuccess())
        })
    }
}

