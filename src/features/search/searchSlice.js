import { createSlice } from "@reduxjs/toolkit";
import { getPayload } from "../../api/server";
import { defaultOptionHelper, urlHelper } from "../../utils/fetchHelper";
import { loadingFailed, startLoading } from "../../utils/sliceHelper";

const initialState = {
  searchList: [],
  isLoading: false,
  err: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchUserStart: startLoading,
    searchUserSuccess (state, action) {
      state.searchList = action.payload;
    },
    searchUserFailure: loadingFailed,
  },
});

export const {
  searchUserStart,
  searchUserSuccess,
  searchUserFailure,
} = searchSlice.actions;

export default searchSlice.reducer;

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    dispatch(searchUserStart());

    const url = urlHelper(`search/${searchTerm}`);
    const option = defaultOptionHelper("GET");
    const { payload } = getPayload(url, option);

    dispatch(searchUserSuccess(payload));
  } catch (err) {
    dispatch(searchUserFailure(err.toString()));
  }
};
