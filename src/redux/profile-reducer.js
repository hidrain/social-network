import { profileAPI } from "../api/api"

const ADD_POST = 'profile/ADD-POST'
const DELETE_POST = 'profile/DELETE-POST'
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE'
const SET_STATUS = 'profile/SET-STATUS'



let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likeCount: 12 },
        { id: 2, message: 'It is my first post', likeCount: 11 },
        { id: 3, message: 'bla bla', likeCount: 11 },
        { id: 4, message: 'da da da', likeCount: 11 }
    ],
    profile: null,
    status: '',
}

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likeCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId),
                newPostText: ''
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }

        default:
            return state
    }
}

//dispatchs
export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const deletePostActionCreator = (postId) => ({ type: DELETE_POST, postId })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })

export const getUserProfile = (userId) => async (dispatch) => { // ThunkCreator
    const data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getStatus = (userId) => async (dispatch) => { // ThunkCreator
    const data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
}

export const updateStatus = (status) => async (dispatch) => { // ThunkCreator
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}