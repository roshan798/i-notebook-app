import { AxiosError } from 'axios'

export interface APIErrorResponse {
    success: boolean
    message: string
}

export interface APIError extends AxiosError {
    response?: {
        data: APIErrorResponse
    }
}
