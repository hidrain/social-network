import { InferActionsTypes } from "./redux-store"

type DialogType = {
    id: number,
    name: string
}
type MessageType = {
    id: number,
    message: string
}
export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

let initialState = {
    dialogs: [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Fine, and you?' },
        { id: 4, message: 'Nice' },
        { id: 5, message: 'Good' }
    ] as Array<MessageType>,
}

export const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'dialogs/SEND-MESSAGE':
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: body }],
            }
        default:
            return state
    }
}

export const actions = {
    sendMessage: (newMessageBody: string) => {
        return {
            type: 'dialogs/SEND-MESSAGE',
            newMessageBody
        } as const
    }
}
