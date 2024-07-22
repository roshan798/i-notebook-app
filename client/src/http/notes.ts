// http/notes.ts
import { getApiInstance } from ".";
import { CreateNoteBody, CreateNoteResponse, GetNotesResponse, GetNoteResponse } from "../types/notes";

const api = getApiInstance("/notes");

export const createNote = async (data: CreateNoteBody): Promise<CreateNoteResponse> => {
    const response = await api.post<CreateNoteResponse>("/", data);
    return response.data;
};

export const getNotes = async (): Promise<GetNotesResponse> => {
    const response = await api.get<GetNotesResponse>("/");
    return response.data;
};

export const getNote = async (id: string): Promise<GetNoteResponse> => {
    const response = await api.get<GetNoteResponse>(`/${id}`);
    return response.data;
};
