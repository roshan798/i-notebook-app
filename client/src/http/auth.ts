import { getApiInstance } from ".";
const api = getApiInstance('/auth');
export const login = async (data: LoginUserData) => {
    return api.post('/login', data);
};

export const signup = async (data: SignupUserData) => {
    return api.post('/signup', data);
};
export const logout = async () => {
    return api.post('/logout');
}



interface SignupUserData {
    name: string;
    email: string;
    password: string;
}

interface LoginUserData {
    email: string;
    password: string;
}
