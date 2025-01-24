import { axiosService } from '../helpers/axios';

export const FetchProducts = async () => {
    try {
        const response = await axiosService.get('/products/getproducts');
        return response.data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const createProduct = async (payload: any): Promise<any> => {
    try {
        const response = await axiosService.post('/products/addproduct', payload);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};
export const getSingleProduct = async (id: any): Promise<any> => {
    try {
        const response = await axiosService.get(`/products/getproducts/single/${id}`);

        console.log();
        return response.data.Data;
    } catch (error: any) {
        console.log(error);
        throw new Error();
    }
};

export const fetchOurProducts = async () => {
    const response = await axiosService.get('/products/getproductsdata');
    return response;
};

export const fetchOurTopsProducts = async () => {
    const response = await axiosService.get(`/products/getproductsdata?top='top'`);
    return response;
};

export const fetchOurSponseredProducts = async () => {
    const response = await axiosService.get(`/products/getproductsdata?sponsered='sponsered'`);
    return response;
};

export const searchOurProducts = async (param: any) => {
    console.log(param);
    const response = await axiosService.get(`/products/getproductsdata?search=${param}`);
    return response;
};

export const fetchOurSingleProduct = async (id: any) => {
    // Your API call using Axios
    const response = await axiosService.get(`/products/getads/single/${id}`);
    return response;
};

export const fetchSingle = async (id: any) => {
    // Your API call using Axios
    const response = await axiosService.get(`/products/getproducts/single/${id}`);
    return response;
};

export const fetchSellersProduct = async (id: any) => {
    // Your API call using Axios
    const response = await axiosService.get(`/products/getads/singleuserads?id=${id}`);
    return response;
};

export const fetchLoggedUsersProducts = async (id: any) => {
    // Your API call using Axios
    const response = await axiosService.get(`products/getproducts/singleuserproduct?id=${id}`);
    return response;
};

export const RejectProduct = async (id: string): Promise<any> => {
    try {
        const response = await axiosService.post(`/products/deactivate?id=${id}`);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const ActivateProduct = async (id: string): Promise<any> => {
    try {
        const response = await axiosService.post(`/products/activate?id='${id}'`);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};
export const DeactivateProduct = async (id: string): Promise<any> => {
    try {
        const response = await axiosService.post(`/products/deactivate?id='${id}'`);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const DeleteProduct = async (id: string): Promise<any> => {
    try {
        const response = await axiosService.post(`/products/deleteproduct?id='${id}'`);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const RestoreProduct = async (id: string): Promise<any> => {
    try {
        const response = await axiosService.post(`/products/restore?id='${id}'`);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const UpdateProduct = async (id: string, payload: any): Promise<any> => {
    try {
        const response = await axiosService.post(`/products/updateproduct?id='${id}'`, payload);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};
