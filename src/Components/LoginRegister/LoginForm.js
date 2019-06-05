import React, { Component } from 'react'
import axios from 'axios'

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
    const { loginEmail, loginPassword } = this.state
    try {
      const res = await axios.post('/auth/login', { loginEmail, loginPassword })
        .then(
          this.setState({
            authenticated: true
          })
        )
      // this.props.updateUsername(loginEmail)
      // this.props.updateUserId(res.data.user_id)
      this.getUserFirstName()
    } catch (err) {
      this.setState({ loginEmail: '', loginPassword: '', loginError: true })
    }
  }

  getUserFirstName = () => {
    axios.get(`/api/users/first-name/${this.state.loginEmail}`)
      .then(res => {
        this.setState({ userFirstName: res.data[0].firstname })
      })
  }

  handleLogout = () => {
    this.setState({
      loginEmail: '',
      loginPassword: '',
      loginError: false,
      loginErrorMessage: 'Incorrect username or password.',
      authenticated: false,
      userFirstName: ''
    })
    alert('logged out')
  }

  render() {
    return (
      <>
        <header className='header'>


          <form onSubmit={this.handleLoginFormSubmit}>
            <div  className='loginInput'>
              <input
                type='text'
                name="loginEmail"
                placeholder="email"
                value={this.state.loginEmail}
                onChange={this.handleFormInputUpdate}
              />
              <input
                type='text'
                name="loginPassword"
                placeholder="password"
                value={this.state.loginPassword}
                onChange={this.handleFormInputUpdate}
              />
            </div>
          </form>
          <div className='buttonDiv'>
            <button type="button" class="btn btn-outline-secondary" onClick={this.handleLoginFormSubmit}><b>log in</b></button>
            {/* <button type="button" onClick={this.handleLogout}><b>logout</b></button> */}
          </div>
          {this.state.loginError && <h3>{this.state.loginErrorMessage}</h3>}
        </header>
      </>
    )
  }
}


export default LoginForm