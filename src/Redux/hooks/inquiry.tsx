import { axiosService } from '../helpers/axios';
import { toast } from 'react-toastify';
const basePath = '/inquiries';

export const createInquiry = async (payload: any): Promise<any> => {
    try {
        const response = await axiosService.post(`${basePath}/inquire`, payload);
        toast.success('Your inquiry has been sent...');
        return response;
    } catch (error: any) {
        toast.error('Please fill in all the fields');
        console.error(error);
        throw new Error();
    }
};

export const GetInquiries = async (): Promise<any> => {
    try {
        const response = await axiosService.get(`${basePath}/user`);
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const GetInquiry = async (id: any): Promise<any> => {
    try {
        const response = await axiosService.get(`${basePath}/inquiry/${id}`);
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const MarkAsRead = async (id: any): Promise<any> => {
    try {
        const response = await axiosService.patch(`${basePath}/read/${id}`);
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const DeleteInquiry = async (id: any): Promise<any> => {
    try {
        const response = await axiosService.delete(`${basePath}/${id}`);
        toast.success('Deleted successfully...');
        return response.data;
    } catch (error: any) {
        toast.success('Error deleting');
        console.error(error);
        throw new Error();
    }
};
