import { EditNote, DeleteRounded, DeleteOutlineRounded } from "@mui/icons-material";
import { Stack, Tooltip, IconButton } from "@mui/material";

const NotesMenu: React.FC<{ handleOpen: () => void, handleDialogOpen: () => void }> = ({ handleOpen, handleDialogOpen }) => (
    <Stack className='notes-menu' direction="row" sx={{
        padding: '0.2rem',
        opacity: { xs: 1, sm: 0 },
        transition: 'opacity 0.3s',
        '& .MuiIconButton-root': { borderRadius: 1, mt: -2, ml: 1 },
        '@media (min-width:600px)': {
            opacity: 0,
        },
    }}>
        <Tooltip title="Edit">
            <IconButton size='small' aria-label="edit-note" onClick={handleOpen}>
                <EditNote fontSize='medium' />
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
                <DeleteOutlineRounded className='icon-outlined' fontSize='medium' />
            </IconButton>
        </Tooltip>
    </Stack>
);

export default NotesMenu;