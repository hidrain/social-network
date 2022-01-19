import { usersAPI } from "../api/api"

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET-USERS'
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE-IS-FOLLOWING-PROGRESS'

let initialState = {
    users: [],
    pageSize: 5,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
}

export const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }

        case UNFOLLOW:
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

        case SET_USERS:
            return { ...state, users: action.users } //перезаписать всех пользователей на пришедших из запроса
        // return { ...state, users: [...state.users, ...action.users] } //дописать массив пользователей

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }

        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalItemsCount: action.totalCount }

        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }

        case TOGGLE_IS_FOLLOWING_PROGRESS:
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

export const followSuccess = (userId) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const totalItemsCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching, })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const requestUsers = (currentPage, pageSize) => { // ThunkCreator
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))

        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(totalItemsCount(data.totalCount))
    }
}

const followUnfollowFlow = async (dispatch, id, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, id))
    let data = await apiMethod(id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(toggleFollowingProgress(false, id))
}

export const follow = (id) => { // ThunkCreator
    return async (dispatch) => {
        followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (id) => { // ThunkCreator
    return async (dispatch) => {
        followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
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