import React from "react";
import { Link } from "react-router-dom";
import logo from '../Images/newFinS_logo.png'


function Logo() {
  return (
    <div className='navBarLinks' style={{paddingTop: '20px'}}>
      <Link to ='/dashboard'>
        <img className='nav-logo'
        src = {logo} 
        alt ='Logo' 
        type='Logo'/>
      </Link>
    </div>
  );
}

export default Logo;
