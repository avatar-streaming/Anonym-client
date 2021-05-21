import useSearchUsers from "../../hooks/useSearchUsers";

function Search() {
  const userList = useSearchUsers();

  return (
    <div className="content-wrapper">
      <div>
        {userList.map((user) => (
          <div key={user._id} className="user-card">
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
                  {user.follower.length} followers
                </div>
              </div>
              <div className="follow-button-box">
                <button className="follow-button">
                  follow
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
