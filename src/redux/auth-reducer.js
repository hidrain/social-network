import { authAPI } from "../api/api"
import { stopSubmit } from 'redux-form'

const SENT_USER_DATA = 'auth/SET-USER-DATA'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SENT_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({ type: SENT_USER_DATA, data: { id, email, login, isAuth } }) //dispatch

export const getAuthUserData = () => async (dispatch) => { // ThunkCreator
    const data = await authAPI.me()
    if (data.resultCode === 0) {
        let { id, email, login } = data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email, password, rememberMe) => async (dispatch) => { // ThunkCreator
    const data = await authAPI.login(email, password, rememberMe)
    if (data.resultCode === 0) {
        dispatch(getAuthUserData())
    }
    else {
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const logout = () => async (dispatch) => { // ThunkCreator
    const data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


