import React from 'react';
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Typography,
    Chip,
    Grid,
    Alert,
    Tooltip,
} from '@mui/material';
import { Note as NoteType } from '../../types/notes';
import { formatDate, getRelativeTime } from '../../utils/timeUtils';

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
                {notes.length > 0 && notes.map((note) => (
                    <Grid item xs={12} key={note.id}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {note.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {note.content}
                                </Typography>
                                <Box sx={{ mt: 2, mb: 1 }}>
                                    {note.tags.map((tag) => (
                                        <Chip variant="outlined" color="secondary" key={tag} label={tag} sx={{ mr: 1 }} />
                                    ))}
                                </Box>
                                <Tooltip title={formatDate(note.createdAt)}>
                                    <Typography variant="caption" color="text.secondary">
                                        {getRelativeTime(note.createdAt)}
                                    </Typography>
                                </Tooltip>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Note;
