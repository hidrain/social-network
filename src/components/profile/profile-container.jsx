import React from 'react'
import { connect } from 'react-redux'
import { Profile } from './profile';
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer';
import { useMatch } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/with-auth-redirect';
// import { compose } from 'redux'


export class ProfileAPIComponent extends React.Component {

    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : this.props.authorizedUserId

        this.props.getUserProfile(userId)
        this.props.getStatus(userId)

    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
        );
    }
}

// export const ProfileContainer = compose(
//     connect(mapStateToProps, { setUserProfile, getUserProfile }),
//     ProfileURLMatch
//     withAuthRedirect
// )(ProfileAPIComponent)

let AuthRedirectComponent = withAuthRedirect(ProfileAPIComponent)

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

const ProfileURLMatch = (props) => {
    const match = useMatch('/profile/:userId/');
    return <AuthRedirectComponent {...props} match={match} />;
}

export const ProfileContainer = connect(mapStateToProps, { getUserProfile, getStatus, updateStatus })(ProfileURLMatch)

