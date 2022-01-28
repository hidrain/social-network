import { actions } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'
import MyPosts, { MapDispatchType, MapPropsType } from './myposts';
import { AppStateType } from '../../../redux/redux-store';

//данные state
let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}

export const MyPostsContainer = connect<MapPropsType, MapDispatchType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts)