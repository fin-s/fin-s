import React, { Component } from 'react'
import NextSteps from './NextSteps'
import HorizonSnapshot from './HorizonSnapshot'
import {withRouter} from 'react-router-dom'
import Calendar from './Calendar'
import NavBar from '../NavBar'
import Chart from './Chart'
import axios from 'axios'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      loadingSnapshot: true,
      snapshotList: [],
      calendarList: []
    }
  }

  async componentDidMount() {
    try {
      const lists = await axios.get('/api/list')
      if(lists.data === 'User not logged in'){
        // console.log(horizonList.data)
        throw new Error()
      }
      const {calendar, horizon} = lists.data
      this.setState({loadingSnapshot: false, 
        snapshotList: horizon,
      calendarList: calendar})
    } catch (err) {
      console.log('Error encountered retrieving horizon events: ', err)
      this.props.history.push('/')
    }
  }
  

  render() {
    const {loadingSnapshot, snapshotList} = this.state
    return (
      <>
        <NavBar />
        <div className='containers'>
          {/* <div className='calendar'>
            calendar
                <Calendar />
          </div> */}
          <div className='chart'>
            <Chart />
          </div>
          <div className='rightSide'>
            <div className='nextSteps'>
              <NextSteps />
            </div>
            <div className='horizonSnapshot'>
              <HorizonSnapshot loadingSnapshot={loadingSnapshot} snapshotList={snapshotList} />
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default withRouter(Dashboard)