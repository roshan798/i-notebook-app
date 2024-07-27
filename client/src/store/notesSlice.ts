import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotesState, Note } from './types';

const initialState: NotesState = {
    notes: [],
    loading: true,
    error: null,
};

const notesSlice = createSlice({
    name: 'notesStore',
    initialState,
    reducers: {
        setNotes: (state, action: PayloadAction<Note[]>) => {
            state.notes = action.payload;
        },
        addNote(state, action: PayloadAction<Note>) {
            state.notes.unshift(action.payload);
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            state.notes = state.notes.map((note) => {
                if (note.id === action.payload.id) {
                    return action.payload;
                }
                return note;
            });

            state.notes = state.notes.sort((a, b) => {
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            });
        },
        pinNote: (state, action: PayloadAction<string>) => {
            const noteId = action.payload;
            state.notes = state.notes.map((note) => {
                if (note.id === noteId) {
                    const isPinned = !note.pinned;
                    return {
                        ...note,
                        pinned: isPinned,
                        pinnedAt: isPinned ? new Date().toISOString() : undefined,
                    };
                }
                return note;
            });

            state.notes = state.notes.sort((a, b) => {
                if (a.pinned && b.pinned) {
                    return new Date(b.pinnedAt!).getTime() - new Date(a.pinnedAt!).getTime();
                } else if (a.pinned && !b.pinned) {
                    return -1;
                } else if (!a.pinned && b.pinned) {
                    return 1;
                } else {
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                }
            });
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setNotes, setLoading, setError, deleteNote, updateNote, addNote, pinNote } = notesSlice.actions;

export default notesSlice.reducer;
