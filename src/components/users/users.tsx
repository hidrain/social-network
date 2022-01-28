import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { FilterType, requestUsers } from '../../redux/users-reducer'
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors'
import { Paginator } from '../common/paginator/paginator'
import { User } from './user'
import { UsersSearchForm } from './users-search-form'
import { useSearchParams } from 'react-router-dom'


type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalItemsCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const term = searchParams.get('term')
        const friend = searchParams.get('friend')
        const page = searchParams.get('page')

        let actualPage = currentPage
        let actualFilter = filter
        if (page) actualPage = Number(page)
        if (friend) actualFilter = {
            ...actualFilter,
            friend: friend === 'null' ? null : friend === 'true' ? true : false
        }
        if (term) actualFilter = {
            ...actualFilter,
            term: term,
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        navigate(`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`)
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const unfollow = (id: number) => {
        dispatch(follow(id))
    }
    const follow = (id: number) => {
        dispatch(unfollow(id))
    }


    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />

            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                totalItemsCount={totalItemsCount} pageSize={pageSize} />

            <div>
                {
                    users.map(u =>
                        <User user={u}
                            key={u.id}
                            followingInProgress={followingInProgress}
                            unfollow={unfollow}
                            follow={follow}
                        />)
                }
            </div>
        </div >
    )
}

