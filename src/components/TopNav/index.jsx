import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";
import useSearch from "../../hooks/useSearch";

function TopNav() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = useSearch(searchTerm);
  const { _id: userId } = useSelector((state) => state.user.userInfo);
  const handleClick = useLogout();

  return (
    <nav className="nav-top">
      <div>
        <NavLink to="/" className="nav-top__title">Anonym</NavLink>
      </div>
      <div className="nav-top__search-bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-text"
            value={searchTerm}
            onChange={(e) => {
              if (e.target.value !== "\\") {
                setSearchTerm(e.target.value);
              }
            }}
          />
        </form>
      </div>
      <div>
        <NavLink to={`/streaming/${userId}`}>Streaming</NavLink>
        <NavLink to={`/user/${userId}`}>My Page</NavLink>
        <NavLink to="/auth/login" onClick={handleClick}>Logout</NavLink>
      </div>
    </nav>
  );
}

export default TopNav;
