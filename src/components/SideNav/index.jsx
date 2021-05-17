import React from "react";
import { useSelector } from "react-redux";

function SideNav() {
  const { following } = useSelector((state) => state.auth.userInfo);

  return (
    <div className="nav-side">
      <ul>
        {
          following.map((user) => (
            <li key={user._id}>user</li>
          ))
        }
      </ul>
    </div>
  );
}

export default SideNav;
