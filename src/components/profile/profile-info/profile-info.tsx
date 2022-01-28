
import { Preloader } from '../../common/preloader/preloader';
import style from './profile-info.module.css';
import userPhoto from '../../../assets/images/user_avatar.png'
import { ProfileStatusWithHooks } from './profile-status-with-hooks';
import { ChangeEvent, useState } from 'react';
import { ProfileDataReduxForm } from './profile-data-form';
import { ContactsType, ProfileType } from '../../../types/types';

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

export const ProfileInfo: React.FC<PropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

    let [editMode, setEditMode] = useState(false)


    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {     //'?' если файл есть - берем его длину
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        //todo: remove then
        saveProfile(formData).then(
            () => { setEditMode(false) }
        )
    }


    return (
        <div>
            <div className={style.descriptionBlock}>
                <img className={style.avaImg} alt='' src={profile.photos.large || userPhoto} />
                {isOwner && <input type='file' onChange={onMainPhotoSelected} />}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>

            {editMode
                ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />}
        </div>
    );
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}

            <div><b>Full name: </b>{profile.fullName}</div>
            <div><b>Looking for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}</div>

            {profile.lookingForAJob &&
                <div><b>My professonal skills: </b>{profile.lookingForAJobDescription}</div>
            }

            <div><b>About me: </b>{profile.aboutMe}</div>
            <div><b>Contacts: </b>{
                Object
                    .keys(profile.contacts)
                    .map(key => {
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
                    })}</div>
        </div>
    )
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

export const Contact: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
    return (
        <div className={style.contact}>
            <b>{contactTitle}: </b>{contactValue}
        </div>
    )
}