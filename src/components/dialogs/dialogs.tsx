import classes from './dialogs.module.css'
import DialogItem from './dialog-item/dialog-item'
import { Message } from './message/message'
import AddMessageForm from './add-message-form/add-message-form'
import { InitialStateType } from '../../redux/dialogs-reducer'

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}
export type NewMessageFormValuesType = {
    newMessageBody: string
}

export const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(({ name, id }) => <DialogItem name={name} id={id} key={id} />)
    let messagesElements = state.messages.map(({ message, id }) => <Message message={message} key={id} />)

    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody)
    }

    return (

        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={classes.messages}>
                {messagesElements}
                <AddMessageForm onSubmit={addNewMessage} />
            </div>
        </div>
    );
}

export default Dialogs;
