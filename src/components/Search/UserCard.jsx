import React from "react";
import useFollow from "../../hooks/useFollow";

function UserCard({ user }) {
  const updateTargetID = useFollow();

  return (
    <div className="user-card">
      <div>
        <img
          className="user-thumnail"
          src={user.thumnail}
          alt="user thumnail"
        />
      </div>
      <div className="card-right">
        <div className="user-description">
          <div className="user-name">
            {user.userName}
          </div>
          <div className="follower-number">
            {user.followers.length} followers
          </div>
        </div>
        <div className="follow-button-box">
          <button
            className="follow-button"
            onClick={() => {
              updateTargetID(user._id);
            }}
          >
            follow
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
