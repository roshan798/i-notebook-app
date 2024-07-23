import React, { useState } from 'react'
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    IconButton,
    InputAdornment,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { AxiosResponse } from 'axios'
import { signup } from '../http/auth'
import { Link, useNavigate } from 'react-router-dom'
import CustomLink from '../components/shared/CustomLink'
import SignInWithGoogle from '../components/SignInWithGoogle'
import { useNotification } from '../contexts/NotificationContext'
import { notifications } from '../utils/notificationMessages'


interface FormState {
    name: string
    email: string
    password: string
}

const Signup: React.FC = () => {
    const { addNotification: notify } = useNotification()
    const navigate = useNavigate()
    const [formData, setFormData] = useState<FormState>({
        name: '',
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
            const response: AxiosResponse = await signup({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            })
            console.log(response);
            notify(notifications.signup.success, 'success')
            navigate('/login')
        } catch (error) {
            console.error(error)
            notify(notifications.signup.error, 'error')
            setError('Signup failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 1, marginTop: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Sign Up
                </Typography>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        marginBottom: '1rem',
                    }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                        sx={{ borderRadius: 1 }}
                    />
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
                        {loading ? 'Signing Up...' : 'Sign Up'}
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
                    Already signed up?
                    <CustomLink
                        variant="body2"
                        color="primary"
                        component={Link}
                        to="/login"
                        underline="hover">
                        {' '}
                        Login to your account.
                    </CustomLink>
                </Typography>
            </Paper>
        </Box>
    )
}

export default Signup
