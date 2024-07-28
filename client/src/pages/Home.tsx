import { Box } from '@mui/material'
import CreateNoteForm from '../components/notes/CreateNoteForm'
import Note from '../components/notes/Note'

export default function Home() {

    return (
        <div>
            <Box sx={{ padding: 2 }} display="flex" justifyContent="center">
                <Box
                    sx={{
                        maxWidth: '60rem',
                        width: '100%',
                    }}>
                    <CreateNoteForm />
                    <Note />
                </Box>
            </Box>
        </div>
    )
}
