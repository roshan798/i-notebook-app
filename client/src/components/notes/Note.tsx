import React from 'react'
import { Box, CircularProgress, Typography, Grid, Alert, Button, Card } from '@mui/material'
import { Note as NoteType } from '../../types/notes'
import NoteCard from './NoteCard'

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
            <Grid container spacing={2}>
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <Grid item xs={12} key={note.id}>
                            <NoteCard note={note} />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12} container direction="column" alignItems="center">
                        <Card
                            elevation={3}
                            sx={{ padding: 4, width: "100%", maxWidth: 600 }} // Added maxWidth for better appearance
                        >
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
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default Note
