import React, { Component } from 'react'

class Step extends Component {
  constructor(props){
    super(props)

  }

  render() {
    return (
      <div>
        <h5>Step {this.props.stepNumber}:</h5>
        <p>{this.props.task}</p>
        <button
          onClick={() => { this.props.handleClick(this.props.index) }}>
        x</button>
      </div>
    )
  }
}

export default Step