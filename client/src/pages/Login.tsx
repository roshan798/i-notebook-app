import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    IconButton,
    InputAdornment,
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
interface FormState {
    email: string
    password: string
}

const Login: React.FC = () => {
    const { addNotification: notify } = useNotification()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState<FormState>({
        email: '',
        password: '',
    })
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

        setLoading(true)
        setError(null)

        try {
            const response: AxiosResponse = await login(formData)
            const { user } = response.data
            dispatch(setUser(user))
            notify('Login successfull...', 'success')
            navigate('/')
        } catch (error) {
            console.error(error)
            setError(
                'Login failed. Please check your credentials and try again.'
            )
            notify(
                'Login failed. Please check your credentials and try again.',
                'error'
            )
        } finally {
            setLoading(false)
        }
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
