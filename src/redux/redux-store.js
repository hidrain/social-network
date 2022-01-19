import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { authReducer } from './auth-reducer'
import { dialogsReducer } from "./dialogs-reducer"
import { profileReducer } from "./profile-reducer"
import { sidebarReducer } from "./sidebar-reducer"
import { usersReducer } from './users-reducer'
import { reducer as formReducer } from 'redux-form'
import { appReducer } from './app-reducer'

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware))) //composeEnhancers - подключение расширения для хрома Redux DevTools

// export let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.__store__ = store