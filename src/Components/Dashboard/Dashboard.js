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
      loadingCalendar: true,
      snapshotList: [],
      calendarList: [],
      surplus: 1,
      chartClass: 'chart selected',
      calendarClass: 'calendar unselected'
    }
  }

  async componentDidMount() {
    try {
      const lists = await axios.get('/api/list')
      if(lists.data === 'User not logged in'){
        throw new Error()
      }
      const {calendar, horizon, surplus} = lists.data
      this.setState({loadingSnapshot: false, 
        loadingCalendar: false,
        snapshotList: horizon,
        calendarList: calendar,
        surplus: surplus
      })
    } catch (err) {
      console.log('Error encountered retrieving horizon events: ', err)
      this.props.history.push('/')
    }
  }

  handleToggle = () => {
    // console.log('fire from toggle button')
    if(this.state.chartClass === 'chart selected'){
      this.setState({chartClass: 'chart unselected', calendarClass: 'calendar selected'})
    } else {
      this.setState({chartClass: 'chart selected', calendarClass: 'calendar unselected'})
    }
  }
  

  render() {
    const {chartClass, calendarClass, loadingSnapshot, snapshotList, calendarList, surplus, loadingCalendar} = this.state
    return (
      <main className='test'>
        <NavBar />
        <div className='containers'>
        <button type="button" className="chart-calendar-toggle btn btn-outline-secondary" onClick={this.handleToggle} >Toggle Calendar/Chart View</button>
          <div className={chartClass} id='chart'>
            <Chart surplus={surplus}/>
          </div>
          <div className={calendarClass} id='calendar'>
            <Calendar loadingCalendar={loadingCalendar} calendarList={calendarList} surplus={surplus} />
          </div>
          <div className='rightSide'>
            <NextSteps />
            <div className='horizonSnapshot'>
              <HorizonSnapshot loadingSnapshot={loadingSnapshot} snapshotList={snapshotList} />
            </div>
          </div>
        </div>
      </main>
    )
  }
}
export default withRouter(Dashboard)