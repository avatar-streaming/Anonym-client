import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

function SideNav() {
  const { followings } = useSelector((state) => state.auth.userInfo);

  return (
    <div className="nav-side">
      <div className="following-list">
        {
          followings.map((follwing) => (
            <UserCard userInfo={follwing} />
          ))
        }
      </div>
    </div>
  );
}

export default SideNav;
