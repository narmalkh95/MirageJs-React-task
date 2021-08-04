import {createAsyncThunk} from "@reduxjs/toolkit";
import {getUserAPI, logoutUserAPI, registerUserAPI} from "../../api/auth.api";
import {api} from "../../services/Http.Client";

export const registerUserAction = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      const res = await registerUserAPI(user);

      if (!res) {
        return thunkAPI.rejectWithValue('Error');
      }
      return thunkAPI.fulfillWithValue(res)
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getUserAction = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      let res = await getUserAPI(user);
      res = res?.data;

      if (!res || !res?.id) {
        localStorage.removeItem('authToken');
        return thunkAPI.rejectWithValue('Error');
      }

      const alreadyLoggedUserToken = user?.token;

      if (alreadyLoggedUserToken) {
        api.defaults.headers = {authentication: alreadyLoggedUserToken};
      } else if (res.token) {
        localStorage.setItem('authToken', res.token);
        api.defaults.headers = {authentication: res.token};
        delete res.token;
      }

      return thunkAPI.fulfillWithValue(res)
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
)

export const logoutUserAction = createAsyncThunk(
  'auth/logout',
  async (args, thunkAPI) => {
    try {
      const res = await logoutUserAPI();

      if (!res) {
        return thunkAPI.rejectWithValue('Error');
      }

      localStorage.removeItem('authToken');
      return thunkAPI.dispatch({type: 'DESTROY_SESSION'});
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
)
