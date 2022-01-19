
import { getAuthUserData } from "./auth-reducer"

const INITIALIZED_SUCCESS = 'app/INITIALIZED-SUCCESS'

let initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    }
}

export const initializeApp = () => { // ThunkCreator
    return (dispatch) => {

        let promise = dispatch(getAuthUserData())
        promise.then(() => {
            dispatch(initializedSuccess())
        })
    }
}

