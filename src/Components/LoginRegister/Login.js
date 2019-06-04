import React, {Component} from 'react'

import LoginForm from './LoginForm'
import Register from './Register'

export default class Login extends Component{
	render(){
		return(
			<div>
				<LoginForm />
				<Register />
			</div>
		)
	}
}