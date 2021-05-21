import { defaultOptionHelper, urlHelper } from "../utils/fetchHelper";
import * as actionTypes from "../constants/actionTypes";

export const updateUserName = (userName) => async (dispatch, state) => {
  try {
    const userId = state().auth.userInfo._id;
    const url = urlHelper(`user/${userId}`);
    const option = defaultOptionHelper("PUT");
    option.body = JSON.stringify({ userName });

    const response = await fetch(url, option);
    const result = await response.json();

    dispatch({
      type: actionTypes.UPDATE_USER_NAME_SUCCESS,
      payload: result.user,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.UPDATE_USER_NAME_FAIL,
      payload: err,
    });
  }
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const url = urlHelper(`search/${searchTerm}`);
    const option = defaultOptionHelper("GET");

    const response = await fetch(url, option);
    const result = await response.json();

    dispatch({
      type: actionTypes.SEARCH_USERS_SUCCESS,
      payload: result.userList,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.SEARCH_USERS_FAIL,
      payload: err,
    });
  }
};
