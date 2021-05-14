import _ from "lodash";
import * as actionTypes from "../constants/actionTypes";

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  err: null,
};

const authReducer = (state = initialState, action) => {
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case actionTypes.AUTHORIZATION_SUCCESS:
    case actionTypes.LOG_IN_SUCCESS:
      copiedState.isAuthenticated = true;
      copiedState.userInfo = action.payload;

      return copiedState;
    case actionTypes.AUTHORIZATION_FAIL:
    case actionTypes.LOG_IN_FAIL:
    case actionTypes.LOG_OUT_SUCCESS:
      copiedState.isAuthenticated = false;
      copiedState.err = action.payload;
      copiedState.userInfo = null;

      return copiedState;
    case actionTypes.UPDATE_USER_NAME_SUCCESS:
      copiedState.userInfo = action.payload;

      return copiedState;
    case actionTypes.UPDATE_USER_NAME_FAIL:
      copiedState.err = action.payload;

      return copiedState;
    default:
      return copiedState;
  }
};

export default authReducer;
