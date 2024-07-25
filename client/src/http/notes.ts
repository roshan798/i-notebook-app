// http/notes.ts
import { getApiInstance } from '.'
import {
    CreateNoteResponse,
    GetNoteResponse,
    GetNotesResponse,
} from '../store/types'
import { CreateNoteBody, Note } from '../store/types'

const api = getApiInstance('/notes')

export const createNote = async (
    data: CreateNoteBody
): Promise<CreateNoteResponse> => {
    const response = await api.post<CreateNoteResponse>('/', data)
    return response.data
}

export const getNotes = async (): Promise<GetNotesResponse> => {
    const response = await api.get<GetNotesResponse>('/')
    return response.data
}

export const getNote = async (id: string): Promise<GetNoteResponse> => {
    const response = await api.get<GetNoteResponse>(`/${id}`)
    return response.data
}

interface DeleteNoteResponse {
    success: boolean,
    message: string,
    deletedNote?: Note

}
export const deleteNote = async (noteId: string): Promise<DeleteNoteResponse> => {
    const response = await api.delete(`/${noteId}`)
    return response.data
}

interface FilmOption {
    title: string
    inputValue?: string
}

// Assuming this is just a placeholder for mock data
const result: FilmOption[] = []

// dummy function in future will use api calls for suggestions
export const getTags = async (): Promise<FilmOption[]> => {
    const response: { data: FilmOption[] } = await new Promise((resolve) => {
        resolve({ data: result })
        // use setTimeout to simulate a delay
    })
    return response.data as FilmOption[]
}

export const tagSuggestions = async (
    inputValue: string
): Promise<FilmOption[]> => {
    const response = await api.get<FilmOption[]>(`/tags?query=${inputValue}`)
    return response.data
}
