import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Step extends Component {

  state = {
    completed: false
  }

  componentDidMount() {
    // console.log(complete)

    if (+this.props.complete === 0) {
      this.setState({
        completed: false
      })
    } else if (+this.props.complete === 1) {
      this.setState({
        completed: true
      })
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.complete !== this.props.complete){
      if (+this.props.complete === 0) {
        this.setState({
          completed: false
        })
      } else if (+this.props.complete === 1) {
        this.setState({
          completed: true
        })
      }
    }
  }

  toggle = () => {
    this.setState({
      completed: !this.state.completed
    })

    this.props.handleClick(this.props.index)
  }


  render() {
    if (!this.state.completed) {
      return (
        <div>
          <div className="step-title-hold">
            <div onClick={this.toggle}>
              <FontAwesomeIcon icon={['far', 'square']} />
            </div>
            <h5>Step {this.props.stepNumber}:</h5>
          </div>
          <p className='incomplete-task'>{this.props.task}</p>

          {/* <button
            onClick={() => { this.props.handleClick(this.props.index) }}>
          x</button> */}
        </div>
      )
    } else {
      return (
        <div>
          <div className="step-title-hold">
            <div onClick={this.toggle}>
              <FontAwesomeIcon icon={['far', 'check-square']} />
            </div>
            <h5>Step {this.props.stepNumber}:</h5></div>
          <p className='completed-task'>{this.props.task}</p>

          {/* <button
            onClick={() => { this.props.handleClick(this.props.index) }}>
          x</button> */}
        </div>
      )
    }
  }
}

export default Step