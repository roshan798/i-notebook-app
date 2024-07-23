import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Tooltip,
} from '@mui/material';
import { Note as NoteType } from '../../types/notes';
import { formatDate, getRelativeTime } from '../../utils/timeUtils';

interface NoteCardProps {
    note: NoteType;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => (
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
                    <Chip
                        variant="outlined"
                        color="secondary"
                        key={tag}
                        label={tag}
                        sx={{ mr: 1 }}
                    />
                ))}
            </Box>
            <Tooltip title={formatDate(note.createdAt)}>
                <Typography variant="caption" color="text.secondary">
                    {getRelativeTime(note.createdAt)}
                </Typography>
            </Tooltip>
        </CardContent>
    </Card>
);

export default NoteCard;
