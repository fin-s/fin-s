import React, { Component } from 'react'

class ProgressBar extends Component {
  constructor(props){
    super(props)

  }

  render() {
    
    return (
      <div
      className='outerProgressBar'
        style={{
          border: '1px gold solid',
          height: '5%',
          width: '96%',
          margin: '1% 2%'
          }}>
        <div
        className='Progress'
        style={{
          backgroundColor: 'gold',
          height: '100%',
          width: '50%'
        }}></div>
      </div>
    )
  }
} 

export default ProgressBar;