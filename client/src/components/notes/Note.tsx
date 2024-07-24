import React from 'react'
import { Box, CircularProgress, Typography, Alert, Button, Card } from '@mui/material'
import { Note as NoteType } from '../../types/notes'
import NoteCard from './NoteCard'
import Masonry from 'react-masonry-css'
import "./masonaryLayout.css"
interface NoteProps {
    notes: NoteType[]
    loading: boolean
    error: string | null
}

const Note: React.FC<NoteProps> = ({ notes, loading, error }) => {
    if (loading) {
        return <CircularProgress />
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>
    }

    return (
        <Box sx={{ padding: 2, mt: 6 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                My Notes
            </Typography>
            <Box
            >
                {notes.length > 0 ? (
                    <Masonry
                        className='my-masonry-grid'
                        columnClassName="my-masonry-grid_column"
                    >
                        {notes.map((note) => (
                            <NoteCard note={note} key={note.id} />
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
                                    id='create-first-note-btn'
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        document.getElementById("content")?.focus()
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
    )
}

export default Note
