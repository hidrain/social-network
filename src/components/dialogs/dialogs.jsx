import React from 'react';
import classes from './dialogs.module.css'
import DialogItem from './dialog-item/dialog-item'
import { Message } from './message/message'
import { Navigate } from 'react-router-dom'
import AddMessageForm from './add-message-form/add-message-form'



export const Dialogs = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(({ name, id }) => <DialogItem name={name} id={id} key={id} />)
    let messagesElements = state.messages.map(m => <Message message={m.message} id={m.id} key={m.id} />)

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    if (!props.isAuth) return <Navigate replace to='/login' />

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
