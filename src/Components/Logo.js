import React from "react";
import { Link } from "react-router-dom";
import logo from '../Images/newFinS_logo.png'


function Logo() {
  return (
    <div>
      <Link to ='/dashboard'>
        <img 
        src = {logo} 
        alt ='Logo' 
        type='Logo'
        style={{marginTop: '5px', border: '1px red solid'}}/>
      </Link>
    </div>
  );
}

export default Logo;
