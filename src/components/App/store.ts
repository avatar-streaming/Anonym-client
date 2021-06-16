import { Middleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

let middleware: [ThunkMiddleware | Middleware] = [thunk];

if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

const store = configureStore({ reducer: rootReducer, middleware });

export default store;
