import style from './users.module.css'
import userPhoto from '../../assets/images/user_avatar.png'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../types/types'

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (id: number) => void
    follow: (id: number) => void
}

export const User: React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {


    return (
        <div className={style.userWrapper}>
            <div className={style.userAvatar}>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto}
                            className={style.userPhoto} alt='' />
                    </NavLink>
                </div>
                <div className={style.userButton}>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => { follow(user.id) }}>Unfollow</button> //unfollow потому что в контейнерной компоненте мы создали follow

                        : <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => { unfollow(user.id) }}>Follow</button>}
                </div>
            </div>

            <div></div>

            <div className={style.userProfile}>

                <div className={style.userInfo}>
                    <div>{user.name}</div>
                    <div className={style.userStatus}>{user.status}</div>
                </div>
                <div className={style.userFrom}>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </div>
            </div>

        </div>)
}
