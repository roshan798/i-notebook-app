import React from 'react';
import { Box, Typography, Alert, Button, Card, Skeleton, Grid } from '@mui/material';
import { Note as NoteType } from '../../types/notes';
import NoteCard from './NoteCard';
import Masonry from '@mui/lab/Masonry';

interface NoteProps {
    notes: NoteType[];
    loading: boolean;
    error: string | null;
    handleDeleteNote?: (noteId: string) => void;
}

const Note: React.FC<NoteProps> = ({ notes, loading, error, handleDeleteNote }) => {

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{ padding: 2, mt: 6 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                My Notes
            </Typography>
            <Box>
                {loading && (
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
                )}
                {notes.length > 0 ? (
                    <Masonry
                        columns={{ xs: 1, sm: 2, md: 2 }}
                        spacing={2}
                        sequential
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
                )}
            </Box>
        </Box>
    );
};

export default Note;
