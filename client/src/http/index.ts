import axios from 'axios'
import config from '../configs/config'

export const getApiInstance = (path: string) => {
    return axios.create({
        baseURL: config.getAPIURL() + path,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
}
export interface ApiResponse {
    success: boolean
}
