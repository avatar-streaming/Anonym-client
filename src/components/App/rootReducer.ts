import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import userReducer from "../../features/user/userSlice";
import searchReducer from "../../features/search/searchSlice";
import streamingSlice from "../../features/streaming/streamingSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  streaming: streamingSlice,
  search: searchReducer,
});

export default rootReducer;
