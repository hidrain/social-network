import React from 'react'
import { useSelector } from 'react-redux'
import { Users } from './users';
import { Preloader } from '../common/preloader/preloader';
import { getIsFetching } from '../../redux/users-selectors';

export const UsersPage: React.FC = () => {

    const isFetching = useSelector(getIsFetching)

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>
    )
}

