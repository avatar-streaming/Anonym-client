import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import UserDetail from ".";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";

describe("<UserDetail />", () => {
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
        <UserDetail />
      </Provider>
    );
  });

  it("should render with given state from redux store", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should update user thumnail", () => {
    const userThumnailInput = component.root.findByProps({ type: "file" });
    const userThumnailButton = component.root.findByProps({ "data-testid": "thumnail" });

    renderer.act(() => {
      userThumnailInput.props.onChange({
        target: {
          value: "mock thumnail 2",
        },
      });
    });
    expect(component.toJSON()).toMatchSnapshot();

    renderer.act(() => {
      userThumnailButton.props.onClick({
        preventDefault: jest.fn(),
        isUpdateUserThumnail: store.dispatch(),
      });
    });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it("should update user name", () => {
    const userNameInput = component.root.findByProps({ type: "text" });
    const userNameButton = component.root.findByProps({ "data-testid": "name" });

    renderer.act(() => {
      userNameInput.props.onChange({
        target: {
          value: "mock name 2 ",
        },
      });
    });
    expect(component.toJSON()).toMatchSnapshot();

    renderer.act(() => {
      userNameButton.props.onClick({
        preventDefault: jest.fn(),
        isUpdateUserName: store.dispatch(),
      });
    });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
