import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import PrivateRoute from './routes/PrivateRoute'
import Error404 from './pages/Error404'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PublicRoute from './routes/PublicRoute'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import useTheme from './theme/useTheme'
function App() {
    const { loading } = useLoadingWithRefresh()
    const { mode, toggleMode, theme } = useTheme()

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
                        minHeight="100vh">
                        <CircularProgress />
                    </Box>
                ) : (
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
                )}
            </ThemeProvider>
        </>
    )
}

export default App
