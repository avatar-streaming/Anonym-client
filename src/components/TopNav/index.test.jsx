import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Router } from "react-router";
import TopNav from ".";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { createMemoryHistory } from "history";

describe("<TopNav />", () => {
  const mockStore = configureMockStore([thunk]);
  const history = createMemoryHistory();
  let store = null;
  let component = null;

  beforeEach(() => {
    store = mockStore({
      user: {
        userInfo: {
          "_id": 0,
          userName: "user 0",
          thumnail: "thumnail 0",
          followers: [],
        },
      },
    });

    component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <TopNav />
        </Router>
      </Provider>
    );
  });

  it("should render with given state from redux store", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
