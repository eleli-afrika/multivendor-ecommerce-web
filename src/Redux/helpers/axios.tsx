import axios from 'axios';

export const axiosService = axios.create({
    // baseURL: 'https://api.eduka.co.ke',
     baseURL: 'https://ecommerce.eleliafrika.cloud',
    // baseURL: 'http://localhost:8000',
    // baseURL: 'http://194.195.215.228:8082',
});

axiosService.interceptors.request.use(async (req) => {
    let token = localStorage.getItem('userToken');
    if (token) {
        req.headers['x-access-token'] = token;
    }
    return req;
});
