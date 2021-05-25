import { defaultOptionHelper, urlHelper } from "../utils/fetchHelper";
import * as actionTypes from "../constants/actionTypes";

export const updateUserName = (userName) => async (dispatch, state) => {
  try {
    const userId = state().auth.userInfo._id;
    const url = urlHelper(`user/userName/${userId}`);
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

export const searchUsers = (searchTerm) => async (dispatch, state) => {
  try {
    const currentUser = state().auth.userInfo.userName;
    const url = urlHelper(`search/${searchTerm}`);
    const option = defaultOptionHelper("GET");

    const response = await fetch(url, option);
    const result = await response.json();
    const userList = result.userList.filter((user) => user.userName !== currentUser);

    dispatch({
      type: actionTypes.SEARCH_USERS_SUCCESS,
      payload: userList,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.SEARCH_USERS_FAIL,
      payload: err,
    });
  }
};

export const followUser = (userID, targetID) => async (dispatch) => {
  try {
    const url = urlHelper(`user/follow/${userID}`);
    const option = defaultOptionHelper("PUT");
    option.body = JSON.stringify({ targetID });

    const response = await fetch(url, option);
    const result = await response.json();

    dispatch({
      type: actionTypes.FOLLOW_USER_SUCCESS,
      payload: result.currentUser,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FOLLOW_USER_FAIL,
      payload: err,
    });
  }
};
