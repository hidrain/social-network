
import { Preloader } from '../../common/preloader/preloader';
import style from './profile-info.module.css';
import userPhoto from '../../../assets/images/user_avatar.png'
import { ProfileStatusWithHooks } from './profile-status-with-hooks';


export const ProfileInfo = ({ profile, status, updateStatus }) => {

    if (!profile) {
        return <Preloader />
    }

    return (
        <div>
            <div className={style.descriptionBlock}>
                <img className={style.avaImg} alt='' src={profile.photos.large || userPhoto} />
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>

            <div className={style.fullName}>{profile.fullName}</div>
            <div>{profile.aboutMe}</div>
            <div>{profile.lookingForAJobDescription}</div>
        </div>
    );
}