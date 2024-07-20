import {
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
} from '@mui/material';
import {
    AccountCircle,
    LightMode,
    DarkMode,
    Logout
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';

interface MobileMenuProps {
    mobileMoreAnchorEl: HTMLElement | null;
    mobileMenuId: string;
    isMobileMenuOpen: boolean;
    handleMobileMenuClose: () => void;
    toggleDarkTheme: () => void;
    mode: "dark" | "light";
    user: any;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
    mobileMoreAnchorEl,
    mobileMenuId,
    isMobileMenuOpen,
    handleMobileMenuClose,
    toggleDarkTheme,
    mode,
    user
}) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        handleMobileMenuClose();
        dispatch(logout());
    };

    return (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={toggleDarkTheme}>
                <ListItemIcon>
                    {mode === "light" ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
                </ListItemIcon>
                Toggle Theme
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMobileMenuClose}>
                <ListItemIcon>
                    <AccountCircle fontSize="small" />
                </ListItemIcon>
                Profile
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
                <ListItemIcon>
                    <AccountCircle fontSize="small" />
                </ListItemIcon>
                My account
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
};

export default MobileMenu;
