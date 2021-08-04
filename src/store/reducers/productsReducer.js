import {createSlice} from "@reduxjs/toolkit";
import {getAllProductsListAction, getMyProductsListAction} from "../actions/productsActions";

const initialState = {
  list: [],
  myProductsList: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllProductsListAction.fulfilled]: (state, action) => {
      state.list = action.payload
    },
    [getMyProductsListAction.fulfilled]: (state, action) => {
      state.myProductsList = action.payload
    },
  }
});

export default productsSlice.reducer;
