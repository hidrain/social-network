import classes from './myposts.module.css';
import Post from './post/post'
import AddPostForm, { AddPostFormValuesType } from './add-post-form/add-post-form';
import { PostType } from '../../../types/types';

export type MapPropsType = {
    posts: Array<PostType>
}
export type MapDispatchType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & MapDispatchType> = (props) => {
    console.log('RENDER')
    console.log(props)

    let postsElements = props.posts.map(({ message, likeCount, id }) => <Post message={message} likeCount={likeCount} key={id} />)

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost} />

            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts
