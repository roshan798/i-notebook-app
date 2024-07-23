import React from 'react';
import {
    Box,
    CircularProgress,
    Typography,
    Grid,
    Alert,
} from '@mui/material';
import { Note as NoteType } from '../../types/notes';
import NoteCard from './NoteCard';

interface NoteProps {
    notes: NoteType[];
    loading: boolean;
    error: string | null;
}

const Note: React.FC<NoteProps> = ({ notes, loading, error }) => {
    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{ padding: 2, mt: 6 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                My Notes
            </Typography>
            <Grid container spacing={2}>
                {notes.length > 0 &&
                    notes.map((note) => (
                        <Grid item xs={12} key={note.id}>
                            <NoteCard note={note} />
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default Note;
