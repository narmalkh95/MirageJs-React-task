import {api, HandleResponseState} from "../services/Http.Client";

export const registerUserAPI = user => api.post('user', user).then(HandleResponseState);

export const getUserAPI = (userObj) => api.get('user', {params: userObj}).then(HandleResponseState);

export const logoutUserAPI = () => api.get('user/logout').then(HandleResponseState);
