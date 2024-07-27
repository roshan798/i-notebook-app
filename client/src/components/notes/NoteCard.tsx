import React, { useState } from 'react';
import { CardContent, Typography, Chip, Box, Tooltip, IconButton, Card, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Note as NoteType } from '../../store/types';
import { formatDate, getRelativeTime } from '../../utils/timeUtils';
import { DeleteOutlineRounded, DeleteRounded } from '@mui/icons-material';
import UpdateNoteForm from "./UpdateNoteForm";

interface NoteCardProps {
    note: NoteType;
    handleDeleteNote?: (noteId: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, handleDeleteNote }) => {
    const [showMore, setShowMore] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteHovered, setIsDeleteHovered] = useState(false); // State to track hover status
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

    const chipsToShow = showMore ? note.tags : note.tags.slice(0, 4);

    const handleToggle = () => {
        setShowMore(!showMore);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleOpen = () => {
        setIsModalOpen(true);
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleConfirmDelete = () => {
        if (handleDeleteNote) {
            handleDeleteNote(note.id);
        }
        handleDialogClose();
    };

    return (
        <>
            {isModalOpen && <UpdateNoteForm isOpen={isModalOpen} handleClose={handleClose} note={note} />}
            <div>
                <Card elevation={3} sx={{
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    },
                    '@media (min-width:600px)': {
                        '&:hover .notes-menu': {
                            opacity: 1,
                        },
                    },
                }}>
                    <CardContent sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                component="div"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    fontWeight: 600,
                                }}
                            >
                                {note.title}
                            </Typography>
                            <Tooltip title={"Created: " + formatDate(note?.createdAt)}>
                                <Typography variant="caption" color="GrayText" sx={{
                                    whiteSpace: 'nowrap',
                                }}>
                                    {getRelativeTime(note.updatedAt)}
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mt: 1,
                            }}
                        >
                            {note.content}
                        </Typography>
                        {chipsToShow.length > 0 &&
                            <Box sx={{ mt: 2, mb: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {chipsToShow.map((tag) => (
                                    <Chip
                                        variant="filled"
                                        key={tag}
                                        label={tag}
                                        size="small"
                                    />
                                ))}
                                {note.tags.length > 4 && (
                                    <Chip
                                        variant="outlined"
                                        size="small"
                                        label={showMore ? 'Show Less' : 'Show More'}
                                        color="secondary"
                                        key={showMore ? 'Show Less' : 'Show More'}
                                        onClick={handleToggle}
                                    />
                                )}
                            </Box>
                        }
                    </CardContent>
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
                            <IconButton
                                size='small'
                                aria-label="edit-note"
                                onClick={handleOpen}
                            >
                                <EditNoteIcon fontSize='medium' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton
                                size='small'
                                aria-label="delete-note"
                                onMouseEnter={() => setIsDeleteHovered(true)}
                                onMouseLeave={() => setIsDeleteHovered(false)}
                                onClick={handleDialogOpen}
                            >
                                {isDeleteHovered ? <DeleteRounded fontSize='medium' color='error' /> : <DeleteOutlineRounded fontSize='medium' />}
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Card>
            </div>

            <Dialog
                open={isDialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this note?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NoteCard;
