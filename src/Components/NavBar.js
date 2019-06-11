import React from "react";
import { Link } from "react-router-dom";
import Logo from './Logo'
// import LoginForm from 'LoginForm';

function NavBar() {
  return (
    <div className='navBarLinks'>
      <Logo />
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
