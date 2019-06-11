import React, { Component } from 'react'

class ProgressBar extends Component {
  constructor(props){
    super(props)

    this.state = {
      progressWidth: this.props.stepsCompleted.reduce( (accumulator, currentValue, currentIndex, array) => accumulator + currentValue )
    }
  }

  render() {
    console.log(this.props.stepsCompleted)
    console.log(this.state.progressWidth)
    return (
      <div
      className='outerProgressBar'
        style={{
          border: '1px gold solid',
          height: '15px',
          width: '96%',
          margin: '1% 2%',
          borderRadius: '15px'
          }}>
        <div
        className='Progress'
        style={{
          backgroundColor: 'gold',
          height: '100%',
          width: '50%',
          borderRadius: '15px'
        }}></div>
      </div>
    )
  }
} 

export default ProgressBar;