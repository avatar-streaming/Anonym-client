import { createSlice } from "@reduxjs/toolkit";
import { getPayload } from "../../api/server";
import { defaultOptionHelper, urlHelper } from "../../utils/fetchHelper";
import { loadingFailed, startLoading } from "../../utils/sliceHelper";

const initialState = {
  userStreaming: null,
  streamings: [],
  isLoading: false,
  err: null,
};

const streamingSlice = createSlice({
  name: "streaming",
  initialState,
  reducers: {
    fetchStreamingsStart: startLoading,
    generateStreamingStart: startLoading,
    removeStreamingStart: startLoading,
    fetchStreamingsSuccess (state, action) {
      state.streamings = action.payload;
      state.isLoading = false;
      state.err = null;
    },
    generateStreamingSuccess (state, action) {
      state.userStreaming = action.payload;
      state.isLoading = false;
      state.err = null;
    },
    removeStreamingSuccess (state, action) {
      state.userStreaming = null;
      state.isLoading = false;
      state.err = null;
    },
    fetchStreamingsFailure: loadingFailed,
  },
});

export const {
  fetchStreamingsStart,
  generateStreamingStart,
  removeStreamingStart,
  fetchStreamingsSuccess,
  generateStreamingSuccess,
  removeStreamingSuccess,
  fetchStreamingsFailure,
  generateStreamingFailure,
  removeStreamingFailure,
} = streamingSlice.actions;

export default streamingSlice.reducer;

export const fetchStreamings = () => async (dispatch) => {
  try {
    dispatch(fetchStreamingsStart());

    const url = urlHelper();
    const option = defaultOptionHelper("GET");
    const { payload } = getPayload(url, option);

    dispatch(fetchStreamingsSuccess(payload));
  } catch (err) {
    dispatch(fetchStreamingsFailure(err.toString()));
  }
};

export const generateStreaming = (streamingTitle, streamingThumnail) => async (dispatch, state) => {
  try {
    dispatch(generateStreamingStart());

    const streamingId = state().auth.userInfo["_id"];
    const url = urlHelper(`streaming/${streamingId}`);
    const option = defaultOptionHelper("POST");
    option.body = JSON.stringify({ streamingTitle, streamingThumnail });
    const { response, payload } = getPayload(url, option);

    if (response.ok) {
      dispatch(generateStreamingSuccess(payload));
    } else {
      dispatch(generateStreamingFailure("스트리밍 생성 실패"));
    }
  } catch (err) {
    dispatch(generateStreamingFailure(err.toString()));
  }
};

export const removeStreaming = () => async (dispatch, state) => {
  try {
    dispatch(removeStreamingStart());

    const streamingId = state().auth.userInfo["_id"];
    const url = urlHelper(`streaming/${streamingId}`);
    const option = defaultOptionHelper("DELETE");
    getPayload(url, option);

    dispatch(removeStreamingSuccess());
  } catch (err) {
    dispatch(removeStreamingFailure());
  }
};
