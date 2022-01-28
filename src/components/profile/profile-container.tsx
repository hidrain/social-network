import React from 'react'
import { connect } from 'react-redux'
import { Profile } from './profile';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { useMatch, RouteComponentProps } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/with-auth-redirect';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}

//todo RouteComponentProps isn't exist anymore
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

export class ProfileAPIComponent extends React.Component<PropsType>{

    refreshProfile = () => {
        let userId: number | null = this.props.match ? this.props.match.params.userId : this.props.authorizedUserId

        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match && this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        } else if (!this.props.match && this.props.match !== prevProps.match) {
            this.refreshProfile();
        }
    }

    render() {

        return (
            <Profile {...this.props}
                isOwner={this.props.authorizedUserId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
                saveProfile={this.props.saveProfile} />
        );
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileAPIComponent)

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

//todo fix type
const ProfileURLMatch = (props: any) => {
    const match = useMatch('/profile/:userId');
    return <AuthRedirectComponent {...props} match={match} />;
}

export const ProfileContainer = connect(mapStateToProps, {
    getUserProfile, getStatus,
    updateStatus, savePhoto, saveProfile
})(ProfileURLMatch)

