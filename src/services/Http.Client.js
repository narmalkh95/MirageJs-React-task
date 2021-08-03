import {messageType, showMessage} from "./utilities";
import axios from "axios";

const baseURL = process.env.REACT_APP_ServerUrl;

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {'Content-Type': 'application/json, text/plain, */*'}
});
api.CancelToken = axios.CancelToken;
api.isCancel = axios.isCancel;

export const HandleResponseState = res => {
  const err = res?.data?.error
  if (err) {
    showMessage(messageType.error, typeof err === 'string' ? err : 'Something went wrong!');
    return false
  }

  return res.data
};
