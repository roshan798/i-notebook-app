import { ObjectId } from 'mongoose'
import { Request, Response } from 'express'
import UserService from '../services/user.service'
import TokenService from '../services/token.service'
import { LoginRequestBody, SignupRequestBody } from 'schema/types/userRequest'
import { validateLogin, validateSignup } from '../utils/validation'
import HashService from '../services/hash.service'
import { User } from 'schema/types/user'
import UserDTO from '../schema/DTO/user.dto'
interface TokenPayload {
    _id: string
    [key: string]: any
}
const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite:
        process.env.NODE_ENV === 'production'
            ? 'none'
            : ('strict' as 'none' | 'strict' | 'lax'),
}
const setCookie = (
    res: Response,
    accessToken: string,
    refreshToken: string
) => {
    res.cookie('refreshToken', refreshToken, { ...options, maxAge: 1000 * 60 * 60 * 24 * 7 }) // 7 days
    res.cookie('accessToken', accessToken, { ...options, maxAge: 1000 * 60 * 60 }) // 1hr
}

class UserController {
    async signup(req: Request<{}, {}, SignupRequestBody>, res: Response) {
        const { name, email, password } = req.body

        const signupValidationError = validateSignup(req.body)
        if (signupValidationError !== null) {
            return res.status(400).json({
                success: false,
                message: signupValidationError,
            })
        }

        try {
            //check if the user already exist
            const userExist = await UserService.getUserByEmail(email)
            if (userExist) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exist, please login',
                })
            }
            const hashedPassword = await HashService.hash(password)
            const user: User = {
                name: name,
                email: email,
                password: hashedPassword,
            }

            await UserService.createUser(user)
            res.status(201).json({
                success: true,
                message: 'User created successfully',
            })
        } catch (error) {
            console.error('Error signing up:', error)
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }

    async login(req: Request<{}, {}, LoginRequestBody>, res: Response) {
        const loginValidationError = validateLogin(req.body)
        if (loginValidationError !== null) {
            return res.status(400).json({
                success: false,
                message: loginValidationError,
            })
        }

        const { email, password } = req.body

        try {
            const user = await UserService.getUserByEmail(email)
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: `User with email ${email} not found! Please signup`,
                })
            }

            if (!user.password) {
                return res.status(500).json({
                    success: false,
                    message: 'All Fields are required',
                })
            }

            const isMatch = await HashService.compare(password, user.password)
            if (isMatch === false) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials, please try with correct credentials',
                })
            }

            const userId = user.id!
            const { accessToken, refreshToken } = TokenService.generateTokens({
                _id: userId,
                email: user.email,
            })
            try {
                await TokenService.storeRefreshToken(refreshToken, userId)
            } catch (error) {
                console.error('Error storing refresh token:', error)
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                })
            }
            setCookie(res, accessToken, refreshToken)
            res.status(200).json({
                success: true,
                user: new UserDTO(user)
            })
        } catch (error) {
            console.error('Error logging in:', error)
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }

    async logout(req: Request, res: Response) {
        const { refreshToken } = req.cookies
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'User not logged in',
            })
        }
        try {
            const { _id } = (await TokenService.verifyRefreshToken(
                refreshToken
            )) as TokenPayload
            const response = await TokenService.removeToken(refreshToken)
            res.clearCookie('refreshToken')
            res.clearCookie('accessToken')
            res.status(200).json({
                success: true,
                message: 'User logged out',
            })
        } catch (error) {
            console.error('Error logging out:', error)
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }

    async refreshAccessToken(req: Request, res: Response): Promise<Response> {
        const { refreshToken: refreshTokenFromCookie } = req.cookies

        if (!refreshTokenFromCookie) {
            return res
                .status(401)
                .json({ message: 'Access denied, token missing!' })
        }

        let userData: TokenPayload
        try {
            userData = (await TokenService.verifyRefreshToken(
                refreshTokenFromCookie
            )) as TokenPayload
        } catch (error) {
            return res.status(401).json({ message: 'Invalid Token' })
        }

        try {
            const token = await TokenService.findRefreshToken(
                userData._id,
                refreshTokenFromCookie
            )
            if (!token) {
                return res.status(401).json({ message: 'Invalid Token' })
            }
        } catch (error) {
            return res.status(500).json({ message: 'Internal error' })
        }

        const user = await UserService.getUser({ _id: userData._id })
        if (!user) {
            return res.status(404).json({ message: 'No user found' })
        }

        await TokenService.removeToken(refreshTokenFromCookie)
        const { refreshToken, accessToken } = TokenService.generateTokens({
            _id: user._id as string,
            email: user.email,
        })

        await TokenService.storeRefreshToken(refreshToken, user._id as ObjectId)
        setCookie(res, accessToken, refreshToken)
        return res.json({
            user: new UserDTO(user),
            success: true,
        })
    }
}

export default new UserController()
