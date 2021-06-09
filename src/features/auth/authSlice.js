import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { getPayload } from "../../api/server";
import { defaultOptionHelper, urlHelper } from "../../utils/fetchHelper";
import { loadingFailed, startLoading } from "../../utils/sliceHelper";
import { addUserInfo, removeUserInfo } from "../user/userSlice";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  err: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuthorizationStart: startLoading,
    userLoginStart: startLoading,
    userLogoutStart: startLoading,
    checkAuthorizationSuccess (state) {
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    userLoginSuccess (state) {
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    userLogoutSuccess (state) {
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    checkAuthorizationFailure: loadingFailed,
    userLoginFailure: loadingFailed,
    userLogoutFailure: loadingFailed,
  },
});

export const {
  checkAuthorizationStart,
  userLoginStart,
  userLogoutStart,
  checkAuthorizationSuccess,
  userLoginSuccess,
  userLogoutSuccess,
  checkAuthorizationFailure,
  userLoginFailure,
  userLogoutFailure,
} = authSlice.actions;

export default authSlice.reducer;

export const checkAuthorization = () => async (dispatch) => {
  const cookies = new Cookies();

  try {
    dispatch(checkAuthorizationStart());

    const token = cookies.get("jwt");
    const url = urlHelper("auth/check");
    const option = defaultOptionHelper("POST");
    option.headers.Authentication = `bearer ${token}`;
    const { response, payload } = getPayload(url, option);

    if (response.ok) {
      dispatch(checkAuthorizationSuccess());
      dispatch(addUserInfo(payload));

      return;
    }

    cookies.remove("jwt");
    dispatch(checkAuthorizationFailure("Auth Fail"));
    dispatch(removeUserInfo());
  } catch (err) {
    cookies.remove("jwt");
    dispatch(checkAuthorizationFailure(err.toString()));
  }
};

export const userLogin = (userInfo) => async (dispatch) => {
  try {
    dispatch(userLoginStart());

    const url = urlHelper("auth/login");
    const option = defaultOptionHelper("POST");
    option.body = JSON.stringify(userInfo);
    const { payload } = getPayload(url, option);

    dispatch(userLoginSuccess());
    dispatch(addUserInfo(payload));
  } catch (err) {
    dispatch(userLoginFailure(err.toString()));
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    dispatch(userLogoutStart());

    const url = urlHelper("auth/logout");
    const option = defaultOptionHelper("GET");
    const { response } = getPayload(url, option);

    if (response.ok) {
      dispatch(userLogoutSuccess());
      dispatch(removeUserInfo());
    }
  } catch (err) {
    dispatch(userLogoutFailure(err.toString()));
  }
};
