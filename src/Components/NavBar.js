import React from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from './Logo'
import Axios from "axios";

function NavBar(props) {

  const handleLogout = () => {
    Axios.delete('/auth/logout')
    props.history.push('/')
  }

  return (
    <div className='navBarLinks'>
      <Logo />
      <div className='mobile-nav-container' >
        <Link to='/dashboard'>
          <h3 style={{paddingTop: '5px'}}>
            <b>dashboard</b>
          </h3>
        </Link>
        <Link to='/profile'>
          <h3 style={{paddingTop: '5px'}}>
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
