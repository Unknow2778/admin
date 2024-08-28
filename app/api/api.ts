import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GET = async (url: string,params?: Record<string, any> ) => {
    try {
        const response = await axios.get(API_URL+url,params);
        return response.data;
    } catch (error) {
        return error;
    }
    };

export const POST = async (url: string, data: any) => {
    try {
        const response = await axios.post(API_URL + url, data);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response || 'An unknown error occurred';
        } else {
            console.error('Unexpected error', error);
            return 'An unexpected error occurred';
        }
    }
};