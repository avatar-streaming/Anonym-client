import _ from "lodash";
import * as actionTypes from "../constants/actionTypes";

const initialState = {
  streamings: [],
  err: null,
};

const streamingReducer = (state = initialState, action) => {
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case actionTypes.FETCH_STREAMINGS_SUCCESS:
      copiedState.streamings = action.payload;

      return copiedState;
    case actionTypes.FETCH_STREAMINGS_FAIL:
      copiedState.err = action.payload;

      return copiedState;
    default:
      return copiedState;
  }
};

export default streamingReducer;
