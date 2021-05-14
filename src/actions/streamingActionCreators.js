import * as actionTypes from "../constants/actionTypes";

export const fetchStreamings = () => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER}/`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const result = await response.json();

    dispatch({
      type: actionTypes.FETCH_STREAMINGS_SUCCESS,
      payload: result.streamings,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_STREAMINGS_FAIL,
      payload: err,
    });
  }
};

export const generateStreaming = (streamingTitle) => async (dispatch, state) => {
  try {
    const streamingId = state().authReducer.userInfo["_id"];
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER}/streaming/${streamingId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          streamingTitle,
        }),
      }
    );
    const result = await response.json();
    console.log(response, result)

    if (response.ok) {
      dispatch({
        type: actionTypes.GENERATE_STREAMING_SUCESS,
        payload: result.streaming,
      });
    } else {
      dispatch({
        type: actionTypes.GENERATE_STREAMING_FAIL,
        payload: {
          status: response.status,
          message: response.statusText,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: actionTypes.GENERATE_STREAMING_FAIL,
      payload: err,
    });
  }
};

export const removeStreaming = () => async (dispatch, state) => {
  try {
    const userStreaming = state().streamingReducer.userStreaming;

    if (!userStreaming) {
      return;
    }

    const streamingId = state().authReducer.userInfo["_id"];
    await fetch(
      `${process.env.REACT_APP_USER_SERVER}/streaming/${streamingId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: actionTypes.REMOVE_STREAMING_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.REMOVE_STREAMING_FAIL,
      payload: err,
    });
  }
};
