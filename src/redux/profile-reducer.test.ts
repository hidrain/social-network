import { actions, profileReducer } from "./profile-reducer"

test('new post should be added', () => {
    //Arrange
    let action = actions.addPostActionCreator('some text')
    let state = {
        posts: [
            { id: 1, message: 'Hi, how are you?', likeCount: 12 },
            { id: 2, message: 'It is my first post', likeCount: 11 },
            { id: 3, message: 'bla bla', likeCount: 11 },
            { id: 4, message: 'da da da', likeCount: 11 }
        ],
        profile: null,
        status: '',
        newPostText: ''
    }
    //Act
    let newState = profileReducer(state, action)
    //Assert 
    expect(newState.posts.length).toBe(5)
});

test('message of new post should be correct', () => {
    //Arrange
    let action = actions.addPostActionCreator('some text')
    let state = {
        posts: [
            { id: 1, message: 'Hi, how are you?', likeCount: 12 },
            { id: 2, message: 'It is my first post', likeCount: 11 },
            { id: 3, message: 'bla bla', likeCount: 11 },
            { id: 4, message: 'da da da', likeCount: 11 }
        ],
        profile: null,
        status: '',
        newPostText: ''
    }
    //Act
    let newState = profileReducer(state, action)
    //Assert
    expect(newState.posts[4].message).toBe('some text')
});

test('after deleting length of messages should be decrement', () => {
    //Arrange
    let action = actions.deletePostActionCreator(1)
    let state = {
        posts: [
            { id: 1, message: 'Hi, how are you?', likeCount: 12 },
            { id: 2, message: 'It is my first post', likeCount: 11 },
            { id: 3, message: 'bla bla', likeCount: 11 },
            { id: 4, message: 'da da da', likeCount: 11 }
        ],
        profile: null,
        status: '',
        newPostText: ''
    }
    //Act
    let newState = profileReducer(state, action)
    //Assert
    expect(newState.posts.length).toBe(3)
});

test(`after deleting length of messages shouldn't be decrement if id is incorrect`, () => {
    //Arrange
    let action = actions.deletePostActionCreator(100)
    let state = {
        posts: [
            { id: 1, message: 'Hi, how are you?', likeCount: 12 },
            { id: 2, message: 'It is my first post', likeCount: 11 },
            { id: 3, message: 'bla bla', likeCount: 11 },
            { id: 4, message: 'da da da', likeCount: 11 }
        ],
        profile: null,
        status: '',
        newPostText: ''
    }
    //Act
    let newState = profileReducer(state, action)
    //Assert
    expect(newState.posts.length).toBe(4)
});