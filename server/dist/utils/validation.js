"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNote = exports.validateSignup = exports.validateLogin = exports.validateEmail = void 0;
const validationMessages = {
    EMAIL_REQUIRED: 'Email is required',
    PASSWORD_REQUIRED: 'Password is required',
    NAME_REQUIRED: 'Name is required',
    INVALID_EMAIL: 'Invalid email',
    PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
    ALL_FIELDS_REQUIRED: 'All fields are required',
};
const notesMessages = {
    TITLE_REQUIRED: 'Title is required',
    CONTENT_REQUIRED: 'Content is required',
    CONTENT_OR_LIST_REQUIRED: 'Note must have list or content',
};
const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};
exports.validateEmail = validateEmail;
const validateLogin = (data) => {
    const { email, password } = data;
    if (!email || !password) {
        return validationMessages.ALL_FIELDS_REQUIRED;
    }
    if (!(0, exports.validateEmail)(email)) {
        return validationMessages.INVALID_EMAIL;
    }
    if (password.length < 6) {
        return validationMessages.PASSWORD_MIN_LENGTH;
    }
    return null;
};
exports.validateLogin = validateLogin;
const validateSignup = (data) => {
    const { name, email, password } = data;
    if (!email || !password || !name) {
        return validationMessages.ALL_FIELDS_REQUIRED;
    }
    if (!(0, exports.validateEmail)(email)) {
        return validationMessages.INVALID_EMAIL;
    }
    if (password.length < 6) {
        return validationMessages.PASSWORD_MIN_LENGTH;
    }
    return null;
};
exports.validateSignup = validateSignup;
const validateNote = (data) => {
    const { content, checklist } = data;
    if (!content && (!checklist || checklist.length === 0)) {
        return notesMessages.CONTENT_OR_LIST_REQUIRED;
    }
    return null;
};
exports.validateNote = validateNote;
