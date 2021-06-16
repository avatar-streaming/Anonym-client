import React from "react";
import UserCard from "../../components/SideNav/UserCard";
import renderer from "react-test-renderer";

describe("<UserCard />", () => {
  let context = null;
  let component = null;

  beforeEach(() => {
    context = {
      thumnail: "mock thumnail",
      userName: "mock userName",
    };

    component = renderer.create(<UserCard user={context} />);
  });

  it("should render with given state from context", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
