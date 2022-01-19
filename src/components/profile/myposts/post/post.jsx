import classes from './post.module.css';

const Post = ({ message, likeCount }) => {
    return (

        <div className={classes.item}>
            <img src='https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-01-512.png' alt='' />

            {message}

            <div className={classes.friends}>
                like {likeCount}
            </div>
        </div>

    );
}
export default Post
