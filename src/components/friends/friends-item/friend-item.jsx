import classes from './../friends.module.css'

export const FriendsItem = ({ name }) => {

    return (
        <div className={classes.friendsItem} >
            <img className={classes.avatar} alt='' src='https://cdn2.iconfinder.com/data/icons/scenarium-vol-4/128/011_avatar_anonymous_profile_privacy_hacker_mask_hoodie-512.png' />
            <div>{name}</div>
        </div>
    );
}