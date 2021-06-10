import { createSlice } from "@reduxjs/toolkit";
import { getPayload } from "../../api/server";
import { defaultOptionHelper, urlHelper } from "../../utils/fetchHelper";
import { loadingFailed, startLoading } from "../../utils/sliceHelper";

const initialState = {
  userInfo: null,
  isLoading: false,
  err: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserNameStart: startLoading,
    updateUserThumnailStart: startLoading,
    followUserStart: startLoading,
    unfollowUserStart: startLoading,
    updateUserNameSuccess (state, action) {
      state.userInfo = action.payload;
      state.isLoading = false;
      state.err = null;
    },
    updateUserThumnailSuccess (state, action) {
      state.userInfo = action.payload;
      state.isLoading = false;
      state.err = null;
    },
    followUserSuccess (state, action) {
      state.userInfo = action.payload;
      state.isLoading = false;
      state.err = null;
    },
    unfollowUserSuccess (state, action) {
      state.userInfo = action.payload;
      state.isLoading = false;
      state.err = null;
    },
    updateUserNameFailure: loadingFailed,
    updateUserThumnailFailure: loadingFailed,
    followUserFailure: loadingFailed,
    unfollowUserFailure: loadingFailed,
    addUserInfo (state, action) {
      state.userInfo = action.payload;
      state.isLoading = false;
      state.err = null;
    },
    removeUserInfo (state, action) {
      state.userInfo = null;
      state.isLoading = false;
      state.err = null;
    }
  },
});

export const {
  updateUserNameStart,
  updateUserThumnailStart,
  followUserStart,
  unfollowUserStart,
  updateUserNameSuccess,
  updateUserThumnailSuccess,
  followUserSuccess,
  unfollowUserSuccess,
  updateUserNameFailure,
  updateUserThumnailFailure,
  followUserFailure,
  unfollowUserFailure,
  addUserInfo,
  removeUserInfo,
} = userSlice.actions;

export default userSlice.reducer;

export const updateUserName = (userName) => async (dispatch, state) => {
  try {
    dispatch(updateUserThumnailStart());

    const userId = state().user.userInfo._id;
    const url = urlHelper(`user/userName/${userId}`);
    const option = defaultOptionHelper("PUT");
    option.body = JSON.stringify({ userName });
    const { payload } = await getPayload(url, option);

    dispatch(updateUserNameSuccess(payload));
  } catch (err) {
    dispatch(updateUserThumnailFailure(err.toString()));
  }
};

export const updateUserThumnail = (thumnail) => async (dispatch, state) => {
  try {
    dispatch(updateUserThumnailStart());

    const userId = state().user.userInfo._id;
    const url = urlHelper(`user/userThumnail/${userId}`);
    const option = defaultOptionHelper("PUT");
    option.body = JSON.stringify({ thumnail });
    const { payload } = await getPayload(url, option);

    dispatch(updateUserThumnailSuccess(payload));
  } catch (err) {
    dispatch(updateUserThumnailFailure(err.toString()));
  }
};

export const followUser = (userID, targetID) => async (dispatch) => {
  try {
    dispatch(followUserStart());

    const url = urlHelper(`user/follow/${userID}`);
    const option = defaultOptionHelper("PUT");
    option.body = JSON.stringify({ targetID });
    const { payload } = await getPayload(url, option);

    dispatch(followUserSuccess(payload));
  } catch (err) {
    dispatch(followUserFailure(err.toString()));
  }
};

export const unfollowUser = (userID, targetID) => async (dispatch) => {
  try {
    dispatch(unfollowUserStart());

    const url = urlHelper(`user/unfollow/${userID}`);
    const option = defaultOptionHelper("PUT");
    option.body = JSON.stringify({ targetID });
    const { payload } = await getPayload(url, option);

    dispatch(unfollowUserSuccess(payload));
  } catch (err) {
    dispatch(unfollowUserFailure(err.toString()));
  }
};
