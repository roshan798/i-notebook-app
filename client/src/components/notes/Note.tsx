import { useEffect } from 'react';
import { Box, Typography, Alert, Button, Card, Skeleton, Grid } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { useSelector, useDispatch } from 'react-redux';
import NoteCard from './NoteCard';
import { setNotes, setLoading, setError } from '../../store/notesSlice';
import { getNotes } from '../../http/notes';
import type { RootState } from '../../store';

const Note = () => {
    const { pinnedNotes, unpinnedNotes, loading, error } = useSelector((state: RootState) => state.notesStore);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                dispatch(setLoading(true));
                const data = await getNotes();
                dispatch(setNotes(data.notes));
            } catch (err) {
                console.error('Error fetching notes:', err);
                alert('Some error occurs while fetching notes');
                dispatch(setError('Failed to load notes'));
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{ padding: 2, mt: 6 }}>
            {/* <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                My Notes
            </Typography> */}
            <Box>
                {loading ? (
                    <Grid container spacing={2}>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Skeleton
                                    width="100%"
                                    height={200}
                                    variant="rectangular"
                                    animation="wave"
                                    sx={{ borderRadius: 2 }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <>
                        {pinnedNotes.length > 0 && (
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" fontSize={"0.8rem"} component="h3" color={"GrayText"} sx={{ mb: 2 }}>
                                    Pinned Notes
                                </Typography>
                                <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
                                    {pinnedNotes.map((note) => (
                                        <NoteCard note={note} key={note.id} />
                                    ))}
                                </Masonry>
                            </Box>
                        )}
                        {unpinnedNotes.length > 0 && (
                            <Box>
                                <Typography variant="h6" fontSize={"0.8rem"} component="h3" color={"GrayText"} sx={{ mb: 2 }}>

                                    Other Notes
                                </Typography>
                                <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
                                    {unpinnedNotes.map((note) => (
                                        <NoteCard note={note} key={note.id} />
                                    ))}
                                </Masonry>
                            </Box>
                        )}
                        {pinnedNotes.length === 0 && unpinnedNotes.length === 0 && (<NoNotesComponent />)}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Note;

const NoNotesComponent = () => {

    return (
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
}
