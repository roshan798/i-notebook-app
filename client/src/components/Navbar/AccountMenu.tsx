import React from 'react'
import {
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Avatar,
} from '@mui/material'
import {
    Logout,
} from '@mui/icons-material'
import { useNotification } from '../../contexts/NotificationContext'
import { notifications } from '../../utils/notificationMessages'
import { setUser } from '../../store/userSlice'
import { logout } from '../../http/auth'
import { useDispatch } from 'react-redux'

interface AccountMenuProps {
    anchorEl: HTMLElement | null
    handleClose: () => void
    open: boolean
}

const AccountMenu: React.FC<AccountMenuProps> = ({
    anchorEl,
    handleClose,
    open,
}) => {
    const { addNotification: notify } = useNotification()
    const dispatch = useDispatch()
    const handleLogout = async () => {
        try {
            await logout()
            dispatch(setUser(null))
            notify(notifications.logout.success, 'success')
            handleClose()
        } catch (error) {
            console.error(error)
            notify(notifications.logout.error, 'error')
            handleClose()
        }
    }

    return (
        <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'account-menu-button',
            }}
            PaperProps={{
                elevation: 1,
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
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Avatar />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </MenuItem>
        </Menu>
    )
}

export default AccountMenu
