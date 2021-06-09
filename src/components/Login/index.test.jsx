import React from "react";
import Login from ".";
import renderer from "react-test-renderer";

describe("<Login />", () => {
  let component = null;

  beforeEach(() => {
    component = renderer.create(<Login />);
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
