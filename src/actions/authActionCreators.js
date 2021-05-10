import Cookies from "universal-cookie";
import * as actionTypes from "../constants/actionTypes";

export const checkAuthorization = () => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("jwt");
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER}/auth/check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authentication": `bearer ${token}`,
        },
      },
    );
    const result = await response.json();

    if (result.message === "Authorization Success") {
      dispatch({
        type: actionTypes.AUTHORIZATION_SUCCESS,
        payload: result.user,
      });

      return;
    }

    dispatch({
      type: actionTypes.AUTHORIZATION_FAIL,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.AUTHORIZATION_FAIL,
      payload: err,
    });
  }
};

export const userLogin = (userInfo) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER}/auth/login`,
      {
        method: "POST",
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      },
    );
    const result = await response.json();

    dispatch({
      type: actionTypes.LOG_IN_SUCCESS,
      payload: result.user,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.LOG_IN_FAIL,
      payload: err,
    });
  }
};
