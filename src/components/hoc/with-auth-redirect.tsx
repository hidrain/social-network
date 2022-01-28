import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppStateType } from '../../redux/redux-store'

// type MapPropsType = {
//     isAuth: boolean
// }
// type DispatchPropsType = {}

// let mapStateToPropsForRedirect = (state: AppStateType) => ({
//     isAuth: state.auth.isAuth
// })

// export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType) {
//     const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
//         let { isAuth, ...restProps } = props

//         if (!isAuth) return <Navigate replace to='/login' />
//         return <WrappedComponent {...restProps as WCP} />
//     }

//     let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
//         mapStateToPropsForRedirect)(RedirectComponent)

//     return ConnectedAuthRedirectComponent
// }

type MapStatePropsType = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component: React.ComponentType) => {
    class RedirectComponent extends React.Component<MapStatePropsType> {
        render() {
            if (!this.props.isAuth) return <Navigate replace to={"/login"} />;

            return <Component {...this.props} />
        }
    }
    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}