import _ from "lodash";
import * as actionTypes from "../constants/actionTypes";

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  err: null,
};

const reducer = (state = initialState, action) => {
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case actionTypes.LOG_IN_SUCCESS:
      copiedState.isAuthenticated = true;
      copiedState.userInfo = action.payload;

      return copiedState;
    case actionTypes.LOG_IN_FAIL:
      copiedState.err = action.payload;

      return copiedState;
    case actionTypes.AUTHORIZATION_SUCCESS:
      copiedState.isAuthenticated = true;

      return copiedState;
    case actionTypes.AUTHORIZATION_FAIL:
      copiedState.isAuthenticated = false;

      return copiedState;
    default:
      return copiedState;
  }
};

export default reducer;
