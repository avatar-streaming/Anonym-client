import React from "react";
import { NavLink } from "react-router-dom";

function TopNav() {
  return (
    <nav>
      <div>
        <NavLink to="/">Logo</NavLink>
      </div>
      <div>
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
