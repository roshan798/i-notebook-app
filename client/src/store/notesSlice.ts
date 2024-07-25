import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotesState, Note } from './types';
// Define the state type


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
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        }
    },
});

export const { setNotes, setLoading, setError, deleteNote, updateNote, addNote } = notesSlice.actions;

export default notesSlice.reducer;
