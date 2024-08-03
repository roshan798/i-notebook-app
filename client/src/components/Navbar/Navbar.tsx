import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Tooltip,
} from '@mui/material'
import {
    AccountCircle,
    DarkMode,
    LightMode,
    Menu as MoreVertIcon,
} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import CustomLink from '../shared/CustomLink'
import { RootState } from '../../store/types'
import AccountMenu from './AccountMenu'
import { useTheme } from '../../theme/useTheme'

const ToggleThemeSwitch = () => {
    const { mode, toggleMode } = useTheme()

    return (
        <>
            <Tooltip title={mode === 'light' ? 'Dark' : 'Light'}>
                <IconButton
                    edge="start"
                    aria-label="toggle theme"
                    onClick={toggleMode}
                    size='large'
                    sx={{ mr: 1 }}>

                    {mode === 'light' ? (
                        <DarkMode />
                    ) : (
                        <LightMode />
                    )}
                </IconButton>
            </Tooltip></>
    )
}

const Navbar = () => {
    const { user } = useSelector((state: RootState) => state.user)
    const location = useLocation()
    const { pathname } = location
    const isLoggedIn = Boolean(user)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <CustomLink
                        to="/"
                        sx={{
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                        }}>
                        <Typography variant="h4" noWrap component="div">
                            I-Notebook
                        </Typography>
                    </CustomLink>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                        }}>
                        <ToggleThemeSwitch />
                        {isLoggedIn ? (
                            <>
                                <Button
                                    size="large"
                                    aria-label="account"
                                    sx={{ mr: 1, textTransform: 'none' }}
                                    id="basic-button"
                                    aria-controls={
                                        open ? 'basic-menu' : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    variant="text"
                                    endIcon={<AccountCircle />}
                                    color="inherit"
                                    disableRipple>
                                    {user?.name.split(' ')[0]}
                                </Button>
                                <AccountMenu
                                    anchorEl={anchorEl as HTMLElement | null}
                                    handleClose={handleClose}
                                    open={open}
                                />
                            </>
                        ) : <>
                            {pathname === '/login' ? (
                                <Button
                                    component={Link}
                                    to="/signup"
                                    color="inherit">
                                    Sign Up
                                </Button>
                            ) : (
                                <Button
                                    component={Link}
                                    to="/login"
                                    color="inherit">
                                    Login
                                </Button>
                            )}
                        </>}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <ToggleThemeSwitch />
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls="primary-search-account-menu-mobile"
                            aria-haspopup="true"
                            onClick={handleClick}
                            color="inherit">
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
