import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Tooltip,
    Button,
    Menu,
    MenuItem,
    Avatar,
    ListItemIcon,
} from '@mui/material';
import {
    AccountCircle,
    LightMode,
    DarkMode,
    Menu as MoreVertIcon,
    Logout
} from '@mui/icons-material';
import CustomLink from '../shared/CustomLink';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';
import { setUser } from '../../store/userSlice';
import { logout } from '../../http';

interface NavbarProps {
    toggleDarkTheme: () => void;
    mode: "dark" | "light";
}

interface AccountMenuProps {
    anchorEl: HTMLElement | null;
    handleClose: () => void;
    open: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ anchorEl, handleClose, open }) => {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            await logout();
            dispatch(setUser(null));
            handleClose();
        } catch (error) {
            console.error(error);
            handleClose();
        }
    }
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'Account menu',
            }}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Avatar />
                </ListItemIcon>    Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    )
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkTheme, mode }) => {
    const { user } = useSelector((state: RootState) => state.user);
    const location = useLocation();
    const { pathname } = location;
    const isLoggedIn = Boolean(user);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                                    toggleDarkTheme();
                                }}
                                sx={{ mr: 1 }}
                            >
                                {mode === "light" ? <DarkMode /> : <LightMode />}
                            </IconButton>
                        </Tooltip>
                        {isLoggedIn ? (
                            <>
                                <Button
                                    size="large"
                                    aria-label="account"
                                    sx={{ mr: 1, textTransform: 'none' }}
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    variant='text'
                                    endIcon={<AccountCircle />}
                                    color="inherit" disableRipple>
                                    {user?.name.split(' ')[0]}
                                </Button>
                                <AccountMenu
                                    anchorEl={anchorEl as HTMLElement | null}
                                    handleClose={handleClose}
                                    open={open}
                                />
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

export default Navbar;