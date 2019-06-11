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
      <Link to='/profile'>
        <span className='spans'>
          <h3>
            <b>profile</b>
          </h3>
        </span>
      </Link>
      {/* <LoginForm /> */}

      <Link to='/'>
        <button
          type="button"
          class="btn btn-outline-secondary"
          id='logoutButton'
          onClick={() => { handleLogout() }}><b>logout</b></button>
      </Link>
    </div>
  );
}

export default NavBar;
