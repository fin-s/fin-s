import React from "react";
import { Link } from "react-router-dom";
import Logo from './Logo'
import Axios from "axios";

function NavBar() {

  const handleLogout = () => {
    Axios.delete('/auth/logout')
  }

  return (
    <div className='navBarLinks'>
      <Logo />
        <div className='mobile-nav-container' >
          <Link to='/dashboard'>
              <h3>
                <b>dashboard</b>
              </h3>
          </Link>
          <Link to='/profile'>
              <h3>
                <b>profile</b>
              </h3>
          </Link>
        </div>
      <Link to='/'>
        <button
          type="button"
          className="btn btn-outline-secondary"
          id='logoutButton'
          onClick={() => { handleLogout() }}><b>logout</b></button>
      </Link>
    </div>
  );
}

export default NavBar;
