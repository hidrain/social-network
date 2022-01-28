import { NavLink } from 'react-router-dom';
import classes from './../dialogs.module.css'

type PropsType = {
    id: number
    name: string
}

export const DialogItem: React.FC<PropsType> = ({ id, name }) => {

    let path = '/dialogs/' + id;

    return (

        <div className={classes.dialog + ' ' + classes.active}>
            <img className={classes.avatar} alt='' src='https://cdn2.iconfinder.com/data/icons/scenarium-vol-4/128/011_avatar_anonymous_profile_privacy_hacker_mask_hoodie-512.png' />
            <NavLink to={path}>{name}</NavLink>
        </div >
    );
}

export default DialogItem