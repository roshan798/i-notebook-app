import React, { useState } from 'react';
import { Note as NoteType } from '../../store/types';
import UpdateNoteForm from "./UpdateNoteForm";
import { CardContent, Card } from '@mui/material';
import MyDialog from '../shared/MyDialog';
import {
    Checklist,
    PinButton,
    NoteTitle,
    NoteContent,
    NotesMenu,
    NoteTags
} from './noteCardComponent';
import { useNotification } from '../../contexts/NotificationContext';
import { useDispatch } from 'react-redux';
import { deleteNote as deleteNoteAPI } from '../../http/notes';
import { deleteNote } from '../../store/notesSlice';
import { APIError } from '../../types/api';
import { notifications } from '../../utils/notificationMessages';


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
};

const NoteCard: React.FC<{ note: NoteType }> = ({ note }) => {
    const { addNotification: notify } = useNotification();
    const dispatch = useDispatch();
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleClose = () => {
        setUpdateModalOpen(false);
    };

    const handleOpen = () => {
        setUpdateModalOpen(true);
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };
    const handleDeleteNote = async (noteId: string) => {
        try {
            const response = await deleteNoteAPI(noteId);
            dispatch(deleteNote(noteId));
            notify(response.message || notifications.note.delete.success, 'success');
        } catch (err) {
            const error = err as APIError;
            notify(error.message || notifications.note.delete.error, 'error');
        }
    };

    const handleConfirmDelete = () => {
        if (handleDeleteNote) {
            handleDeleteNote(note.id);
        }
        handleDialogClose();
    };
    return (
        <>
            {isUpdateModalOpen && <UpdateNoteForm isOpen={isUpdateModalOpen} handleClose={handleClose} note={note} />}
            <div>
                <Card elevation={3} sx={cardStyles}>
                    <PinButton pinned={note.pinned} notesId={note.id} />
                    <CardContent sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>

                        <NoteTitle
                            createdAt={note.createdAt}
                            updatedAt={note.updatedAt}
                            title={note.title || ""}
                            setUpdateModalOpen={setUpdateModalOpen}
                        />
                        {note.type === "list" ? <Checklist
                            items={note.checklist || []}
                        /> : <NoteContent content={note.content || ""} />}
                        {note.tags.length > 0 && <NoteTags tags={note.tags} />}
                    </CardContent>
                    <NotesMenu handleOpen={handleOpen} handleDialogOpen={handleDialogOpen} />
                </Card>
            </div>
            <MyDialog
                dialogTitle='Confirm Delete'
                dialogText='Are you sure you want to delete this note?'
                isDialogOpen={isDialogOpen}
                handleClose={handleDialogClose}
                handleConfirm={handleConfirmDelete}
                confirmText='Delete'
                color='error'
            />
        </>
    );
};

export default NoteCard;
