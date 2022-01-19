const SEND_MESSAGE = 'dialogs/SEND-MESSAGE'

let initialState = {
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
}

export const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: body }],
            }
        default:
            return state
    }
}

export const sendMessageCreator = (newMessageBody) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    }
}

