import { dialogsReducer } from "./dialogs-reducer"
import { profileReducer } from "./profile-reducer"
import { sidebarReducer } from "./sidebar-reducer"


export let store = {
    _state: {

        profilePage: {
            posts: [
                { id: 1, message: 'Hi, how are you?', likeCount: 12 },
                { id: 2, message: 'It is my first post', likeCount: 11 },
                { id: 3, message: 'bla bla', likeCount: 11 },
                { id: 4, message: 'da da da', likeCount: 11 }
            ],
            newPostText: 'Write a post'
        },

        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Dima' },
                { id: 2, name: 'Andrew' },
                { id: 3, name: 'Sveta' },
                { id: 4, name: 'Sasha' },
                { id: 5, name: 'Viktor' },
                { id: 6, name: 'Valera' }
            ],
            messages: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'How are you?' },
                { id: 3, message: 'Fine, and you?' },
                { id: 4, message: 'Nice' },
                { id: 5, message: 'Good' }
            ],
            newMessageBody: ''
        }

    },
    _callSubscriber() {
        console.log('State is changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer // паттерн наблюдатель // похож на publisher-subscriber
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }
}


window.store = store

