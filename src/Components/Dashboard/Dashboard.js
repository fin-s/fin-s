import React, {Component} from 'react'
import NextSteps from './NextSteps'
import UpcomingEvents from './UpcomingEvents'
import Calendar from './Calendar'
import NavBar from '../NavBar'
import Chart from './Chart'

class Dashboard extends Component {
  constructor(){
    super()
    this.state = {

    }
  }
  
  render(){
    return(
      <div>
        <NavBar />
        <Calendar />
        <Chart/>
        <NextSteps />
        <UpcomingEvents />
      </div>
    )
  }
}
export default Dashboard