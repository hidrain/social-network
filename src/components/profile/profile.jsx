import { MyPostsContainer } from './myposts/myposts-container';
import { ProfileInfo } from './profile-info/profile-info';


export const Profile = (props) => {
    return (

        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
            <MyPostsContainer />
        </div>
    );
}