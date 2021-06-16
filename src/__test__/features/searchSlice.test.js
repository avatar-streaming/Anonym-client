import searchSlice, {
  searchUserSuccess
} from "../../features/search/searchSlice";

const initialState = {
  searchList: [],
  isLoading: false,
  err: null,
};

describe("search reducer", () => {
  it("should handle initial state", () => {
    expect(searchSlice(undefined, {})).toEqual(initialState);
  });

  it("should handle SEARCH_USER", () => {
    expect(
      searchSlice(initialState, {
        type: searchUserSuccess.type,
        payload: [{
          text: "Run the tests",
          id: 0,
        }],
      })
    ).toEqual({
      searchList: [{
        text: "Run the tests",
        id: 0,
      }],
      isLoading: false,
      err: null,
    });
  });
});
