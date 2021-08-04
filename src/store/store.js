import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./reducers/authReducer";
import productsSlice from './reducers/productsReducer';
import loaderSlice from './reducers/loadingReducer';

const reducers = combineReducers({
  auth: authSlice,
  products: productsSlice,
  isLoading: loaderSlice
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === "DESTROY_SESSION") state = undefined;

  return reducers(state, action);
};

export default configureStore({
  reducer: rootReducer
});
