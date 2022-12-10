import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readUsers, selectUsers } from '../redux/users';

const useUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);

    useEffect(() => {
        dispatch(readUsers());
    }, []);

    return users;
};

export default useUsers;