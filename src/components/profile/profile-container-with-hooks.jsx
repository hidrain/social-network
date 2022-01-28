import React from 'react'
import { connect } from 'react-redux'
import { Profile } from './profile';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { useMatch, RouteComponentProps, useParams } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/with-auth-redirect';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

export const ProfileAPIComponent = (props) => {

    let { userId } = useParams()
    if (!userId) {
        userId = '2';
    } else {
        props.authorizedUserId
    }

    refreshProfile = () => {
        let userId = this.props.match ? this.props.match.params.userId : this.props.authorizedUserId

        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    const [editMode, setEditMode] = useState(userId = 2)
    const [status, getStatus] = useState({ userId })
    useEffect(() => {
        getStatus({ userId })
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {






        componentDidMount() {
            this.refreshProfile()
        }

        componentDidUpdate(prevProps, prevState) {
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

    let mapStateToProps = (state) => ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    })

    //todo fix type
    const ProfileURLMatch = (props) => {
        const match = useMatch('/profile/:userId');
        return <AuthRedirectComponent {...props} match={match} />;
    }

    export const ProfileContainer = connect(mapStateToProps, {
        getUserProfile, getStatus,
        updateStatus, savePhoto, saveProfile
    })(ProfileURLMatch)

