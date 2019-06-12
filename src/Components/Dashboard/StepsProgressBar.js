import React, { Component } from 'react'

class ProgressBar extends Component {


  calculateProgress() {
    let progress = this.props.stepsCompleted.reduce((accumulator, currentValue) => {
     return accumulator += currentValue
    }, 0)

    let progressWidth = progress / 12
    return progressWidth
  }

  render() {
    let width = this.calculateProgress()*100
    return (
      <div
      className='outerProgressBar'
        style={{
          border: '1px #C5B358 solid',
          height: '15px',
          width: '96%',
          margin: '1% 2%',
          borderRadius: '15px'
          }}>
        <div
        className='Progress'
        style={{
          backgroundColor: '#2BA851',
          height: '100%',
          width: `${width}%`,
          borderRadius: '15px',
          transition: '1500ms all'
        }}></div>
      </div>
    )
  }
} 

export default ProgressBar;