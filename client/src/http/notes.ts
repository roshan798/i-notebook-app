import { getApiInstance } from '.'
import {
    CreateNoteResponse,
    GetNoteResponse,
    GetNotesResponse,
    UpdateNoteResponse,
} from '../store/types'
import { CreateNoteBody, Note } from '../store/types'

const api = getApiInstance('/notes')

export const createNote = async (
    data: CreateNoteBody
): Promise<CreateNoteResponse> => {
    console.log(data);
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
export const updateNote = async (
    noteId: string,
    data: CreateNoteBody
): Promise<CreateNoteResponse> => {
    const response = await api.put<CreateNoteResponse>(`/${noteId}`, data)
    return response.data
}
export interface PinNoteResponse {
    success: boolean
}
export const pinNote = async (noteId: string, data: { pin: boolean }): Promise<PinNoteResponse> => {
    const response = await api.put<PinNoteResponse>(`/${noteId}/pin`, data)
    return response.data
}

interface UpdateOneFieldData {
    field: "title" | "content" | "pinned"
    value: string | boolean
}

export const updateOneField = async (noteId: string, data: UpdateOneFieldData): Promise<UpdateNoteResponse> => {
    const response = await api.put<UpdateNoteResponse>(`/${noteId}/one`, data)
    return response.data
}












interface TagsOptions {
    title: string
    inputValue?: string
}

// Assuming this is just a placeholder for mock data
const result: TagsOptions[] = []

// dummy function in future will use api calls for suggestions
export const getTags = async (): Promise<TagsOptions[]> => {
    const response: { data: TagsOptions[] } = await new Promise((resolve) => {
        resolve({ data: result })
        // use setTimeout to simulate a delay
    })
    return response.data as TagsOptions[]
}

export const tagSuggestions = async (
    inputValue: string
): Promise<TagsOptions[]> => {
    const response = await api.get<TagsOptions[]>(`/tags?query=${inputValue}`)
    return response.data
}
