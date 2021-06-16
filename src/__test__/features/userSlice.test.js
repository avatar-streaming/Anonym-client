import userSlice, {
  updateUserNameSuccess,
  updateUserThumnailSuccess,
  followUserSuccess,
  unfollowUserSuccess,
  addUserInfo,
  removeUserInfo,
} from "../../features/user/userSlice";

const initialState = {
  userInfo: null,
  isLoading: false,
  err: null,
};

describe("user reducer", () => {
  it("should handle initial state", () => {
    expect(userSlice(undefined, {})).toEqual(initialState);
  });

  it("should handle UPDATE_USER_NAME", () => {
    expect(
      userSlice(initialState, {
        type: updateUserNameSuccess.type,
        payload: {
          text: "Run the tests",
          id: 0,
        }
      })
    ).toEqual({
      userInfo: {
        text: "Run the tests",
        id: 0,
      },
      isLoading: false,
      err: null,
    });
  });

  it("should handle UPDATE_USER_THUMNAIL", () => {
    expect(
      userSlice(initialState, {
        type: updateUserThumnailSuccess.type,
        payload: {
          text: "Run the tests",
          id: 1,
        }
      })
    ).toEqual({
      userInfo: {
        text: "Run the tests",
        id: 1,
      },
      isLoading: false,
      err: null,
    });
  });

  it("should handle FOLLOW_USER", () => {
    expect(
      userSlice(initialState, {
        type: followUserSuccess.type,
        payload: {
          text: "Run the tests",
          id: 2,
        }
      })
    ).toEqual({
      userInfo: {
        text: "Run the tests",
        id: 2,
      },
      isLoading: false,
      err: null,
    });
  });

  it("should handle UNFOLLOW_USER", () => {
    expect(
      userSlice(initialState, {
        type: unfollowUserSuccess.type,
        payload: {
          text: "Run the tests",
          id: 3,
        }
      })
    ).toEqual({
      userInfo: {
        text: "Run the tests",
        id: 3,
      },
      isLoading: false,
      err: null,
    });
  });

  it("should handle ADD_USER_INFO", () => {
    expect(
      userSlice(initialState, {
        type: addUserInfo.type,
        payload: {
          text: "Run the tests",
          id: 4,
        }
      })
    ).toEqual({
      userInfo: {
        text: "Run the tests",
        id: 4,
      },
      isLoading: false,
      err: null,
    });
  });

  it("should handle REMOVE_USER_INFO", () => {
    const mockState = {
      userInfo: {
        text: "Run the tests",
        id: 5,
      },
      isLoading: false,
      err: null,
    };

    expect(
      userSlice(mockState, {
        type: removeUserInfo.type,
      })
    ).toEqual({
      userInfo: null,
      isLoading: false,
      err: null,
    });
  });
});
