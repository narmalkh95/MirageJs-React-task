import {getUserAction} from "../actions/authActions";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserAction.fulfilled]: (state, action) => {
      state.user = action.payload;
    }
  }
});

export default authSlice.reducer;
