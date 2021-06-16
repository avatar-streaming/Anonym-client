import streamingSlice, {
  fetchStreamingsSuccess,
  generateStreamingSuccess,
  removeStreamingSuccess,
} from "../../features/streaming/streamingSlice";

const initialState = {
  userStreaming: null,
  streamings: [],
  isLoading: false,
  err: null,
};

describe("streaming reducer", () => {
  it("should handle initial state", () => {
    expect(streamingSlice(undefined, {})).toEqual(initialState);
  });

  it("should handle FETCH_STREAMINGS_SUCCESS", () => {
    expect(
      streamingSlice(initialState, {
        type: fetchStreamingsSuccess.type,
        payload: [{
          text: "Run the tests",
          id: 0,
        }],
      })
    ).toEqual({
      userStreaming: null,
      streamings: [{
        text: "Run the tests",
        id: 0,
      }],
      isLoading: false,
      err: null,
    });
  });

  it("should handle GENERATE_STREAMING_SUCCESS", () => {
    expect(
      streamingSlice(initialState, {
        type: generateStreamingSuccess.type,
        payload: [{
          text: "Run the tests",
          id: 1,
        }],
      })
    ).toEqual({
      userStreaming: [{
        text: "Run the tests",
        id: 1,
      }],
      streamings: [],
      isLoading: false,
      err: null,
    });
  });

  it("should handle REMOVE_STREAMINGS_SUCCESS", () => {
    const mockState = {
      userStreaming: [{
        text: "Run the tests",
        id: 2,
      }],
      streamings: [],
      isLoading: false,
      err: null,
    };

    expect(
      streamingSlice(mockState, {
        type: removeStreamingSuccess.type,
      })
    ).toEqual({
      userStreaming: null,
      streamings: [],
      isLoading: false,
      err: null,
    });
  });
});
