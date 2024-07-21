import type { NotesRequestBody } from "notes";
import type { LoginRequestBody, SignupRequestBody } from "userRequest";
const validationMessages = {
    EMAIL_REQUIRED: 'Email is required',
    PASSWORD_REQUIRED: 'Password is required',
    NAME_REQUIRED: 'Name is required',
    INVALID_EMAIL: 'Invalid email',
    PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
    ALL_FIELDS_REQUIRED: 'All fields are required'
};

export const validateEmail = (email: string): Boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const validateLogin = (data: LoginRequestBody): string | null => {
    const { email, password } = data;

    if (!email || !password) {
        return 'Email and password are required';
    }

    if (!validateEmail(email)) {
        return 'Invalid email';
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }

    return null;
}
export const validateSignup = (data: SignupRequestBody): string | null => {
    const { name, email, password } = data;

    if (!email || !password || !name) {
        return 'All fields are required';
    }

    if (!validateEmail(email)) {
        return 'Invalid email';
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }

    return null;
}

export const validateNote = (data: NotesRequestBody): string | null => {
    const { title, content } = data;

    if (!title || !content) {
        return 'Title and content are required';
    }

    return null;
}
