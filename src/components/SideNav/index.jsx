import React from "react";
import { useSelector } from "react-redux";

function SideNav() {
  const { followings } = useSelector((state) => state.auth.userInfo);

  return (
    <div className="nav-side">
      <div className="following-list">
        {
          followings.map((follwing) => (
            <div className="following-card">
              <div>
                <img src={follwing.thumnail} className="user-thumnail" />
              </div>
              <div>
                <span className="user-name">{follwing.userName}</span>
                <span className="streaming-state">Offline</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default SideNav;
