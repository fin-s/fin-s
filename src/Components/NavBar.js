import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className='navBarLinks'>
      <Link to="/">
        <span className='spans'>
          <h3>
            <b>home</b>
          </h3>
        </span>
      </Link>
      <Link to="/wizard">
        <span className='spans'>
          <h3>
            <b>wizard</b>
          </h3>
        </span>
      </Link>
      <Link to='/dashboard'>
        <span className='spans'>
          <h3>
            <b>dashboard</b>
          </h3>
        </span>
      </Link>
    </div>
  );
}

export default NavBar;
