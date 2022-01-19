import { Paginator } from '../common/paginator/paginator'
import { User } from './user'

export const Users = ({ currentPage, onPageChanged, totalItemsCount, pageSize, users, ...props }) => {
    return (
        <div>

            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalItemsCount} pageSize={pageSize} />

            <div>
                {
                    users.map(u =>
                        <User user={u}
                            key={u.id}
                            followingInProgress={props.followingInProgress}
                            unfollow={props.unfollow}
                            follow={props.follow}
                        />)
                }
            </div>
        </div >
    )
}