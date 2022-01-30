import { Link, NavLink } from 'react-router-dom';
import style from './header.module.css';
import { Layout, Menu, Avatar, Row, Col, Button } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reducer';


export const Header: React.FC = (props) => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()
    const logoutCallback = () => {
        dispatch(logout())
    }

    const { Header } = Layout

    return (

        <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
            <Row>
                <Col span={18}></Col>

                {isAuth
                    ? <>
                        <Col span={1}>
                            <Avatar style={{ backgroundColor: '#31af92' }} icon={<UserOutlined />} />
                        </Col>
                        <Col span={2} className={style.name}>
                            {login}
                        </Col>
                        <Col span={1}>
                            <Button onClick={logoutCallback}>Log out</Button>
                        </Col>
                    </>
                    : <Col span={2}>
                        <Button>
                            <Link to='/login'>Login</Link>
                        </Button>
                    </Col>
                }
            </Row>

        </Header>

        // <header className={style.header}>
        //     <img src='https://cdn3.iconfinder.com/data/icons/essentials-volume-i/128/origami-bird-5-512.png' alt='' />

        //     <div className={style.loginBlock}>
        //         {props.isAuth
        //             ? <div>{props.login}  <button onClick={props.logout}>Log out</button></div>
        //             : <NavLink to='/login'>Login</NavLink>}
        //     </div>
        // </header>
    );
}


