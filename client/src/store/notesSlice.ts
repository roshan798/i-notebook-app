import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotesState, Note } from './types';

const initialState: NotesState = {
    pinnedNotes: [],
    unpinnedNotes: [],
    loading: true,
    error: null,
};

const notesSlice = createSlice({
    name: 'notesStore',
    initialState,
    reducers: {
        setNotes: (state, action: PayloadAction<Note[]>) => {
            state.pinnedNotes = action.payload.filter(note => note.pinned).sort((a, b) => new Date(b.pinnedAt!).getTime() - new Date(a.pinnedAt!).getTime());
            state.unpinnedNotes = action.payload.filter(note => !note.pinned).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        },
        addNote: (state, action: PayloadAction<Note>) => {
            if (action.payload.pinned) {
                state.pinnedNotes.unshift(action.payload);
                state.pinnedNotes = state.pinnedNotes.sort((a, b) => new Date(b.pinnedAt!).getTime() - new Date(a.pinnedAt!).getTime());
            } else {
                state.unpinnedNotes.unshift(action.payload);
                state.unpinnedNotes = state.unpinnedNotes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            }
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            state.pinnedNotes = state.pinnedNotes.filter(note => note.id !== action.payload);
            state.unpinnedNotes = state.unpinnedNotes.filter(note => note.id !== action.payload);
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            const updatedNote = action.payload;
            if (updatedNote.pinned) {
                state.pinnedNotes = state.pinnedNotes.map(note => note.id === updatedNote.id ? updatedNote : note);
                state.pinnedNotes = state.pinnedNotes.sort((a, b) => new Date(b.pinnedAt!).getTime() - new Date(a.pinnedAt!).getTime());
            } else {
                state.unpinnedNotes = state.unpinnedNotes.map(note => note.id === updatedNote.id ? updatedNote : note);
                state.unpinnedNotes = state.unpinnedNotes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            }
        },
        pinNote: (state, action: PayloadAction<string>) => {
            const noteId = action.payload;
            const allNotes = [...state.pinnedNotes, ...state.unpinnedNotes];
            const noteToPin = allNotes.find(note => note.id === noteId);

            if (noteToPin) {
                const isPinned = !noteToPin.pinned;
                noteToPin.pinned = isPinned;
                noteToPin.pinnedAt = isPinned ? new Date().toISOString() : undefined;

                if (isPinned) {
                    state.unpinnedNotes = state.unpinnedNotes.filter(note => note.id !== noteId);
                    state.pinnedNotes.push(noteToPin);
                    state.pinnedNotes = state.pinnedNotes.sort((a, b) => new Date(b.pinnedAt!).getTime() - new Date(a.pinnedAt!).getTime());
                } else {
                    state.pinnedNotes = state.pinnedNotes.filter(note => note.id !== noteId);
                    state.unpinnedNotes.push(noteToPin);
                    state.unpinnedNotes = state.unpinnedNotes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
                }
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updateTitle: (state, action: PayloadAction<{ noteId: string; newTitle: string }>) => {
            const { noteId, newTitle } = action.payload;
            const allNotes = [...state.pinnedNotes, ...state.unpinnedNotes];
            const noteToUpdate = allNotes.find(note => note.id === noteId);

            if (noteToUpdate) {
                noteToUpdate.title = newTitle;

                if (noteToUpdate.pinned) {
                    state.pinnedNotes = state.pinnedNotes.map(note => note.id === noteId ? noteToUpdate : note);
                    state.pinnedNotes = state.pinnedNotes.sort((a, b) => new Date(b.pinnedAt!).getTime() - new Date(a.pinnedAt!).getTime());
                } else {
                    state.unpinnedNotes = state.unpinnedNotes.map(note => note.id === noteId ? noteToUpdate : note);
                    state.unpinnedNotes = state.unpinnedNotes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
                }
            }
        }
    },
});

export const { updateTitle, setNotes, setLoading, setError, deleteNote, updateNote, addNote, pinNote } = notesSlice.actions;

export default notesSlice.reducer;
