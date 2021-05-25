function UserCard({ userInfo }) {
  return (
    <div className="following-card">
      <div>
        <img src={userInfo.thumnail} className="user-thumnail" />
      </div>
      <div>
        <span className="user-name">{userInfo.userName}</span>
        <span className="streaming-state">Offline</span>
      </div>
    </div>
  );
}

export default UserCard;
