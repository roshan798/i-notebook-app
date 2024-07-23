import React, { useState, useEffect, useRef } from 'react'
import { Box, TextField, Tooltip, IconButton } from '@mui/material'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import SaveButton from './SaveButton'
import { createNote, getTags } from '../../http/notes'
import { useNotification } from '../../contexts/NotificationContext'
import { Note as NoteType } from '../../types/notes'
import AddTags from './addTags/AddTags'

export const defaultBorderColor = '#757575'
const TAG_LIST_ID = 'tags-standard'
interface CreateNoteFormProps {
    setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>
}

//
interface FilmOption {
    title: string
    inputValue?: string
}
//

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ setNotes }) => {
    const { addNotification: notify } = useNotification()
    const [isTitleVisible, setIsTitleVisible] = useState<boolean>(false)
    const [isAddTagVisible, setIsAddTagVisible] = useState<boolean>(true)

    // for the tag suggestions
    const [tags, setTags] = useState<(FilmOption | string)[]>([])
    const [options, setOptions] = useState<FilmOption[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        // Fetch options from API
        const fetchOptions = async () => {
            setLoading(true)
            try {
                // Replace with your API call
                const response = await getTags()
                setOptions(response)
            } catch (err) {
                setError('Failed to fetch options')
            } finally {
                setLoading(false)
            }
        }

        fetchOptions()
    }, [])
    //
    const initialFormData = {
        title: '',
        content: '',
        tags: [],
    }
    const [formData, setFormData] = useState(initialFormData)
    const { title, content } = formData
    const formRef = useRef<HTMLDivElement>(null)
    const tagRef = useRef<HTMLDivElement>(null)
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
                tags: tags as string[],
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
            const target = event.target as HTMLElement

            const isTargetInside = target.id.startsWith(TAG_LIST_ID)

            if (
                formRef.current &&
                !formRef.current.contains(event.target as Node) &&
                !(
                    tagRef.current &&
                    tagRef.current.contains(event.target as Node)
                ) &&
                !isTargetInside
            ) {
                setIsTitleVisible(false)
                setIsAddTagVisible(false)
                setTags([])
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
            {isTitleVisible && isAddTagVisible && (
                <Box ref={tagRef} id="id">
                    <AddTags
                        tagListId="tags-standard"
                        value={tags}
                        setValue={setTags}
                        options={options}
                        setOptions={() => {
                            setOptions(options)
                        }}
                        loading={loading}
                        error={error}
                    />
                </Box>
            )}
            <Box>
                {isTitleVisible && (
                    <>
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
                            <SaveButton
                                color="inherit"
                                variant="text"
                                loading={formStatus.isSaving}
                                onClick={handleSave}
                            />
                            <Tooltip
                                title={
                                    isAddTagVisible
                                        ? 'Close add tag'
                                        : 'Add tags'
                                }>
                                <IconButton
                                    color="primary"
                                    size="small"
                                    aria-label="add-tags"
                                    onClick={() =>
                                        setIsAddTagVisible(
                                            (prevState) => !prevState
                                        )
                                    }>
                                    <LocalOfferIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    )
}

export default CreateNoteForm
