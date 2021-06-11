import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import UserCard from "./UserCard";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";

describe("<UserCard />", () => {
  const mockStore = configureMockStore([thunk]);
  let store = null;
  let component = null;
  let context = null;

  beforeEach(() => {
    store = mockStore({
      user: {
        userInfo: {
          userName: "mock name 1",
          thumnail: "mock thumnail 1",
          followers: ["mock user2, mock user3"],
          followings: [{
            "_id": 1,
            "_id": 2,
          }],
        },
      },
    });
    store.dispatch = jest.fn();

    context = {
      "_id": 1,
      thumnail: "mock thumnail",
      userName: "mock userName",
      followers: [
        "mock user1",
        "mock user2",
      ],
    };

    component = renderer.create(
      <Provider store={store}>
        <UserCard user={context} />
      </Provider>
    );
  });

  it("should render with given state from redux store and context", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  // it("should update user thumnail", () => {
  //   const userThumnailInput = component.root.findByProps({ type: "file" });
  //   const userThumnailButton = component.root.findByProps({ "data-testid": "thumnail" });

  //   renderer.act(() => {
  //     userThumnailInput.props.onChange({
  //       target: {
  //         value: "mock thumnail 2",
  //       },
  //     });
  //   });
  //   expect(component.toJSON()).toMatchSnapshot();

  //   renderer.act(() => {
  //     userThumnailButton.props.onClick({
  //       preventDefault: jest.fn(),
  //       isUpdateUserThumnail: store.dispatch(),
  //     });
  //   });
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  // });

  // it("should update user name", () => {
  //   const userNameInput = component.root.findByProps({ type: "text" });
  //   const userNameButton = component.root.findByProps({ "data-testid": "name" });

  //   renderer.act(() => {
  //     userNameInput.props.onChange({
  //       target: {
  //         value: "mock name 2 ",
  //       },
  //     });
  //   });
  //   expect(component.toJSON()).toMatchSnapshot();

  //   renderer.act(() => {
  //     userNameButton.props.onClick({
  //       preventDefault: jest.fn(),
  //     });
  //   });
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  // });
});
