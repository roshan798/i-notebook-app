import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AxiosResponse } from 'axios';
import { login } from '../http/index'; // Ensure you have a login function in your HTTP utility
import { Link } from 'react-router-dom';
import CustomLink from '../components/shared/CustomLink';

interface FormState {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<FormState>({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response: AxiosResponse = await login({
                email: formData.email,
                password: formData.password
            });
            console.log(response);
            // Handle successful login (e.g., redirect to home page or show a success message)
        } catch (error) {
            console.error(error);
            setError('Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 1, marginTop: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom align="center">Login</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        type="email"
                        variant="outlined"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete='email'
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
                        autoComplete='current-password'
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 1 }
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2, borderRadius: 1 }}
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </Button>
                    {error && <Typography color="error.main" align="center" sx={{ marginTop: 2 }}>{error}</Typography>}
                </form>
                <Typography variant="body2" color="textSecondary" align='center' sx={{ marginTop: "0.8rem" }}>
                    Don't have an account?
                    <CustomLink variant="body2" color="primary" component={Link} to="/signup" underline='hover'> Sign up now.</CustomLink>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;