import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {

  render() {
    return (
      <div>
        <Link to='/'>
          <h3><b>home</b></h3>
        </Link>
        <Link to='/login'>
          <h3><b>login</b></h3>
        </Link>
        <Link to='/register'>
          <h3><b>register</b></h3>
        </Link>
      </div>
    )
  }
}

export default Home