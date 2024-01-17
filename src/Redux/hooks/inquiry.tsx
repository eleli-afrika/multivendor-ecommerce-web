import axios from 'axios';
const url = 'http://localhost:5000/inquiries';

export const createInquiry = async (payload: any): Promise<any> => {
    try {
        const response = await axios.post(`${url}/inquire`, payload);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const GetInquiries = async (): Promise<any> => {
    try {
        const response = await axios.get(`${url}/all`);
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const GetInquiry = async (id: any): Promise<any> => {
    try {
        const response = await axios.get(`${url}/inquiry/${id}`);
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};
