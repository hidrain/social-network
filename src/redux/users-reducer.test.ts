import { actions, InitialStateType, usersReducer } from './users-reducer'

//Arrange
let state: InitialStateType
beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'Dima 0', followed: false,
                photos: { small: null, large: null }, status: 'status 0'
            },
            {
                id: 1, name: 'Masha 1', followed: false,
                photos: { small: null, large: null }, status: 'status 1'
            },
            {
                id: 2, name: 'Pavel 2', followed: true,
                photos: { small: null, large: null }, status: 'status 2'
            },
            {
                id: 3, name: 'Alina 3', followed: true,
                photos: { small: null, large: null }, status: 'status 3'
            }
        ],
        pageSize: 5,
        totalItemsCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [] as Array<number>
    }
})

test('follow success', () => {
    //Act
    const newState = usersReducer(state, actions.followSuccess(1))
    //Assert 
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
    //Act
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    //Assert 
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()

})