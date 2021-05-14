import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";

function TopNav() {
  const { _id: userId } = useSelector((state) => state.authReducer.userInfo);
  const handleLogout = useLogout();

  return (
    <nav className="nav-top">
      <div>
        <NavLink to="/">Logo</NavLink>
      </div>
      <div className="search-bar">
        <form>
          <input type="text"/>
        </form>
      </div>
      <div>
        <NavLink to={`/streaming/${userId}`}>OnAir</NavLink>
        <NavLink to={`/user/${userId}`}>My Page</NavLink>
        <NavLink to="/auth/logout" onClick={() => handleLogout(true)}>Logout</NavLink>
      </div>
    </nav>
  );
}

export default TopNav;
