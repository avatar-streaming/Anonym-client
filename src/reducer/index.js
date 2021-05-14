import { combineReducers } from "redux";
import authReducer from "./authReducer";
import streamingReducer from "./streamingReducer";
import searchReducer from "./searchReducer";

const reducer = combineReducers({
  authReducer,
  streamingReducer,
  searchReducer,
});

export default reducer;
