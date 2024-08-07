import { getApiInstance } from '.'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../configs/config';
import {
    CreateNoteResponse,
    GetNoteResponse,
    GetNotesResponse,
    UpdateNoteResponse,
} from '../store/types'

import { CreateNoteBody, Note } from '../store/types'
import { ChecklistItem } from "../store/types";

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
    field: "title" | "content" | "pinned" | "color"
    value: string | boolean
}

export const updateOneField = async (noteId: string, data: UpdateOneFieldData): Promise<UpdateNoteResponse> => {
    const response = await api.put<UpdateNoteResponse>(`/${noteId}/one`, data)
    return response.data
}

export const changeColor = async (noteId: string, data: { color: string }): Promise<UpdateNoteResponse> => {
    const response = await api.patch(`/${noteId}/color`, data)
    return response.data;
}

// to update the checklist items state to completed / uncompleted
interface UpdateChecklistResponse extends UpdateNoteResponse {
    updatedNote: Note
}
export const updateChecklist = async (noteId: string, data: ChecklistItem): Promise<UpdateChecklistResponse> => {
    const response = await api.put(`/${noteId}/checklist`, data)
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


api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    async (error: AxiosError): Promise<AxiosResponse | never> => {
        const originalRequest = error.config as AxiosRequestConfig & { _isRetry?: boolean };

        if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                await axios.get(`${config.getAPIURL()}/auth/refresh`, {
                    withCredentials: true
                });
                return api.request(originalRequest);
            } catch (refreshError) {
                console.log("Interceptor Error", refreshError);
            }
        }

        return Promise.reject(error);
    }
);