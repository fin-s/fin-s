import React, { Component } from 'react'
import NextSteps from './NextSteps'
import HorizonSnapshot from './HorizonSnapshot'
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
      const horizonList = await axios.get('/api/list').catch(error => {
        console.log('Error retrieving horizon events: ', error)
        throw new Error(409)
      })
      this.setState({loadingSnapshot: false, snapshotList: horizonList})
    } catch (err) {
      console.log('Error encoutered retrieving horizon events: ', err)
    }
  }
  

  render() {
    const {loadingSnapshot, snapshotList} = this.state
    return (
      <>
        <NavBar />
        <div className='containers'>
          <div className='calendar'>
            calendar
                <Calendar />
          </div>
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