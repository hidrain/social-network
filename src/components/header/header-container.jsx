import React from 'react'
import { connect } from 'react-redux'
import { Header } from './header';
import { logout } from '../../redux/auth-reducer'


export class HeaderAPIComponent extends React.Component {

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    logout: state.auth.logout
})

export const HeaderContainer = connect(mapStateToProps, { logout })(HeaderAPIComponent)



