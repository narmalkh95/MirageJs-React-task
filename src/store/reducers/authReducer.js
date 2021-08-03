import {getUserAction, logoutUserAction, registerUserAction} from "../actions/authActions";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [registerUserAction.pending]: (state) => {
      state.isLoading = true
    },
    [registerUserAction.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [registerUserAction.rejected]: (state) => {
      state.isLoading = false;
    },
    [getUserAction.pending]: (state) => {
      state.isLoading = true
    },
    [getUserAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [getUserAction.rejected]: (state) => {
      state.isLoading = false;
    },
    [logoutUserAction.pending]: (state,) => {
      state.isLoading = true
    },
    [logoutUserAction.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [logoutUserAction.rejected]: (state) => {
      state.isLoading = false;
    },

  }
});

export default authSlice.reducer;
