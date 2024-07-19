import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import config from '../configs/config';
import { User } from '../store/types';

export function useLoadingWithRefresh() {
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRefreshToken = async () => {
            try {
                const response = await axios.get<{ user: User }>(
                    `${config.getAPIURL()}/refresh`,
                    {
                        withCredentials: true,
                    }
                );
                const { user } = response.data;
                dispatch(setUser(user));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching refresh token:', error);
                setLoading(false);
            }
        };

        fetchRefreshToken();
    }, [dispatch]);

    return { loading };
}
