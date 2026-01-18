import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { type UserType } from 'entities/user';

const fetchUsers = async (): Promise<UserType[]> => {
    const response = await axios.get('https://696a5a943a2b2151f847de64.mockapi.io/users');
    return response.data;
}

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};