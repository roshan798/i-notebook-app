import { Request, Response } from 'express';
import UserService from '@services/user.service';
import TokenService from '@services/token.service';
import { LoginRequestBody, SignupRequestBody } from 'userRequest';
import { validateLogin, validateSignup } from '@utils/validation';
import HashService from '@services/hash.service';
import { User } from 'user';
import UserDTO from 'DTO/user.dto';

class UserController {
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

            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24, // for 1 day
                httpOnly: true,
            });

            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30, // for 30 days
                httpOnly: true,
            });

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

            const savedUser = await UserService.createUser(user);
            res.status(201).json({
                success: true,
                user: new UserDTO(savedUser),
            });
        } catch (error) {
            console.error('Error signing up:', error);
            res.status(500).json({
                success: false,
                msg: 'Internal server error',
            });
        }
    }
}

export default new UserController();
