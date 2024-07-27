import type { NotesRequestBody } from 'schema/types/notes'
import type { LoginRequestBody, SignupRequestBody } from 'schema/types/userRequest'
const validationMessages = {
    EMAIL_REQUIRED: 'Email is required',
    PASSWORD_REQUIRED: 'Password is required',
    NAME_REQUIRED: 'Name is required',
    INVALID_EMAIL: 'Invalid email',
    PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
    ALL_FIELDS_REQUIRED: 'All fields are required',
}
const notesMessages = {
    TITLE_REQUIRED: 'Title is required',
    CONTENT_REQUIRED: 'Content is required',
    TITLE_CONTENT_REQUIRED: 'Title and content are required',
}

export const validateEmail = (email: string): Boolean => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
}

export const validateLogin = (data: LoginRequestBody): string | null => {
    const { email, password } = data

    if (!email || !password) {
        return validationMessages.ALL_FIELDS_REQUIRED
    }

    if (!validateEmail(email)) {
        return validationMessages.INVALID_EMAIL
    }

    if (password.length < 6) {
        return validationMessages.PASSWORD_MIN_LENGTH
    }

    return null
}
export const validateSignup = (data: SignupRequestBody): string | null => {
    const { name, email, password } = data

    if (!email || !password || !name) {
        return validationMessages.ALL_FIELDS_REQUIRED
    }

    if (!validateEmail(email)) {
        return validationMessages.INVALID_EMAIL
    }

    if (password.length < 6) {
        return validationMessages.PASSWORD_MIN_LENGTH
    }

    return null
}

export const validateNote = (data: NotesRequestBody): string | null => {
    const { title, content } = data

    if (!title || !content) {
        return notesMessages.TITLE_CONTENT_REQUIRED
    }

    return null
}
