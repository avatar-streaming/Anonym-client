import authSlice, {
  checkAuthorizationSuccess,
  userLoginSuccess,
  userLogoutSuccess,
} from "./authSlice";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  err: null,
};

describe("auth reducer", () => {
  it("should handle initial state", () => {
    expect(authSlice(undefined, {})).toEqual(initialState);
  });

  it("should handle CHECK_AUTHORIZATION_SUCCESS", () => {
    expect(
      authSlice(initialState, {
        type: checkAuthorizationSuccess.type,
      })
    ).toEqual({
      isAuthenticated: true,
      isLoading: false,
      err: null,
    });
  });

  it("should handle USER_LOGIN_SUCCESS", () => {
    expect(
      authSlice(initialState, {
        type: userLoginSuccess.type,
      })
    ).toEqual({
      isAuthenticated: true,
      isLoading: false,
      err: null,
    });
  });

  it("should handle USER_LOGOUT_SUCCEESS", () => {
    const mockState = {
      isAuthenticated: true,
      isLoading: false,
      err: null,
    };

    expect(
      authSlice(mockState, {
        type: userLogoutSuccess.type,
      })
    ).toEqual({
      isAuthenticated: false,
      isLoading: false,
      err: null,
    });
  });
});
