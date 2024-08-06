import React, { useState } from "react";
import { EditNote, DeleteRounded, DeleteOutlineRounded, PaletteRounded, PaletteOutlined } from "@mui/icons-material";
import { Stack, Tooltip, IconButton, Menu, MenuItem } from "@mui/material";
import ColorPicker from "./ColorPicker";
import { useTheme } from "../../../theme/useTheme";
import { Color } from "../../../data/cardColor";

type NoteMenuProps = {
    handleOpen: () => void;
    handleDialogOpen: () => void;
    onColorChange: (color: Color) => void;
    color: Color;
};

const NotesMenu: React.FC<NoteMenuProps> = ({ handleOpen, handleDialogOpen, onColorChange, color }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { theme } = useTheme();
    const handleColorPickerOpen = (event: React.MouseEvent<HTMLElement>) => {
        if (anchorEl) return;
        setAnchorEl(event.currentTarget);
    };

    const handleColorPickerClose = () => {
        setAnchorEl(null);
    };

    return (
        <Stack className='notes-menu' direction="row" sx={{
            padding: '0.2rem',
            opacity: { xs: 1, sm: anchorEl ? 1 : 0 },
            transition: 'opacity 0.3s',
            '& .MuiIconButton-root': { borderRadius: 1, mt: -2, ml: 1 },
            '@media (min-width:600px)': {
                opacity: anchorEl ? 1 : 0,
            },
            '& .menu-icon': {
                color: color.iconColor || theme.palette.text.secondary,
            },
        }}>
            <Tooltip title="Edit">
                <IconButton size='small' aria-label="edit-note" onClick={handleOpen}>
                    <EditNote className="menu-icon " fontSize='medium' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton
                    size='small'
                    aria-label="delete-note"
                    onClick={handleDialogOpen}
                    sx={{
                        '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.1)' },
                        '& .icon-filled': { display: 'none' },
                        '&:hover .icon-filled': { display: 'block' },
                        '&:hover .icon-outlined': { display: 'none' },
                    }}
                >
                    <DeleteRounded fontSize='medium' className='icon-filled' color='error' />
                    <DeleteOutlineRounded className='menu-icon icon-outlined' fontSize='medium' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Change color">
                <IconButton
                    aria-controls="color-picker-menu"
                    aria-haspopup="true"
                    size='small'
                    aria-label="change-color"
                    onClick={handleColorPickerOpen}
                    onMouseEnter={handleColorPickerOpen}
                    sx={{
                        '& .icon-filled': { display: 'none' },
                        '&:hover .icon-filled': { display: 'block' },
                        '&:hover .icon-outlined': { display: 'none' },
                    }}
                >
                    <PaletteRounded className='menu-icon icon-filled' fontSize='medium' />
                    <PaletteOutlined className='menu-icon icon-outlined' fontSize='medium' />
                </IconButton>

            </Tooltip>
            <Menu
                id="color-picker-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleColorPickerClose}
                MenuListProps={{
                    'aria-labelledby': 'change-color',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{
                    backgroundColor: 'transparent',
                    '& .MuiPaper-root': {
                        boxShadow: 'none',
                        background: 'transparent',
                    },
                    '& .MuiMenuItem-root': {
                        p: 0,
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'transparent',
                        }
                    },
                    '& .MuiBox-root': {
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: 2,
                    }
                }}
            >
                <MenuItem disableRipple
                    onMouseLeave={handleColorPickerClose}
                >
                    <ColorPicker onSelect={(color) => { onColorChange(color); }} />
                </MenuItem>
            </Menu>
        </Stack >
    );
};

export default NotesMenu;