"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const token_service_1 = __importDefault(require("../services/token.service"));
const validation_1 = require("../utils/validation");
const hash_service_1 = __importDefault(require("../services/hash.service"));
const user_dto_1 = __importDefault(require("../DTO/user.dto"));
const options = {
    maxAge: 1000 * 60 * 60 * 24, // for 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production'
        ? 'none'
        : 'strict',
};
const setCookie = (res, accessToken, refreshToken) => {
    res.cookie('refreshToken', refreshToken, options);
    res.cookie('accessToken', accessToken, options);
};
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const signupValidationError = (0, validation_1.validateSignup)(req.body);
            if (signupValidationError !== null) {
                return res.status(400).json({
                    success: false,
                    message: signupValidationError,
                });
            }
            try {
                //check if the user already exist
                const userExist = yield user_service_1.default.getUserByEmail(email);
                if (userExist) {
                    return res.status(400).json({
                        success: false,
                        message: 'User already exist, please login',
                    });
                }
                const hashedPassword = yield hash_service_1.default.hash(password);
                const user = {
                    name: name,
                    email: email,
                    password: hashedPassword,
                };
                yield user_service_1.default.createUser(user);
                res.status(201).json({
                    success: true,
                    message: 'User created successfully',
                });
            }
            catch (error) {
                console.error('Error signing up:', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginValidationError = (0, validation_1.validateLogin)(req.body);
            if (loginValidationError !== null) {
                return res.status(400).json({
                    success: false,
                    message: loginValidationError,
                });
            }
            const { email, password } = req.body;
            try {
                const user = yield user_service_1.default.getUserByEmail(email);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: `User with email ${email} not found! Please signup`,
                    });
                }
                if (!user.password) {
                    return res.status(500).json({
                        success: false,
                        message: 'All Fields are required',
                    });
                }
                const isMatch = yield hash_service_1.default.compare(password, user.password);
                if (isMatch === false) {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid credentials, please try with correct credentials',
                    });
                }
                const userId = user.id;
                const { accessToken, refreshToken } = token_service_1.default.generateTokens({
                    _id: userId,
                    email: user.email,
                });
                try {
                    yield token_service_1.default.storeRefreshToken(refreshToken, userId);
                }
                catch (error) {
                    console.error('Error storing refresh token:', error);
                    return res.status(500).json({
                        success: false,
                        message: 'Internal server error',
                    });
                }
                setCookie(res, accessToken, refreshToken);
                res.status(200).json({
                    success: true,
                    user: new user_dto_1.default(user),
                    options: options,
                });
            }
            catch (error) {
                console.error('Error logging in:', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'User not logged in',
                });
            }
            try {
                const { _id } = (yield token_service_1.default.verifyRefreshToken(refreshToken));
                yield token_service_1.default.removeToken(refreshToken);
                res.clearCookie('refreshToken');
                res.clearCookie('accessToken');
                res.status(200).json({
                    success: true,
                    message: 'User logged out',
                });
            }
            catch (error) {
                console.error('Error logging out:', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        });
    }
    refreshAccessToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken: refreshTokenFromCookie } = req.cookies;
            if (!refreshTokenFromCookie) {
                return res
                    .status(401)
                    .json({ message: 'Access denied, token missing!' });
            }
            let userData;
            try {
                userData = (yield token_service_1.default.verifyRefreshToken(refreshTokenFromCookie));
            }
            catch (error) {
                return res.status(401).json({ message: 'Invalid Token' });
            }
            try {
                const token = yield token_service_1.default.findRefreshToken(userData._id, refreshTokenFromCookie);
                if (!token) {
                    return res.status(401).json({ message: 'Invalid Token' });
                }
            }
            catch (error) {
                return res.status(500).json({ message: 'Internal error' });
            }
            const user = yield user_service_1.default.getUser({ _id: userData._id });
            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            // Delete previously stored token before creating new ones
            yield token_service_1.default.removeToken(refreshTokenFromCookie);
            // Generate new tokens (both access and refresh tokens)
            const { refreshToken, accessToken } = token_service_1.default.generateTokens({
                _id: user._id,
                email: user.email,
            });
            // Store new refresh token in the database
            yield token_service_1.default.storeRefreshToken(refreshToken, user._id);
            // TODO setting cookie will be a function in the future
            // Set cookies with new tokens
            setCookie(res, accessToken, refreshToken);
            // res.cookie('refreshToken', refreshToken, {
            //     maxAge: 1000 * 60 * 60 * 24, // for 1 day
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === "production",
            //     sameSite: "strict",
            // });
            // res.cookie('accessToken', accessToken, {
            //     maxAge: 1000 * 60 * 60 * 24 * 30, // for 30 days
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            //     sameSite: "strict",
            // });
            return res.json({
                user: new user_dto_1.default(user),
                success: true,
            });
        });
    }
}
exports.default = new UserController();
