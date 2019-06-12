import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      loginEmail: '',
      loginPassword: '',
      loginError: false,
      loginErrorMessage: 'Incorrect username or password.',
      authenticated: false,
      userFirstName: '',
      isLoggedIn: false,
    }
  }

  handleFormInputUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      loginError: false
    })
  }

  handleLoginFormSubmit = async (e) => {
    e.preventDefault()
    const { loginEmail: email, loginPassword: password } = this.state
    try {
      await axios.post('/auth/login', { email, password })
      this.setState({
        isLoggedIn: true
      })
      this.props.history.push('/dashboard')
    } catch (err) {
      this.setState({ loginEmail: '', loginPassword: '', loginError: true })
    }
    if(this.state.loginError === true){
      return(
        alert(`incorrect username or password`)
      )
    }
  }

  handleLogout = () => {
    this.setState({
      loginEmail: '',
      loginPassword: '',
      loginError: false,
      loginErrorMessage: 'incorrect username or password',
      authenticated: false,
      isLoggedIn: false,
      userFirstName: ''
    })
    alert('logged out')
  }

  conditionalRender = (bleh) => {
    if (!bleh) {
      return (<header className='header'>
        <form onSubmit={this.handleLoginFormSubmit}>
          <div className='loginInput'>
            <input
              type='text'
              name="loginEmail"
              placeholder="email"
              value={this.state.loginEmail}
              onChange={this.handleFormInputUpdate}
            />
            <input
              type='password'
              name="loginPassword"
              placeholder="password"
              value={this.state.loginPassword}
              onChange={this.handleFormInputUpdate}
            />
          </div>
        </form>
        <div className='buttonDiv'>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={this.handleLoginFormSubmit}><b>log in</b></button>
        </div>
      </header>)
    } else {
      return (<div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          id='logoutButton'
          onClick={this.handleLogout}><b>logout</b></button>
      </div>)
    }
  }

  render() {
    const { isLoggedIn } = this.state
    return (
      <>
        {this.conditionalRender(isLoggedIn)}
        {/* <alert>
          {this.state.loginError && <h3 className='errorMess'>{this.state.loginErrorMessage}</h3>}
        </alert> */}
      </>
    )
  }
}

export default withRouter(LoginForm)