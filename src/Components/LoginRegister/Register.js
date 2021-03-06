import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class RegisterForm extends Component {
	constructor() {
		super()
		this.state = {
			loginEmail: '',
			loginPassword: '',
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			loginError: false,
			loginErrorMessage: 'username or password incorrect, please try again',
			registerError: false,
			registerErrorMessage: 'email already in use'
		}
	}

	handleFormUpdate = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
			loginError: false
		})
	}

	handleSignUpFormSubmit = async (e) => {
		e.preventDefault()
		const { password, firstName, lastName, email } = this.state
		try {
			await axios.post('/auth/register', {
				password,
				firstName,
				lastName,
				email
			})
			this.props.history.push('/wizard')
		} catch (err) {
			this.setState({ registerError: true })
		}
	}

	render() {
		return (
			<>

				<div className='appInfo'>
					<h1>fin-s makes it easy to  </h1>
					<h1>track your expenses <i className="fas fa-coins"></i> </h1>
					<h1>eliminate debt <i className="far fa-credit-card"></i> </h1>
					<h1>and guide you to financial stability <i className="fas fa-chart-line"></i></h1>
				</div>

				<main className='main'>
					<h2 className='registerText'>
						need an account? <p>sign up here</p></h2>
					<form onSubmit={this.handleSignUpFormSubmit}>
						<div className='registerInput' >
							<div className='inputAlign'>
								<div>
									<input
										type='text'
										name='firstName'
										placeholder='first name'
										onChange={this.handleFormUpdate}
										minLength='2'
										maxLength='25'
										required
									/>
									<input
										type='text'
										name='lastName'
										placeholder='last name'
										onChange={this.handleFormUpdate}
										minLength='2'
										maxLength='25'
										required
									/>
								</div>
								<div>
									<input
										type='email'
										name='email'
										placeholder='email'
										onChange={this.handleFormUpdate}
										required
									/>
									<input
										type='password'
										name='password'
										placeholder='password'
										onChange={this.handleFormUpdate}
										required
									/>
								</div>
							</div>
							<div className='signUpButton'>
								<button type="button" className="btn btn-outline-secondary" onClick={this.handleSignUpFormSubmit}>
									<b>sign up</b>
								</button>
							</div>
						</div>
					</form>
					<span className='errorMessage'>
						{this.state.registerError && (
							<h3>{this.state.registerErrorMessage}</h3>
						)}
					</span>
				</main>
			</>
		)
	}
}

export default withRouter(RegisterForm)