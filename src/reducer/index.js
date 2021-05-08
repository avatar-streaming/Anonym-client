import { combineReducers } from "redux";
import authReducer from "./authReducer";
import streamingReducer from "./streamingReducer";

const reducer = combineReducers({
  authReducer,
  streamingReducer,
});

export default reducer;
