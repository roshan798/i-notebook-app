import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Tooltip,
    Button,
} from '@mui/material';
import {
    AccountCircle,
    LightMode,
    DarkMode,
    Menu as MoreVertIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useThemeContext } from '../../theme/ThemeContextProvider';
import CustomLink from '../shared/CustomLink';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

export default function Navbar() {
    const { mode, toggleMode } = useThemeContext();
    const user = useSelector((state: RootState) => state.user);
    const location = useLocation()
    const { pathname } = location;
    const isLoggedIn = user ? true : false;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <CustomLink to='/' sx={{
                        color: "white",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        textDecoration: 'none'
                    }}>
                        <Typography
                            variant="h4"
                            noWrap
                            component="div"
                        >
                            I-Notebook
                        </Typography>
                    </CustomLink>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        <Tooltip title={mode === "light" ? "Dark" : "Light"}>
                            <IconButton
                                edge="start"
                                size="large"
                                aria-label="theme"
                                onClick={() => {
                                    console.log("theme");
                                    toggleMode();
                                }}
                                sx={{ mr: 1 }}
                            >
                                {mode === "light" ? <DarkMode /> : <LightMode />}
                            </IconButton>
                        </Tooltip>
                        {isLoggedIn ? (
                            <>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls="primary-search-account-menu"
                                    aria-haspopup="true"
                                    onClick={() => { console.log("clicked"); }}
                                    color="inherit"
                                    sx={{ mr: 1 }}
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Button onClick={() => {/* handleLogout */ }} color="inherit">
                                    Logout
                                </Button>

                            </>
                        ) : (
                            pathname === '/login' ? (
                                <Button component={Link} to="/signup" color="inherit">
                                    Sign Up
                                </Button>
                            ) : (
                                <Button component={Link} to="/login" color="inherit">
                                    Login
                                </Button>
                            )
                        )}


                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls="primary-search-account-menu-mobile"
                            aria-haspopup="true"
                            onClick={() => { /* handle mobile menu open */ }}
                            color="inherit"
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
