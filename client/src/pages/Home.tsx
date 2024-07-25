import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import MUIComponentShowcase from '../components/Navbar/MUIComponentShowcase'
import CreateNoteForm from '../components/notes/CreateNoteForm'
import Note from '../components/notes/Note'
import { deleteNote, getNotes } from '../http/notes'
import { Note as NoteType } from '../types/notes'
import { useNotification } from '../contexts/NotificationContext'
import { APIError } from '../types/api'
export default function Home() {
    const { addNotification: notify } = useNotification()
    const [notes, setNotes] = useState<NoteType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true)
                const data = await getNotes()
                setNotes(data.notes)
            } catch (err) {
                console.error('Error fetching notes:', err)
                alert('Some error occures while fetching notes')
                setError('Failed to load notes')
            } finally {
                setLoading(false)
            }
        }
        fetchNotes()
    }, [])

    const handleDeleteNote = async (noteId: string) => {
        try {
            const response = await deleteNote(noteId )
            notify(response.message, 'success')
            setNotes(notes.filter((note) => note.id !== noteId))
        } catch (error) {
            const err = error as APIError;
            console.error('Error deleting note:', error)
            notify(err.response?.data.message || 'Failed to delete note', 'error')
        }
    }

    return (
        <div>
            <Box sx={{ padding: 2 }} display="flex" justifyContent="center">
                <Box
                    sx={{
                        maxWidth: '50rem',
                        width: '100%',
                    }}>
                    <CreateNoteForm setNotes={setNotes} />
                    <Note handleDeleteNote={handleDeleteNote} notes={notes} loading={loading} error={error} />
                </Box>
            </Box>

            {import.meta.env.VITE_REACT_APP_ENVIRONMENT === 'development' && (
                <MUIComponentShowcase />
            )}
        </div>
    )
}
