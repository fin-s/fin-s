

//this is not exactly needed. Copied over from tyler's proj

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Login extends Component {
	render() {
		return <div>{this.props.children}</div>
	}
}

const mapStateToProps = (reduxState) => {
	const { username } = reduxState
  return { username }
}

export default connect(mapStateToProps)(withRouter(Login))
