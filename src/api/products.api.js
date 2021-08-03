import {api, HandleResponseState} from "../services/Http.Client";

export const getAllProductsAPI = (id = '') => api.get('products', {params: {id}}).then(HandleResponseState);

export const addProductAPI = (productObj) => api.post('products', productObj).then(HandleResponseState);
