import './App.css'
import 'antd/dist/antd.css'
import { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/navbar/navbar'
import { News } from './components/news/news'
import { Music } from './components/music/music'
import { Settings } from './components/settings/settings'
import { DialogsContainer } from './components/dialogs/dialogs-container'
import { UsersPage } from './components/users/users-container'
import { ProfileContainer } from './components/profile/profile-container'
import { HeaderContainer } from './components/header/header-container'
import { LoginPage } from './components/login/login'
import { initializeApp } from './redux/app-reducer'
import { Preloader } from './components/common/preloader/preloader'
import { AppStateType } from './redux/redux-store'
// import { Button } from 'antd'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}


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
        <div className='app-wrapper'>

          <HeaderContainer />
          <Navbar />

          <div className='app-wrapper-content'>
            <Routes>
              <Route path='/' element={<ProfileContainer />} />
              <Route path='/profile/*' element={<ProfileContainer />} />
              <Route path='/dialogs/*' element={<DialogsContainer />} />
              <Route path='/news' element={<News />} />
              <Route path='/music' element={<Music />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/users/*' element={<UsersPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='*' element={<div>404 NOT FOUND</div>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializeApp })(App);
