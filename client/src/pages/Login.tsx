import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    IconButton,
    InputAdornment,
    Divider,
} from '@mui/material'
import React, { useState } from 'react'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import CustomLink from '../components/shared/CustomLink'
import { login } from '../http/auth'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { setUser } from '../store/userSlice'
import { useDispatch } from 'react-redux'
import SignInWithGoogle from '../components/SignInWithGoogle'
import { useNotification } from '../contexts/NotificationContext'
import { notifications } from '../utils/notificationMessages'
import { APIError } from '../types/api'

interface FormState {
    email: string
    password: string
}

const Login: React.FC = () => {
    const { addNotification: notify } = useNotification()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const initialFormData = {
        email: '',
        password: ""
    }
    const [formData, setFormData] = useState<FormState>(initialFormData)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        await performLogin(formData.email, formData.password)
    }

    const performLogin = async (email: string, password: string) => {
        setLoading(true)
        setError(null)

        try {
            const response: AxiosResponse = await login({ email, password })
            const { user } = response.data
            dispatch(setUser(user))
            notify(notifications.login.success, 'success')
            navigate('/')
        } catch (error) {
            const err = error as APIError
            console.log(error)
            setError(err.response?.data.message || 'Login failed. Please check your credentials and try again.')
            notify(err.response?.data.message || notifications.login.error, 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleGuestLogin = async () => {
        await performLogin('guest@gmail.com', 'Guest@123')
    }

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 1, marginTop: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Login
                </Typography>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        marginBottom: '1rem',
                    }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        type="email"
                        variant="outlined"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        sx={{ borderRadius: 1 }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        edge="end">
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 1 },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2, borderRadius: 1 }}
                        disabled={loading}>
                        {loading ? 'Logging In...' : 'Login'}
                    </Button>
                    {error && (
                        <Typography
                            color="error.main"
                            align="center"
                            sx={{ marginTop: 2 }}>
                            {error}
                        </Typography>
                    )}
                </form>
                <Divider
                    sx={{
                        fontSize: '0.8rem',
                        color: 'GrayText',
                        userSelect: 'none',
                    }}>
                    OR
                </Divider>
                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ marginTop: 2, borderRadius: 1 }}
                    onClick={handleGuestLogin}
                    disabled={loading}>
                    {loading ? 'Logging In...' : 'Login as Guest'}
                </Button>
                <SignInWithGoogle />
                <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    sx={{ marginTop: '0.8rem' }}>
                    Don't have an account?
                    <CustomLink
                        variant="body2"
                        color="primary"
                        to="/signup"
                        underline="hover">
                        {' '}
                        Sign up now.
                    </CustomLink>
                </Typography>
            </Paper>
        </Box>
    )
}

export default Login
