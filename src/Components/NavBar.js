import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Link to="/">
        <h3>
          <b>home</b>
        </h3>
      </Link>
      <Link to="/wizard">
        <h3>
          <b>wizard</b>
        </h3>
      </Link>
      <Link to='/dashboard'>
        <h3>
          <b>dashboard</b>
        </h3>
      </Link>
    </div>
  );
}

export default NavBar;
