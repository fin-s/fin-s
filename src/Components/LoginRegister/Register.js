import React, { Component } from 'react'
import axios from 'axios'

class RegisterForm extends Component {
	constructor() {
		super()
		this.state = {
			loginEmail: '',
			loginPassword: '',
			firstname: '',
			lastname: '',
			email: '',
			// username: '',
			password: '',
			loginError: false,
			loginErrorMessage: 'Username or password incorrect. Please try again.',
			registerError: false,
			registerErrorMessage: 'Email already in use.'
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
		const { password, firstname, lastname, email } = this.state
		try {
			await axios.post('/auth/register', {
				// username,
				password,
				firstname,
				lastname,
				email
			})
			// this.props.updateUsername(username)
			// this.props.history.push('/#/')
		} catch (err) {
			this.setState({ registerError: true })
		}

	}

	render() {
		return (
			<>
				<h2 className='registerText'>need an account? sign up here</h2>
				<form onSubmit={this.handleSignUpFormSubmit}>
					<div  >
						<input
							type='text'
							name='firstname'
							placeholder='first name'
							onChange={this.handleFormUpdate}
						/>
						<input
							type='text'
							name='lastname'
							placeholder='last name'
							onChange={this.handleFormUpdate}
						/>
					</div>
					<div >
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
					<div >
						<button onClick={this.handleSignUpFormSubmit}>
							<b>sign up</b>
						</button>
					</div>
				</form>
				{this.state.registerError && (
					<h3 style={{ color: 'tomato' }}>{this.state.registerErrorMessage}</h3>
				)}
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


export default RegisterForm