import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createNote, getTags } from '../../../../http/notes';
import { useNotification } from '../../../../contexts/NotificationContext';
import { addNote } from '../../../../store/notesSlice';
import { notifications } from '../../../../utils/notificationMessages';
import { APIError } from '../../../../types/api';
import AddCheckList from '../../addChecklist/AddCheckList';

import type { ChecklistItem } from "../../../../store/types";
import { TagsOption } from './TagsField';

// Lazy-loaded components
const TitleField = React.lazy(() => import('./TittleField'));
const ContentField = React.lazy(() => import('./ContentField'));
const TagsField = React.lazy(() => import('./TagsField'));
const Actions = React.lazy(() => import('./Actions'));

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
    const [checkListItems, setCheckListItems] = useState<ChecklistItem[]>([]);
    const [formData, setFormData] = useState(initialFormData);
    const { title, content, pinned } = formData;
    const formRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const checkListRef = useRef<HTMLDivElement>(null);
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
            setFormStatus((prevState) => ({ ...prevState, isSaving: false }));
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
                setTypeOfNote("note");
                setCheckListItems([]);
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
        setCheckListItems((prevState) => [item, ...prevState]);
    };

    const removeItemFromChecklist = (id: number) => {
        setCheckListItems((prevState) => prevState.filter(item => item.id !== id));
    };

    const handleCheckListChange = (id: number) => {
        setCheckListItems((prevState) => prevState.map(item => {
            if (item.id === id) {
                return { ...item, completed: !item.completed };
            }
            return item;
        }));
    };

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
            <Suspense fallback={<CircularProgress />}>
                {isTitleVisible && (
                    <TitleField
                        title={title}
                        handleChange={handleChange}
                        pinned={pinned}
                        togglePin={togglePin}
                    />
                )}

                {typeOfNote === "note" ? (
                    <ContentField
                        content={content}
                        handleChange={handleChange}
                        handleContentClick={handleContentClick}
                        isTitleVisible={isTitleVisible}
                        setTypeOfNote={setTypeOfNote}
                    />
                ) : (
                    <AddCheckList
                        checkListRef={checkListRef}
                        items={checkListItems}
                        addItem={addItemsToChecklist}
                        removeItem={removeItemFromChecklist}
                        toggleComplete={handleCheckListChange}
                    />
                )}

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
            </Suspense>
        </Box>
    );
};

export default CreateNoteForm;
