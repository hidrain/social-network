import { sendMessageCreator } from '../../redux/dialogs-reducer'
import Dialogs from './dialogs';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withAuthRedirect } from '../hoc/with-auth-redirect';


// export const DialogsContainer = () => {

//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 let state = store.getState().dialogsPage

//                 let onSendMessageClick = () => {
//                     store.dispatch(sendMessageCreator());
//                 }
//                 let onNewMessageChange = (body) => {
//                     store.dispatch(updateNewMessageBodyCreator(body));
//                 }

//                 return <Dialogs sendMessage={onSendMessageClick} updateNewMessageBody={onNewMessageChange}
//                     dialogsPage={state} />
//             }
//             }
//         </StoreContext.Consumer>
//     );
// }


//данные state
let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        newMessageBody: state.dialogsPage.newMessageBody,
    }
}
//callbacks
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
}

export const DialogsContainer = compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs)

// let AuthRedirectComponent = withAuthRedirect(Dialogs)

// export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)