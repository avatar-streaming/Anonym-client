import React from "react";
import PropTypes from "prop-types";

function UserCard({ userInfo }) {
  return (
    <div className="following-card">
      <div>
        <img src={userInfo.thumnail} className="user-thumnail" alt="user thumnail" />
      </div>
      <div>
        <span className="user-name">{userInfo.userName}</span>
        <span className="streaming-state">Offline</span>
      </div>
    </div>
  );
}

export default UserCard;

UserCard.propTypes = {
  userInfo: PropTypes.shape({
    thumnail: PropTypes.string,
    userName: PropTypes.string,
  }),
};
