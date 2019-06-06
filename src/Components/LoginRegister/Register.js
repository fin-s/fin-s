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

          <p className ='appInfo'>
						Welcome to fin-s. 
							<p>fin-s makes it easy to keep track, and stay on top of your monthly expenses.</p> Our goal is unlike other finance tracking resources, fin-s is geared around guiding users to financial stability by building a roadmap of how to eliminate your debts.</p>
				<main className='main'>
					<h2 className='registerText'>
						need an account? <p>sign up here</p></h2>
					<form onSubmit={this.handleSignUpFormSubmit}>
						<div className='registerInput' >
							<a className='inputAlign'>
								<div>
									<input
										type='text'
										name='firstName'
										placeholder='first name'
										onChange={this.handleFormUpdate}
									/>
									<input
										type='text'
										name='lastName'
										placeholder='last name'
										onChange={this.handleFormUpdate}
									/>
								</div>
								<div>
									<input
										type='text'
										name='email'
										placeholder='email'
										onChange={this.handleFormUpdate}
									/>
									<input
										type='text'
										name='password'
										placeholder='password'
										onChange={this.handleFormUpdate}
									/>
								</div>
							</a>
							<div className='signUpButton'>
								<button type="button" class="btn btn-outline-secondary" onClick={this.handleSignUpFormSubmit}>
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

// const mapStateToProps = (state) => {
// 	return { ...state }
// }

// const mapDispatchToProps = {
// 	updateUsername
// }

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(withRouter(RegisterForm))


export default withRouter(RegisterForm)