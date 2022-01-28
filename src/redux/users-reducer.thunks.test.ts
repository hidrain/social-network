import { actions, follow, unfollow } from './users-reducer'
import { usersAPI } from '../api/users-api'
import { APIResponseType, ResultCodesEnum } from '../api/api'

jest.mock('../api/users-api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

test('success follow thonk', async () => {
    //Arrange
    const thunk = follow(1)

    //Act
    userAPIMock.follow.mockReturnValue(Promise.resolve(result))
    await thunk(dispatchMock, getStateMock, {})

    //Assert 
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})

test('success unfollow thonk', async () => {
    //Arrange
    const thunk = unfollow(1)

    //Act
    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
    await thunk(dispatchMock, getStateMock, {})

    //Assert 
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})
