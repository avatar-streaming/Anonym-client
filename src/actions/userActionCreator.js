import * as actionTypes from "../constants/actionTypes";

export const updateUserName = (userName) => async (dispatch, state) => {
  try {
    const userId = state().authReducer.userInfo._id;
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER}/user/${userId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
        }),
      },
    );
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
