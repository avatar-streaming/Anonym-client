import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Router } from "react-router";
import Search from ".";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { createMemoryHistory } from "history";

describe("<Search />", () => {
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
      search: {
        searchList: [
          {
            "_id": 1,
            userName: "user 1",
            thumnail: "thumnail 1",
            followers: [],
          },
          {
            "_id": 2,
            userName: "user 2",
            thumnail: "thumnail 2",
            followers: [],
          },
        ],
      }
    });

    component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <Search />
        </Router>
      </Provider>
    );
  });

  it("should render with given state from redux store", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
