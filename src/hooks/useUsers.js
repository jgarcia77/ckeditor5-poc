import { useEffect, useState } from 'react';
import { getUsers } from "../apis/usersAPI";

const useUsers = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            setUsers(users);
        };

        fetchUsers();
    }, []);

    return users;
};

export default useUsers;