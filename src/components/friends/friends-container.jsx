import classes from './friends.module.css'
import { FriendsItem } from './friends-item/friend-item';
import { StoreContext } from '../../store-context';
import { Friends } from './friends';


export const FriendsContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState()
                return (
                    <Friends dialogsPage={state} />
                )
            }
            }
        </StoreContext.Consumer>

    );
}
