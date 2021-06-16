import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Login from "../../components/Login";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";

describe("<Login />", () => {
  const mockStore = configureMockStore([thunk]);
  let store = null;
  let component = null;

  beforeEach(() => {
    store = mockStore({
      user: {
        userInfo: {
          userName: "mock name 1",
          thumnail: "mock thumnail 1",
        },
      },
    });
    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });

  it("should render with given state from redux store", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should login", () => {
    const loginButton = component.root.findByProps({ "data-testid": "login" });
    let count = 0;

    expect(count).toEqual(0);

    renderer.act(() => {
      loginButton.props.onClick({
        buttonCount: count++
      });
    });
    expect(count).toEqual(1);
  });
});
