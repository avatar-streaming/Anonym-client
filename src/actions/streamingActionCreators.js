import * as actionTypes from "../constants/actionTypes";

export const fetchStreamings = () => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const result = await response.json();
    console.log(response, result)

    dispatch({
      type: actionTypes.FETCH_STREAMINGS_SUCCESS,
      payload: result.streamings,
    })
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_STREAMINGS_FAIL,
      payload: err,
    });
  }
};
