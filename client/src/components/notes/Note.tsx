import { useEffect } from 'react';
import { Box, Typography, Alert, Button, Card, Skeleton, Grid } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { useSelector, useDispatch } from 'react-redux';
import NoteCard from './NoteCard';
import { setNotes, setLoading, setError, deleteNote } from '../../store/notesSlice';
import { getNotes } from '../../http/notes';
import { deleteNote as deleteNoteAPI } from '../../http/notes';
import { useNotification } from '../../contexts/NotificationContext';
import { notifications } from '../../utils/notificationMessages';
import type { APIError } from '../../types/api';
import type { RootState } from '../../store';


const Note = () => {
    const { notes, loading, error } = useSelector((state: RootState) => state.notesStore);
    const dispatch = useDispatch();
    const { addNotification: notify } = useNotification()
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true)
                const data = await getNotes()
                dispatch(setNotes(data.notes))
            } catch (err) {
                console.error('Error fetching notes:', err)
                alert('Some error occures while fetching notes')
                setError('Failed to load notes')
            } finally {
                setLoading(false)
            }
        }
        fetchNotes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleDeleteNote = async (noteId: string) => {
        try {
            const response = await deleteNoteAPI(noteId)
            dispatch(deleteNote(noteId))
            notify(response.message || notifications.note.delete.success, 'success')
        } catch (err) {
            const error = err as APIError;
            notify(error.message || notifications.note.delete.error, 'error')
        }
    }
    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }
    return (
        <Box sx={{ padding: 2, mt: 6 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                My Notes
            </Typography>
            <Box>
                {loading ? (
                    // Show skeleton of the notes card 4
                    <Grid container spacing={2}>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Skeleton width="100%" height={240} variant="rectangular" sx={{
                                    borderRadius: 2,
                                }}>
                                </Skeleton>
                            </Grid>
                        ))}
                    </Grid>
                ) : (

                    notes.length > 0 ? (
                        <Masonry
                            columns={{ xs: 1, sm: 2, md: 2 }}
                            spacing={2}
                        // sequential
                        >
                            {notes.map((note) => (
                                <NoteCard handleDeleteNote={handleDeleteNote} note={note} key={note.id} />
                            ))}
                        </Masonry>
                    ) : (
                        <Box sx={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center' }}>
                            <Card elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
                                <Typography variant="h6" gutterBottom textAlign="center">
                                    📝 No notes found
                                </Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom textAlign="center">
                                    It looks like you don't have any notes yet. Start by creating one!
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <Button
                                        id="create-first-note-btn"
                                        variant="contained"
                                        color="primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            document.getElementById("content")?.focus();
                                        }}
                                    >
                                        Create a Note 📝
                                    </Button>
                                </Box>
                            </Card>
                        </Box>
                    )

                )}

            </Box>
        </Box>
    );
};

export default Note;
