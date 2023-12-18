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
