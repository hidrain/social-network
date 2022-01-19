import React from 'react'
import { connect } from 'react-redux'
import { Users } from './users';
import { follow, unfollow, setCurrentPage, toggleFollowingProgress, requestUsers } from '../../redux/users-reducer'
import { Preloader } from '../common/preloader/preloader';
import { compose } from 'redux'
import {
    getUsers, getPageSize, getTotalUsersCount, getCurrentPage,
    getIsFetching, getFollowingInProgress
} from '../../redux/users-selectors';



class UsersAPIComponent extends React.Component {

    componentDidMount() {
        const { currentPage, pageSize } = this.props
        this.props.requestUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber) => {
        const { pageSize } = this.props
        this.props.requestUsers(pageNumber, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users, //приходит из файла redux-store из редьюсеров
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export const UsersContainer = compose(
    connect(mapStateToProps, { follow, unfollow, setCurrentPage, toggleFollowingProgress, requestUsers }))(UsersAPIComponent)
