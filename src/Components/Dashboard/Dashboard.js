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
      snapshotList: []
    }
  }

  async componentDidMount() {
    try {
      const horizonList = await axios.post('/api/list')
      if(horizonList.data === 'User not logged in'){
        // console.log(horizonList.data)
        throw new Error
      }
      this.setState({loadingSnapshot: false, snapshotList: horizonList.data})
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
export default Dashboard