import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, Modal, Fade, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveButton from '../SaveButton';
import { updateNote, getTags } from '../../../http/notes';
import { useNotification } from '../../../contexts/NotificationContext';
import AddTags from '../addTags/AddTagsTextArea';
import { useDispatch } from 'react-redux';
import { updateNote as updateNoteAction } from '../../../store/notesSlice';
import { Note } from '../../../store/types';
import { notifications } from '../../../utils/notificationMessages';
import { APIError } from '../../../types/api';
export const defaultBorderColor = '#757575';
const TAG_LIST_ID = 'tags-standard-update';

interface UpdateNoteFormProps {
    note: Note;
    isOpen: boolean;
    handleClose: () => void;
}

interface TagsOption {
    title: string;
    inputValue?: string;
}

const UpdateNoteForm: React.FC<UpdateNoteFormProps> = ({ note, isOpen, handleClose }) => {
    const dispatch = useDispatch();
    const { addNotification: notify } = useNotification();

    const [tags, setTags] = useState<(TagsOption | string)[]>(note.tags);
    const [options, setOptions] = useState<TagsOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOptions = async () => {
            setLoading(true);
            try {
                const response = await getTags();
                setOptions(response);
            } catch (err) {
                setError('Failed to fetch options');
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, []);

    const initialFormData = {
        title: note.title,
        content: note.content,
        tags: note.tags,
    };

    const [formData, setFormData] = useState(initialFormData);
    const { title, content } = formData;
    // const formRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const [formStatus, setFormStatus] = useState({
        isSaving: false,
        isSaved: false,
        isErrorSaving: false,
    });

    const handleSave = async () => {
        try {
            setFormStatus({
                isSaving: true,
                isSaved: false,
                isErrorSaving: false,
            });

            const data = {
                title,
                content,
                tags: tags as string[],
                type: note.type,
                pinned: note.pinned
            };
            const response = await updateNote(note.id, data);

            dispatch(updateNoteAction(response.note));
            notify(notifications.note.update.success, 'success');
            setFormStatus((prevState) => ({ ...prevState, isSaved: true }));
            handleClose();
        } catch (error) {
            console.error('Error updating note:', error);
            const err = error as APIError;
            notify(err.response?.data.message || notifications.note.update.error, 'error');
            setFormStatus((prevState) => ({
                ...prevState,
                isErrorSaving: true,
            }));
        } finally {

            setFormStatus((preState) => ({ ...preState, isSaving: false }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                sx: { backgroundColor: 'rgba(0, 0, 0, 0.8)' }, // Darker backdrop
            }}
        >
            <Fade in={isOpen}>
                <Box
                    // ref={formRef}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        maxWidth: '35rem',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 1,
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        pt:1
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            id="update-title"
                            name="title"
                            label="Title"
                            value={title}
                            onChange={handleChange}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: defaultBorderColor,
                                    },
                                    '&:hover fieldset': {
                                        borderColor: defaultBorderColor,
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: defaultBorderColor,
                                    },
                                },
                            }}
                        />
                    </Box>
                    {note.type === "note" &&
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                id="update-content"
                                name="content"
                                label="Content"
                                value={content}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: defaultBorderColor,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: defaultBorderColor,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: defaultBorderColor,
                                        },
                                    },
                                }}
                            />
                        </Box>}
                    <Box id={TAG_LIST_ID} ref={tagRef} sx={{ mb: 2 }}>
                        <AddTags
                            tagListId="tags-standard"
                            value={tags}
                            setValue={setTags}
                            options={options}
                            setOptions={() => {
                                setOptions(options);
                            }}
                            loading={loading}
                            error={error}
                            isUpdateForm={true}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <SaveButton
                            sx={{
                                alignSelf: 'flex-end',
                            }}
                            variant="contained"
                            loading={formStatus.isSaving}
                            onClick={handleSave}
                        />
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default UpdateNoteForm;
