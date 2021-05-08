import React from "react";
import { useSelector } from "react-redux";

function SideNav() {
  const { following } = useSelector((state) => state.authReducer.userInfo);

  return (
    <div>
      <ul>
        {
          following.map((user, index) => (
            <li id={index}>user {index}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default SideNav;
