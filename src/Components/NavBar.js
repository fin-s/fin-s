import React from "react";
import { Link } from "react-router-dom";
import logo from '../Images/newFinS_logo.png'
// import LoginForm from 'LoginForm';

function NavBar() {
  return (
    <div className='navBarLinks'>
      <Link to ='/dashboard'>
        <img src = {logo} alt ='Logo' type='Logo'/>
      </Link>
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
    </div>
  );
}

export default NavBar;
