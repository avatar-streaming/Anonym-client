import React from "react";
import UserCard from "./UserCard";
import { shallow } from "enzyme";

describe("<UserCard />", () => {
  const context = {
    thumnail: "mock thumnail",
    userName: "mock userName",
  };
  const component = shallow(<UserCard user={context} />);

  it("should render context", () => {
    const img = component.find(".user-thumnail");
    expect(img.props().src).toEqual(context.thumnail);
  
    const userName = component.find(".following-card__user-name");
    expect(userName.text()).toEqual(context.userName);
  });
});
