import axios from 'axios';

export const axiosService = axios.create({
    // baseURL: 'https://eleliafrika.com:8000',
    baseURL: 'http://192.168.0.112:8000',
});

axiosService.interceptors.request.use(async (req) => {
    let token = localStorage.getItem('userToken');
    if (token) {
        req.headers['x-access-token'] = token;
    }
    return req;
});
