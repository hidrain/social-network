import React from 'react'
import { connect } from 'react-redux'
import { DispatchPropsType, Header, MapPropsType } from './header';
import { logout } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store';


export class HeaderAPIComponent extends React.Component<MapPropsType & DispatchPropsType> {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    // logout: state.auth.logout
})

export const HeaderContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
    mapStateToProps,
    { logout })(HeaderAPIComponent)



