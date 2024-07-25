import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useTheme from './theme/useTheme';
import Notification from './components/Notification/Notification';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Error404 = lazy(() => import('./pages/Error404'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

function App() {
    const { loading } = useLoadingWithRefresh();
    const { mode, toggleMode, theme } = useTheme();

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar toggleDarkTheme={toggleMode} mode={mode} />
                {loading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <Suspense fallback={
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            minHeight="100vh"
                        >
                            <CircularProgress />
                        </Box>
                    }>
                        <Routes>
                            <Route element={<PrivateRoute />}>
                                <Route path="/" element={<Home />}></Route>
                            </Route>
                            <Route element={<PublicRoute />}>
                                <Route path="/signup" element={<Signup />}></Route>
                                <Route path="/login" element={<Login />}></Route>
                            </Route>
                            <Route path="*" element={<Error404 />}></Route>
                        </Routes>
                    </Suspense>
                )}
                <Notification />
            </ThemeProvider>
        </>
    );
}

export default App;
