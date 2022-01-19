import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { News } from './components/news/news';
import { Music } from './components/music/music';
import { Settings } from './components/settings/settings';
import { DialogsContainer } from './components/dialogs/dialogs-container';
import { UsersContainer } from './components/users/users-container';
import { ProfileContainer } from './components/profile/profile-container';
import { HeaderContainer } from './components/header/header-container';
import { LoginContainer } from './components/login/login';
import { initializeApp } from './redux/app-reducer'
import { Preloader } from './components/common/preloader/preloader';

class App extends Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {

    if (!this.props.initialized) { return <Preloader /> }

    return (
      <HashRouter>
        <div className='app-wrapper'>

          <HeaderContainer />
          <Navbar />

          <div className='app-wrapper-content'>

            <Routes>
              <Route path='/profile/*' element={<ProfileContainer />} />
              <Route path='/dialogs/*' element={<DialogsContainer />} />
              <Route path='/news' element={<News />} />
              <Route path='/music' element={<Music />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/login' element={<LoginContainer />} />
            </Routes>
          </div>
        </div>
      </HashRouter >
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializeApp })(App);
