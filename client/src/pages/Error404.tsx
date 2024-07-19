// src/pages/Error404.tsx

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Error404: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h1" component="h1" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Oops! The page you are looking for does not exist.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    It looks like you took a wrong turn. Don't worry, it happens to the best of us.
                </Typography>
            </Box>
            <Button
                variant="contained"
                color="primary"
                startIcon={<HomeIcon />}
                onClick={handleGoHome}
            >
                Go to Home
            </Button>
        </Container>
    );
};

export default Error404;