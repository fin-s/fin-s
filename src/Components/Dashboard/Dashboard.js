import React, { Component } from 'react'
import NextSteps from './NextSteps'
import HorizonSnapshot from './HorizonSnapshot'
import Calendar from './Calendar'
import NavBar from '../NavBar'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <>
        <NavBar />
        <div className='containers'>
              <div className='calendar'>
                calendar
                <Calendar />
              </div>
          <div className='rightSide'>
              <div className='nextSteps'>
                <NextSteps />
              </div>
              <div className='horizonSnapshot'>
                <HorizonSnapshot />
              </div>
          </div>
        </div>
      </>
    )
  }
}
export default Dashboard