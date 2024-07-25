import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import MUIComponentShowcase from '../components/Navbar/MUIComponentShowcase'
import CreateNoteForm from '../components/notes/CreateNoteForm'
import Note from '../components/notes/Note'
import { getNotes } from '../http/notes'
import { Note as NoteType } from '../types/notes'
export default function Home() {
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

    return (
        <div>
            <Box sx={{ padding: 2 }} display="flex" justifyContent="center">
                <Box
                    sx={{
                        maxWidth: '50rem',
                        width: '100%',
                    }}>
                    <CreateNoteForm setNotes={setNotes} />
                    <Note notes={notes} loading={loading} error={error} />
                </Box>
            </Box>

            {import.meta.env.VITE_REACT_APP_ENVIRONMENT === 'development' && (
                <MUIComponentShowcase />
            )}
        </div>
    )
}
