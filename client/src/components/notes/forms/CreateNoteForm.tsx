import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Tooltip, IconButton, InputAdornment } from '@mui/material';
import { CheckBoxOutlined, LocalOffer, PushPin, PushPinOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import SaveButton from '../SaveButton';
import { createNote, getTags } from '../../../http/notes';
import { useNotification } from '../../../contexts/NotificationContext';
import AddTags from '../addTags/AddTagsTextArea';
import { addNote } from '../../../store/notesSlice';
import { notifications } from '../../../utils/notificationMessages';
import { APIError } from '../../../types/api';
import AddCheckList from '../addChecklist/AddCheckList';

import type { ChecklistItem } from "../../../store/types"

export const defaultBorderColor = '#757575';
const TAG_LIST_ID = 'tags-standard';


const CreateNoteForm = () => {
    const dispatch = useDispatch();
    const [typeOfNote, setTypeOfNote] = useState<"note" | "list">("note");
    const { addNotification: notify } = useNotification();
    const [isTitleVisible, setIsTitleVisible] = useState<boolean>(false);
    const [isAddTagVisible, setIsAddTagVisible] = useState<boolean>(true);

    // for the tag suggestions
    const [tags, setTags] = useState<(TagsOption | string)[]>([]);
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
        title: '',
        content: '',
        tags: [],
        pinned: false,
    };
    const [checkListItems, setCheckListItems] = useState<ChecklistItem[]>([])
    const [formData, setFormData] = useState(initialFormData);
    const { title, content, pinned } = formData;
    const formRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const checkListRef = useRef<HTMLDivElement>(null)
    const [formStatus, setFormStatus] = useState({
        isSaving: false,
        isSaved: false,
        isErrorSaving: false,
    });

    const handleContentClick = () => {
        setIsTitleVisible(true);
    };

    const handleSave = async () => {
        try {
            setFormStatus({
                isSaving: true,
                isSaved: false,
                isErrorSaving: false,
            });

            const response = await createNote({
                title,
                content,
                tags: tags as string[],
                pinned,
                checklist: checkListItems,
                type: typeOfNote,
            });
            notify(notifications.note.save.success, 'success');
            dispatch(addNote(response.note));
            setFormStatus((prevState) => ({ ...prevState, isSaved: true }));
            setFormData(initialFormData);
            setTags(initialFormData.tags);
        } catch (error) {
            console.error('Error saving note:', error);
            const err = error as APIError;
            notify(err.response?.data.message || notifications.note.save.error, 'error');
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const isTargetInside = target.id.startsWith(TAG_LIST_ID) || target.id === 'create-first-note-btn';

            if (
                formRef.current &&
                !formRef.current.contains(event.target as Node) &&
                !isTargetInside
            ) {
                setIsTitleVisible(false);
                setIsAddTagVisible(false);
                setTags([]);
                setFormData(initialFormData);
                setTypeOfNote("note")
                setCheckListItems([])
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const togglePin = () => {
        setFormData((prevState) => ({
            ...prevState,
            pinned: !prevState.pinned,
        }));
    };

    const toggleTagVisibility = () => {
        setIsAddTagVisible((prevState) => !prevState);
    };
    const addItemsToChecklist = (item: ChecklistItem) => {
        setCheckListItems((prevState) => [item, ...prevState])
    }
    const removeItemFromChecklist = (id: number) => {
        setCheckListItems((prevState) => prevState.filter(item => item.id !== id))
    }
    const handleCheckListChange = (id: number) => {
        setCheckListItems((prevState) => prevState.map(item => {
            if (item.id === id) {
                return { ...item, completed: !item.completed }
            }
            return item
        }))
    }

    return (
        <Box
            ref={formRef}
            sx={{
                width: '100%',
                maxWidth: '35rem',
                margin: 'auto',
                marginTop: '2rem',
                boxShadow: 6,
            }}
        >
            {isTitleVisible && (
                <TitleField
                    title={title}
                    handleChange={handleChange}
                    pinned={pinned}
                    togglePin={togglePin}
                />
            )}

            {typeOfNote === "note" ? (<ContentField
                content={content}
                handleChange={handleChange}
                handleContentClick={handleContentClick}
                isTitleVisible={isTitleVisible}
                setTypeOfNote={setTypeOfNote}

            />) : (<AddCheckList
                checkListRef={checkListRef}
                items={checkListItems}
                addItem={addItemsToChecklist}
                removeItem={removeItemFromChecklist}
                toggleComplete={handleCheckListChange}
            />)}


            {isTitleVisible && isAddTagVisible && (
                <TagsField
                    tags={tags}
                    setTags={setTags}
                    options={options}
                    setOptions={setOptions}
                    loading={loading}
                    error={error}
                    tagRef={tagRef}
                />
            )}
            {isTitleVisible && (
                <Actions
                    handleSave={handleSave}
                    formStatus={formStatus}
                    toggleTagVisibility={toggleTagVisibility}
                    isAddTagVisible={isAddTagVisible}
                />
            )}
        </Box>
    );
};

export default CreateNoteForm;

const TitleField = ({ title, handleChange, pinned, togglePin }: TitleFieldProps) => (
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
                    borderBottom: 'solid 1px',
                    borderColor: defaultBorderColor,
                },
            },
        }}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <Tooltip title={pinned ? 'Unpin' : 'Pin'}>
                        <IconButton
                            aria-label="toggle pin"
                            className="pin"
                            disableRipple
                            disableTouchRipple
                            sx={{
                                '& .icon-filled': {
                                    display: pinned ? 'block' : 'none',
                                },
                                '& .icon-outlined': {
                                    display: !pinned ? 'block' : 'none',
                                },
                                '&:hover .icon-filled': {
                                    display: 'block',
                                },
                                '&:hover .icon-outlined': {
                                    display: 'none',
                                },
                            }}
                            size="small"
                            onClick={togglePin}
                        >
                            <PushPin className="icon-filled" fontSize="medium" />
                            <PushPinOutlined className="icon-outlined" fontSize="medium" />
                        </IconButton>
                    </Tooltip>
                </InputAdornment>
            ),
        }}
    />
);

const ContentField = ({ setTypeOfNote, content, handleChange, handleContentClick, isTitleVisible }: ContentFieldProps) => (
    <TextField
        id="content"
        name="content"
        value={content}
        onChange={handleChange}
        onClick={handleContentClick}
        onFocus={handleContentClick}
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
                    borderBottom: 'solid 1px',
                    borderColor: defaultBorderColor,
                },
            },
        }}
        InputProps={
            !isTitleVisible
                ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip title="Add checklist">
                                <IconButton
                                    aria-label="toggle checklist"
                                    onClick={() => { setTypeOfNote("list") }}
                                >
                                    <CheckBoxOutlined />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    ),
                }
                : {}
        }
    />
);

const TagsField = ({ tags, setTags, options, setOptions, loading, error, tagRef }: TagsFieldProps) => (
    <Box ref={tagRef}>
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
);

const Actions = ({ handleSave, formStatus, toggleTagVisibility, isAddTagVisible }: ActionsProps) => (
    <Box
        sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            border: `1px solid ${defaultBorderColor}`,
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            p: 1,
        }}
    >
        <SaveButton
            color="inherit"
            variant="text"
            loading={formStatus.isSaving}
            onClick={handleSave}
        />
        <Tooltip title={isAddTagVisible ? 'Close add tag' : 'Add tags'}>
            <IconButton
                color="primary"
                size="small"
                aria-label="add-tags"
                onClick={toggleTagVisibility}
            >
                <LocalOffer />
            </IconButton>
        </Tooltip>
    </Box>
);

interface TagsOption {
    title: string;
    inputValue?: string;
}
interface TagsOption {
    title: string;
    inputValue?: string;
}

interface TitleFieldProps {
    title: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    pinned: boolean;
    togglePin: () => void;
}

interface ContentFieldProps {
    content: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setTypeOfNote: React.Dispatch<React.SetStateAction<"note" | "list">>;
    handleContentClick: () => void;
    isTitleVisible: boolean;
}

interface TagsFieldProps {
    tags: (TagsOption | string)[];
    setTags: React.Dispatch<React.SetStateAction<(TagsOption | string)[]>>;
    options: TagsOption[];
    setOptions: React.Dispatch<React.SetStateAction<TagsOption[]>>;
    loading: boolean;
    error: string | null;
    tagRef: React.RefObject<HTMLDivElement>;
}

interface ActionsProps {
    handleSave: () => void;
    formStatus: {
        isSaving: boolean;
        isSaved: boolean;
        isErrorSaving: boolean;
    };
    toggleTagVisibility: () => void;
    isAddTagVisible: boolean;
}