import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { addNewPost, updateNewPostText } from './redux/state';

export let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <App state={state} addNewPost={addNewPost} updateNewPostText={updateNewPostText} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}


