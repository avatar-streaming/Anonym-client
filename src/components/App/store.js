import thunk from "redux-thunk";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const middleware = [thunk];

if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

const store = configureStore({ reducer: rootReducer, middleware });

export default store;
