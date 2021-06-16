import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Router } from "react-router";
import Home from "../../components/Home";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { createMemoryHistory } from "history";

describe("<Home />", () => {
  const mockStore = configureMockStore([thunk]);
  const history = createMemoryHistory();
  let store = null;
  let component = null;

  beforeEach(() => {
    store = mockStore({
      streaming: {
        userStreaming: null,
        streamings: [],
        isLoading: false,
        err: null,
      },
    });

    component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <Home />
        </Router>
      </Provider>
    );
  });

  it("should render with given state from redux store", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
