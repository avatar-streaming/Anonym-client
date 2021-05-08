import React from "react";
import { NavLink } from "react-router-dom";

function TopNav() {
  return (
    <nav className="nav-top">
      <div>
        <NavLink to="/">Logo</NavLink>
      </div>
      <div className="search-bar">
        <form>
          <input type="text"/>
          <button>🔍</button>
        </form>
      </div>
      <div>
        <NavLink to="/streaming/:id">OnAir</NavLink>
        <NavLink to="/user/:id">My Page</NavLink>
        <NavLink to="/logout">Logout</NavLink>
      </div>
    </nav>
  );
}

export default TopNav;
