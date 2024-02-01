import axios from 'axios';

export const axiosService = axios.create({
    baseURL: 'https://dev.eleliafrika.com',
    // baseURL: 'http://localhost:8000',
    // baseURL: 'https://34.93.14.27:8000',
});

axiosService.interceptors.request.use(async (req) => {
    let token = localStorage.getItem('userToken');
    if (token) {
        req.headers['x-access-token'] = token;
    }
    return req;
});
