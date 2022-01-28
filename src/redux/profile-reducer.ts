import { profileAPI } from './../api/profile-api';
import { PhotosType } from './../types/types';
import { FormAction, stopSubmit } from "redux-form"
import { PostType, ProfileType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from './redux-store';

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likeCount: 12 },
        { id: 2, message: 'It is my first post', likeCount: 11 },
        { id: 3, message: 'bla bla', likeCount: 11 },
        { id: 4, message: 'da da da', likeCount: 11 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'profile/ADD_POST':
            let newPost = {
                id: 5,
                message: action.newPostText,
                likeCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case 'profile/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId),
            }
        case 'profile/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'profile/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'profile/SAVE_PHOTO_SUCCSESS':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }

        default:
            return state
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: 'profile/ADD_POST', newPostText } as const),
    deletePostActionCreator: (postId: number) => ({ type: 'profile/DELETE_POST', postId } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'profile/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'profile/SET_STATUS', status } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'profile/SAVE_PHOTO_SUCCSESS', photos } as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => { // ThunkCreator
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => { // ThunkCreator
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => { // ThunkCreator
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => { // ThunkCreator
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => { // ThunkCreator
    const userId = getState().auth.id
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId !== null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error(`userId can't be null`)
        }
    } else {
        // let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        // dispatch(stopSubmit('edit-profile', { 'contacts': { 'facebook': data.messages[0] } })) верный вариант!
        //ПОСЛЕ РАСПАРСИТЬ ОБЪЕКТ

        dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}