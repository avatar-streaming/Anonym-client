import useSearchUsers from "../../hooks/useSearchUsers";

function Search() {
  const userList = useSearchUsers();

  return (
    <div className="content-wrapper">
      <div>
        {userList.map((user) => (
          <div key={user._id} className="user-card">
            <div>
              <img className="user-thumnail" src={user.thumnail} alt="user thumnail" />
            </div>
            <div>
              <div>{user.userName}</div>
              <div>{user.follower.length} followers</div>
            </div>
            <div>
              <button>
                follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
