import React, { Component } from 'react'
import LoginForm from './LoginRegister/LoginForm'
import Register from './LoginRegister/Register'
import Logo from './Logo'

class Home extends Component {

  render() {
    return (
      <div>
        <div 
        className='HomeNavbar' 
        style={{
          padding: '0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'}}
        >
          <Logo />
          <LoginForm />
          
        </div>
        <Register />
      </div>
    )
  }
}

export default Home

