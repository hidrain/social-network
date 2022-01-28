import { actions } from '../../redux/dialogs-reducer'
import Dialogs from './dialogs'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withAuthRedirect } from '../hoc/with-auth-redirect'
import { AppStateType } from '../../redux/redux-store'

//данные state
let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        // newMessageBody: state.dialogsPage.newMessageBody,
    }
}
//callbacks

export const DialogsContainer = compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, { ...actions })
)(Dialogs)

