import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import LoginForm from './LoginRegister/LoginForm'
import Register from './LoginRegister/Register'

class Home extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <LoginForm />
        <Register />
      </div>
    )
  }
}

export default Home