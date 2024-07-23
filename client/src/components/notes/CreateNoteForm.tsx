import React, { useState, useEffect, useRef } from 'react'
import {
    Box,
    TextField,
    // IconButton,
} from '@mui/material'
import SaveButton from './SaveButton'
import { createNote } from '../../http/notes'
import { useNotification } from '../../contexts/NotificationContext'
import { Note as NoteType } from '../../types/notes'
const defaultBorderColor = '#757575'
interface CreateNoteFormProps {
    setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
}

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ setNotes }) => {
    const { addNotification: notify } = useNotification()
    const [isTitleVisible, setIsTitleVisible] = useState(false)
    const initialFormData = {
        title: '',
        content: '',
        tags: [],
    }
    const [formData, setFormData] = useState(initialFormData)
    const { title, content } = formData
    const formRef = useRef<HTMLDivElement>(null)
    const [formStatus, setFormStatus] = useState({
        isSaving: false,
        isSaved: false,
        isErrorSaving: false,
    })

    const handleContentClick = () => {
        setIsTitleVisible(true)
    }

    const handleSave = async () => {
        try {
            setFormStatus({
                isSaving: true,
                isSaved: false,
                isErrorSaving: false,
            })
            const response = await createNote({
                title,
                content,
                tags: [],
            })
            console.log('Note saved:', response)
            notify('Note saved successfully', 'success')
            setNotes((prevState: NoteType[]) => [response.note, ...prevState])
            setFormStatus((prevState) => ({ ...prevState, isSaved: true }))
            setFormData(initialFormData)
        } catch (error) {
            console.error('Error saving note:', error)
            setFormStatus((prevState) => ({
                ...prevState,
                isErrorSaving: true,
            }))
        } finally {
            setFormStatus((preState) => ({ ...preState, isSaving: false }))
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                formRef.current &&
                !formRef.current.contains(event.target as Node)
            ) {
                setIsTitleVisible(false)
                setFormData(initialFormData)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box
            ref={formRef}
            sx={{
                width: '100%',
                maxWidth: '35rem',
                margin: 'auto',
                marginTop: '2rem',
                boxShadow: 6,
            }}>
            {isTitleVisible && (
                <TextField
                    id="title"
                    name="title"
                    label=""
                    value={title}
                    placeholder="Title"
                    onChange={handleChange}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                                borderColor: defaultBorderColor,
                                borderBottom: 'none',
                            },
                            '&:hover fieldset': {
                                borderColor: defaultBorderColor,
                            },
                            '&.Mui-focused fieldset': {
                                borderWidth: 1,
                                borderColor: defaultBorderColor,
                            },
                        },
                    }}
                />
            )}
            <Box>
                <TextField
                    id="content"
                    name="content"
                    label=""
                    value={content}
                    onChange={handleChange}
                    onClick={handleContentClick}
                    placeholder="Take a note..."
                    fullWidth
                    multiline
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderRadius: isTitleVisible ? 0 : '4px',
                                borderColor: defaultBorderColor,
                                borderTop: isTitleVisible ? '0px' : '',
                                borderBottom: isTitleVisible ? '0px' : '',
                                top: '-6px',
                            },
                            '&:hover fieldset': {
                                borderColor: defaultBorderColor,
                            },
                            '&.Mui-focused fieldset': {
                                borderWidth: 1,
                                borderColor: defaultBorderColor, // Default focus border color
                            },
                        },
                    }}
                />
                {isTitleVisible && (
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            border: `1px solid ${defaultBorderColor}`,
                            borderTop: 'none',
                            borderRadius: '0 0 4px 4px',
                            p: 1,
                        }}>
                        {/* <IconButton>
                        <NotificationsIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <PersonAddIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <PaletteIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <ImageIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <ArchiveIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton>
                        <UndoIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <RedoIcon fontSize="small" />
                    </IconButton> */}
                        <SaveButton
                            color="inherit"
                            variant="text"
                            loading={formStatus.isSaving}
                            onClick={handleSave}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default CreateNoteForm
