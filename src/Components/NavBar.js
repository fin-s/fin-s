import React from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from './Logo'
import Axios from "axios";

function NavBar() {

  const handleLogout = () => {
    Axios.delete('/auth/logout')
    this.props.history.push('/')
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
      <div className="logout-button-hold">
        <button
          type="button"
          className="btn btn-outline-secondary"
          id='logoutButton'
          onClick={() => { handleLogout() }}><b>logout</b></button>
      </div>
    </div>
  );
}

export default withRouter(NavBar);
