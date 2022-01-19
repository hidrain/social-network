import classes from './friends.module.css'
import { FriendsItem } from './friends-item/friend-item';

export const Friends = ({ dialogs }) => {
    return (
        <div className={classes.friends}>
            <div>Friends</div>
            <div className={classes.friendsItems}>
                {dialogs.map(({ name, id }) => <FriendsItem name={name} id={id} key={id} />)}
            </div>
        </div>
    );
}
