import React, { useState } from 'react';
import { CardContent, Typography, Chip, Box, Tooltip, IconButton, Card } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Note as NoteType } from '../../types/notes';
import { formatDate, getRelativeTime } from '../../utils/timeUtils';

interface NoteCardProps {
    note: NoteType;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
    const [showMore, setShowMore] = useState(false);
    const chipsToShow = showMore ? note.tags : note.tags.slice(0, 4);

    const handleToggle = () => {
        setShowMore(!showMore);
    };

    return (
        <div>
            <Card elevation={3} sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                },
                '&:hover .edit-icon': {
                    opacity: 1,
                },
            }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                flex: 1,
                            }}
                        >
                            {note.title}
                        </Typography>
                        <Tooltip title="Edit note">
                            <IconButton
                                size='small'
                                aria-label="edit-note"
                                className="edit-icon"
                                sx={{ opacity: 0, transition: 'opacity 0.3s' }}
                                onClick={() => { }}
                            >
                                <EditNoteIcon fontSize='large' />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 2,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 15,
                            lineClamp: 15,
                        }}
                    >
                        {note.content}
                    </Typography>
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
                    <Tooltip title={formatDate(note.createdAt)}>
                        <Typography variant="caption" color="text.secondary">
                            {getRelativeTime(note.createdAt)}
                        </Typography>
                    </Tooltip>
                </CardContent>
            </Card>
        </div>
    );
};

export default NoteCard;
