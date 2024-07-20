import axios from "axios";
import config from "../configs/config";
const api = axios.create({
    baseURL: config.getAPIURL(),
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json',
    }
});

interface SignupUserData {
    name: string;
    email: string;
    password: string;
}

interface LoginUserData {
    email: string;
    password: string;
}

export const login = async (data: LoginUserData) => {
    return api.post('/auth/login', data);
};

export const signup = async (data: SignupUserData) => {
    return api.post('/auth/signup', data);
};
export const logout = async () => {
    return api.post('/auth/logout');
}
