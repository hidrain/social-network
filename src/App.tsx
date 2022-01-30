import 'antd/dist/antd.css'
import './App.css'
import { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, HashRouter, Link, Route, Routes } from 'react-router-dom'
import { News } from './components/news/news'
import { Music } from './components/music/music'
import { Settings } from './components/settings/settings'
import { DialogsContainer } from './components/dialogs/dialogs-container'
import { UsersPage } from './components/users/users-container'
import { ProfileContainer } from './components/profile/profile-container'
import { LoginPage } from './components/login/login'
import { initializeApp } from './redux/app-reducer'
import { Preloader } from './components/common/preloader/preloader'
import { AppStateType } from './redux/redux-store'
import { Layout, Menu } from 'antd'
import { SoundOutlined, UserOutlined, MessageOutlined, TeamOutlined, SettingOutlined, GlobalOutlined, CommentOutlined } from '@ant-design/icons'
import { Header } from './components/header/header'
import { ChatPage } from './pages/chat/chat-page'



type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const { Content, Footer, Sider } = Layout


class App extends Component<MapPropsType & DispatchPropsType> {

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert('some error occured!')
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    this.props.initializeApp()
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  render() {

    if (!this.props.initialized) { return <Preloader /> }

    return (
      <BrowserRouter>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
            style={{ background: '#33937d' }}
          >
            <div className="logo" >
              <img src='https://cdn4.iconfinder.com/data/icons/origamicon-light/512/facebook-512.png'
                alt='' style={{ width: '35px', height: '35px' }} />
            </div>


            <Menu theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ margin: '10px 0', background: '#33937d', height: '100vh' }}
            >
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to='/profile'>Profile</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<MessageOutlined />}>
                <Link to='/dialogs'>Messages</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<CommentOutlined />}>
                <Link to='/chat'>Chat</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<TeamOutlined />}>
                <Link to='/users'>Users</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<GlobalOutlined />}>
                <Link to='/news'>News</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<SoundOutlined />}>
                <Link to='/music'>Music</Link>
              </Menu.Item>
              <Menu.Item key="7" icon={<SettingOutlined />}>
                <Link to='/settings'>Settings</Link>
              </Menu.Item>
            </Menu>

          </Sider>

          <Layout>
            <Header />

            <Content style={{ margin: '24px 16px 0' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Routes>
                  <Route path='/' element={<ProfileContainer />} />
                  <Route path='/profile/*' element={<ProfileContainer />} />
                  <Route path='/dialogs/*' element={<DialogsContainer />} />
                  <Route path='/news' element={<News />} />
                  <Route path='/music' element={<Music />} />
                  <Route path='/settings' element={<Settings />} />
                  <Route path='/users/*' element={<UsersPage />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/chat' element={<ChatPage />} />
                  <Route path='*' element={<div>404 NOT FOUND</div>} />
                </Routes>
              </div>
            </Content>

            {/* <Footer style={{ textAlign: 'center' }}></Footer> */}

          </Layout>
        </Layout>
      </BrowserRouter >


      // <BrowserRouter>
      //   <div className='app-wrapper'>

      //     <HeaderContainer />
      //     <Navbar />

      //     <div className='app-wrapper-content'>
      //       <Routes>
      //         <Route path='/' element={<ProfileContainer />} />
      //         <Route path='/profile/*' element={<ProfileContainer />} />
      //         <Route path='/dialogs/*' element={<DialogsContainer />} />
      //         <Route path='/news' element={<News />} />
      //         <Route path='/music' element={<Music />} />
      //         <Route path='/settings' element={<Settings />} />
      //         <Route path='/users/*' element={<UsersPage />} />
      //         <Route path='/login' element={<LoginPage />} />
      //         <Route path='*' element={<div>404 NOT FOUND</div>} />
      //       </Routes>
      //     </div>
      //   </div>
      // </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializeApp })(App);