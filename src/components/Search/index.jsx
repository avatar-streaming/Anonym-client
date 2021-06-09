import React from "react";
import UserCard from "./UserCard";
import useSearchUsers from "../../hooks/useSearchUsers";

function Search() {
  const userList = useSearchUsers();

  return (
    <div className="content-wrapper">
      <div>
        {userList.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Search;
