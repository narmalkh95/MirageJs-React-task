import {createSlice} from "@reduxjs/toolkit";
import {addProductAction, getAllProductsListAction, getMyProductsListAction} from "../actions/productsActions";

const initialState = {
  list: [],
  myProductsList: [],
  isLoading: false
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllProductsListAction.pending]: (state) => {
      state.isLoading = true
    },
    [getAllProductsListAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = action.payload
    },
    [getAllProductsListAction.rejected]: (state) => {
      state.isLoading = false;
    },
    [addProductAction.pending]: (state) => {
      state.isLoading = true
    },
    [addProductAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list.push(action.payload);
      state.myProductsList.push(action.payload);
    },
    [addProductAction.rejected]: (state) => {
      state.isLoading = false;
    },
    [getMyProductsListAction.pending]: (state) => {
      state.isLoading = true
    },
    [getMyProductsListAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myProductsList = action.payload
    },
    [getMyProductsListAction.rejected]: (state) => {
      state.isLoading = false;
    },
  }
});

export default productsSlice.reducer;
