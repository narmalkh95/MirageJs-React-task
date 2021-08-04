import {createAsyncThunk} from "@reduxjs/toolkit";
import {addProductAPI, getAllProductsAPI} from "../../api/products.api";

export const getAllProductsListAction = createAsyncThunk(
  'products/getAll',
  async (args, thunkAPI) => {
    try {
      const res = await getAllProductsAPI();

      if (!res) {
        return thunkAPI.rejectWithValue('Error');
      }

      return thunkAPI.fulfillWithValue(res.dataList)
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getMyProductsListAction = createAsyncThunk(
  'products/getMy',
  async (args, thunkAPI) => {
    try {
      const id = thunkAPI.getState().auth.user.id;
      const res = await getAllProductsAPI(id);

      if (!res) {
        return thunkAPI.rejectWithValue('Error');
      }

      return thunkAPI.fulfillWithValue(res.dataList)
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
)

export const addProductAction = createAsyncThunk(
  'products/add',
  async (product, thunkAPI) => {
    try {
      const res = addProductAPI(product);

      if (!res) {
        return thunkAPI.rejectWithValue('Error');
      }

      thunkAPI.dispatch(getMyProductsListAction());
      return thunkAPI.fulfillWithValue(true)
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
)
