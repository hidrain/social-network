import { usersAPI } from './../api/users-api';
import { Dispatch } from "redux"
import { UserType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./redux-store"
import { APIResponseType } from '../api/api';

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type FilterType = typeof initialState.filter

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users id
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'users/FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }

        case 'users/UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }

        // OLD VERSION FOLLOW/UNFOLLOW
        // case FOLLOW:
        //     return {
        //         ...state,
        //         users: state.users.map(u => {
        //             if (u.id === action.userId) {
        //                 return { ...u, followed: true }
        //             }
        //             return u
        //         })
        //     }

        // case UNFOLLOW:
        //     return {
        //         ...state,
        //         users: state.users.map(u => {
        //             if (u.id === action.userId) {
        //                 return { ...u, followed: false }
        //             }
        //             return u
        //         })
        //     }

        case 'users/SET_USERS':
            return { ...state, users: action.users } //перезаписать всех пользователей на пришедших из запроса
        // return { ...state, users: [...state.users, ...action.users] } //дописать массив пользователей

        case 'users/SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }

        case 'users/SET_FILTER':
            return { ...state, filter: action.payload }

        case 'users/SET_TOTAL_USERS_COUNT':
            return { ...state, totalItemsCount: action.totalCount }

        case 'users/TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }

        case 'users/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

export const actions = {
    followSuccess: (userId: number) => ({ type: 'users/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'users/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'users/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'users/SET_CURRENT_PAGE', currentPage } as const),
    setFilter: (filter: FilterType) => ({ type: 'users/SET_FILTER', payload: filter } as const),
    totalItemsCount: (totalCount: number) => ({ type: 'users/SET_TOTAL_USERS_COUNT', totalCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'users/TOGGLE_IS_FETCHING', isFetching, } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}

export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => { // ThunkCreator
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setFilter(filter))

        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.totalItemsCount(data.totalCount))
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, id: number,
    apiMethod: (id: number) => Promise<APIResponseType>,
    actionCreator: (id: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, id))
    let data = await apiMethod(id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(actions.toggleFollowingProgress(false, id))
}

export const follow = (id: number): ThunkType => { // ThunkCreator
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (id: number): ThunkType => { // ThunkCreator
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}

// OLD VERSION FOLLOW/UNFOLLOW

// export const follow = (id) => { // ThunkCreator
//     return async (dispatch) => {
//         dispatch(toggleFollowingProgress(true, id))

//         let data = await usersAPI.follow(id)
//         if (data.resultCode === 0) {
//             dispatch(followSuccess(id))
//         }
//         dispatch(toggleFollowingProgress(false, id))
//     }
// }

// export const unfollow = (id) => { // ThunkCreator
//     return async (dispatch) => {

//         dispatch(toggleFollowingProgress(true, id))

//         let data = await usersAPI.unfollow(id)
//         if (data.resultCode === 0) {
//             dispatch(unfollowSuccess(id))
//         }
//         dispatch(toggleFollowingProgress(false, id))
//     }
// }