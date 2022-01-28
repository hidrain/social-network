import { NavLink } from 'react-router-dom';
import style from './header.module.css';

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchPropsType = {
    logout: () => void
}

export const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return (

        <header className={style.header}>
            <img src='https://cdn3.iconfinder.com/data/icons/essentials-volume-i/128/origami-bird-5-512.png' alt='' />

            <div className={style.loginBlock}>
                {props.isAuth
                    ? <div>{props.login}  <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to='/login'>Login</NavLink>}
            </div>
        </header>
    );
}



