import React, { useState, useEffect, useRef } from 'react'
import { Box, TextField, Tooltip, IconButton, InputAdornment } from '@mui/material'
import { CheckBoxOutlined, LocalOffer, PushPin, PushPinOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import SaveButton from './SaveButton'
import { createNote, getTags } from '../../http/notes'
import { useNotification } from '../../contexts/NotificationContext'
import AddTags from './addTags/AddTagsTextArea'
import { addNote } from '../../store/notesSlice'
import { notifications } from '../../utils/notificationMessages'
import { APIError } from '../../types/api'

export const defaultBorderColor = '#757575'
const TAG_LIST_ID = 'tags-standard'

const CreateNoteForm = () => {
    const dispatch = useDispatch()
    const { addNotification: notify } = useNotification()
    const [isTitleVisible, setIsTitleVisible] = useState<boolean>(false)
    const [isAddTagVisible, setIsAddTagVisible] = useState<boolean>(true)

    // for the tag suggestions
    const [tags, setTags] = useState<(TagsOption | string)[]>([])
    const [options, setOptions] = useState<TagsOption[]>([])
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
        pinned: false,
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
            notify(notifications.note.save.success, 'success')
            dispatch(addNote(response.note))
            setFormStatus((prevState) => ({ ...prevState, isSaved: true }))
            setFormData(initialFormData)
            setTags(initialFormData.tags)
        } catch (error) {
            console.error('Error saving note:', error)
            const err = error as APIError;
            notify(err.response?.data.message || notifications.note.save.error, 'error')
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

            const isTargetInside = target.id.startsWith(TAG_LIST_ID) || target.id === 'create-first-note-btn'

            if (
                formRef.current &&
                !formRef.current.contains(event.target as Node) &&
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
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    className='pin'
                                    disableRipple
                                    disableTouchRipple
                                    sx={{
                                        position: 'absolute',
                                        top: "-12px",
                                        right: "-10px",
                                        padding: '0.2rem',
                                        zIndex: 5,
                                        backgroundColor: 'darkgrey',
                                        opacity: 0,
                                        transition: 'opacity 0.3s',
                                        '& .icon-filled': {
                                            display: 'none',
                                        },
                                        '& .icon-outlined': {
                                            display: 'block',
                                        },
                                        '&:hover .icon-filled': {
                                            display: 'block',
                                        },
                                        '&:hover .icon-outlined': {
                                            display: 'none',
                                        },
                                    }}
                                    size='small'
                                    aria-label="pin-note"
                                    onClick={() => {
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            pinned: !prevState.pinned,
                                        }))
                                    }}
                                >
                                    <Tooltip title={formData.pinned ? "Unpin" : "Pin"}>
                                        <>
                                            <PushPin className="icon-filled" fontSize='medium' />
                                            <PushPinOutlined className="icon-outlined" fontSize='medium' />
                                        </>
                                    </Tooltip>
                                </IconButton>

                            </InputAdornment>
                        ),
                    }}
                />
            )}

            <TextField
                id="content"
                name="content"
                value={content}
                onChange={handleChange}
                onClick={handleContentClick}
                onFocus={() => { setIsTitleVisible(true) }}
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
                InputProps={isTitleVisible === false ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip title="Add checklist">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {
                                        setIsTitleVisible((prevState) => !prevState)
                                    }}
                                >
                                    <CheckBoxOutlined />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    ),
                } : {}}
            />
            {
                isTitleVisible && isAddTagVisible && (
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
                )
            }
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
                                    <LocalOffer />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </>
                )}
            </Box>
        </Box >
    )
}

export default CreateNoteForm


// types 
interface TagsOption {
    title: string
    inputValue?: string
}
//