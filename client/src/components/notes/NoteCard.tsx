import React, { useState } from 'react';
import { Note as NoteType } from '../../store/types';
import { formatDate, getRelativeTime } from '../../utils/timeUtils';
import UpdateNoteForm from "./UpdateNoteForm";
import { pinNote as PinNoteApi } from '../../http/notes';
import { EditNote, DeleteOutlineRounded, DeleteRounded, PushPin, PushPinOutlined } from '@mui/icons-material';
import { CardContent, Typography, Chip, Box, Tooltip, IconButton, Card, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { pinNote } from '../../store/notesSlice';
interface NoteCardProps {
    note: NoteType;
    handleDeleteNote?: (noteId: string) => void;
}
const cardStyles = {

    position: "relative",
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'all 0.3s ease-in-out',
    overflow: "visible",
    '&:hover': {
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    },
    '&:hover > .pin': {
        opacity: 1,
    },
    '@media (min-width:600px)': {
        '&:hover .notes-menu': {
            opacity: 1,
        },

    }
}
const NoteCard: React.FC<NoteCardProps> = ({ note, handleDeleteNote }) => {
    const dispatch = useDispatch()
    const [showMore, setShowMore] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPinHovered, setIsPinHovered] = useState(false);
    const [pinPending, setPinPending] = useState(false);

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
    const handlePin = async () => {
        try {
            setPinPending(true);
            const response = await PinNoteApi(note.id, { pin: !note.pinned });
            if (response.success) {
                dispatch(pinNote(note.id));
            }

        } catch (error) {
            console.error('Error pinning note:', error)
        }
        finally {
            setPinPending(false);
        }
    }

    return (
        <>
            {isModalOpen && <UpdateNoteForm isOpen={isModalOpen} handleClose={handleClose} note={note} />}
            <div >
                <Card elevation={3} sx={cardStyles}>
                    <Tooltip title="pin">
                        <IconButton
                            disabled={pinPending}
                            className='pin'
                            disableRipple
                            disableTouchRipple
                            sx={{
                                position: 'absolute',
                                top: "-12px",
                                right: "-10px",
                                padding: '0.2rem',
                                zIndex: 5,
                                backgroundColor: 'darkgrey',
                                opacity: note.pinned ? 1 : 0,
                                transition: 'opacity 0.3s',
                            }}
                            size='small'
                            aria-label="pin-note"
                            onMouseEnter={() => setIsPinHovered(true)}
                            onMouseLeave={() => setIsPinHovered(false)}
                            onClick={handlePin}

                        >

                            {note.pinned || isPinHovered ? <PushPin fontSize='medium' /> : <PushPinOutlined fontSize='medium' />}
                        </IconButton>
                    </Tooltip>
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
                                <EditNote fontSize='medium' />
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
            </div >

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
