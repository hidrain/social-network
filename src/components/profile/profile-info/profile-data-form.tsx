
// import { Preloader } from '../../common/preloader/preloader';
// import userPhoto from '../../../assets/images/user_avatar.png'
// import { ProfileStatusWithHooks } from './profile-status-with-hooks';
// import { useState } from 'react';
import style from './profile-info.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, GetStringKeys, Input, Textarea } from '../../common/forms-controls/forms-controls';
import { ProfileType } from '../../../types/types';

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>


const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (
    { handleSubmit, profile, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button>Save</button></div>

            {error && <div className={style.form_summary_error}>
                {error}
            </div>}

            <div><b>Full name: </b>
                {/* todo: create some solution for embedded objects */}
                {createField<ProfileTypeKeys>('Full name', 'fullName', [], Input)}
            </div>

            <div><b>Looking for a job: </b>
                {createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
            </div>

            <div><b>My professonal skills: </b>
                {createField<ProfileTypeKeys>('My professonal skills', 'lookingForAJobDescription', [], Textarea)}
            </div>

            <div><b>About me: </b>
                {createField<ProfileTypeKeys>('About me', 'aboutMe', [], Textarea)}
            </div>

            <div><b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
                return <div className={style.contact} key={key}>
                    <b>{key}:</b> {createField(key, 'contacts.' + key, [], Input)}
                </div>
            })}</div>
        </form>
    )
}

export const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile' })(ProfileDataForm)
