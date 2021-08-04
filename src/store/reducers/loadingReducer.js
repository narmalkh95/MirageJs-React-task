import {createSlice} from "@reduxjs/toolkit";
import {getUserAction, logoutUserAction, registerUserAction} from "../actions/authActions";
import {addProductAction, getAllProductsListAction, getMyProductsListAction} from "../actions/productsActions";

const loaderSlice = createSlice({
    name: 'isLoading',
    initialState: 0,
    reducers: {},
    extraReducers: {
        [registerUserAction.pending]: state => ++state,
        [registerUserAction.fulfilled]: state => --state,
        [registerUserAction.rejected]: state => --state,
        [getUserAction.pending]: state => ++state,
        [getUserAction.fulfilled]: state => --state,
        [getUserAction.rejected]: state => --state,
        [logoutUserAction.pending]: state => ++state,
        [logoutUserAction.rejected]: state => --state,
        [getAllProductsListAction.pending]: state => ++state,
        [getAllProductsListAction.fulfilled]: state => --state,
        [getAllProductsListAction.rejected]: state => --state,
        [addProductAction.pending]: state => ++state,
        [addProductAction.fulfilled]: state => --state,
        [addProductAction.rejected]: state => --state,
        [getMyProductsListAction.pending]: state => ++state,
        [getMyProductsListAction.fulfilled]: state => --state,
        [getMyProductsListAction.rejected]: state => --state,
    }
})

export default loaderSlice.reducer;
