import { ObjectId } from 'mongoose';
import { Request, Response } from 'express';
import UserService from '../services/user.service';
import TokenService from '../services/token.service';
import { LoginRequestBody, SignupRequestBody } from 'userRequest';
import { validateLogin, validateSignup } from '../utils/validation';
import HashService from '../services/hash.service';
import { User } from 'user';
import UserDTO from '../DTO/user.dto';
interface TokenPayload {
    _id: string;
    [key: string]: any;
}
const setCookie = (res: Response, accessToken: String, refreshToken: String) => {
    res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24, // for 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.cookie('accessToken', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // for 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict",
    });
}

class UserController {
    async signup(req: Request<{}, {}, SignupRequestBody>, res: Response) {
        const { name, email, password } = req.body;

        const signupValidationError = validateSignup(req.body);
        if (signupValidationError !== null) {
            return res.status(400).json({
                success: false,
                message: signupValidationError,
            });
        }

        try {
            //check if the user already exist
            const userExist = await UserService.getUserByEmail(email);
            if (userExist) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exist, please login',
                });
            }
            const hashedPassword = await HashService.hash(password);
            const user: User = {
                name: name,
                email: email,
                password: hashedPassword,
            };

            await UserService.createUser(user);
            res.status(201).json({
                success: true,
                message: "User created successfully",
            });
        } catch (error) {
            console.error('Error signing up:', error);
            res.status(500).json({
                success: false,
                msg: 'Internal server error',
            });
        }
    }

    async login(req: Request<{}, {}, LoginRequestBody>, res: Response) {
        const loginValidationError = validateLogin(req.body);
        if (loginValidationError !== null) {
            return res.status(400).json({
                success: false,
                message: loginValidationError,
            });
        }

        const { email, password } = req.body;

        try {
            const user = await UserService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: 'User not found',
                });
            }

            if (!user.password) {
                return res.status(500).json({
                    success: false,
                    msg: 'All Fields are required',
                });
            }

            const isMatch = await HashService.compare(password, user.password);
            if (isMatch === false) {
                return res.status(401).json({
                    success: false,
                    msg: 'Invalid credentials',
                });
            }

            const userId = user.id!
            const { accessToken, refreshToken } = TokenService.generateTokens({
                _id: userId,
                email: user.email,
            });
            try {
                await TokenService.storeRefreshToken(refreshToken, userId);
            } catch (error) {
                console.error('Error storing refresh token:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });

            }
            setCookie(res, accessToken, refreshToken);
            // res.cookie('refreshToken', refreshToken, {
            //     maxAge: 1000 * 60 * 60 * 24, // for 1 day
            //     httpOnly: true,
            // });

            // res.cookie('accessToken', accessToken, {
            //     maxAge: 1000 * 60 * 60 * 24 * 30, // for 30 days
            //     httpOnly: true,
            // });

            res.status(200).json({
                success: true,
                user: new UserDTO(user),
            });

        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    async logout(req: Request, res: Response) {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'User not logged in',
            });
        }
        try {
            const { _id } = await TokenService.verifyRefreshToken(refreshToken) as TokenPayload;
            await TokenService.removeToken(refreshToken);
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            res.status(200).json({
                success: true,
                message: 'User logged out',
            });
        } catch (error) {
            console.error('Error logging out:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }


    async refreshAccessToken(req: Request, res: Response): Promise<Response> {
        const { refreshToken: refreshTokenFromCookie } = req.cookies;

        if (!refreshTokenFromCookie) {
            return res.status(401).json({ message: "Access denied, token missing!" });
        }

        let userData: TokenPayload;
        try {
            userData = await TokenService.verifyRefreshToken(refreshTokenFromCookie) as TokenPayload;
        } catch (error) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        try {
            const token = await TokenService.findRefreshToken(userData._id, refreshTokenFromCookie);
            if (!token) {
                return res.status(401).json({ message: "Invalid Token" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Internal error" });
        }

        const user = await UserService.getUser({ _id: userData._id });
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        // Delete previously stored token before creating new ones
        await TokenService.removeToken(refreshTokenFromCookie);

        // Generate new tokens (both access and refresh tokens)
        const { refreshToken, accessToken } = TokenService.generateTokens({
            _id: user._id as string,
            email: user.email,
        });

        // Store new refresh token in the database
        await TokenService.storeRefreshToken(refreshToken, user._id as ObjectId);
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
            user: new UserDTO(user),
            success: true,
        });
    }
}


export default new UserController();
