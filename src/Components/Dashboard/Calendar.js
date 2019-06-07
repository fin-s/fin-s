import React, {Component} from 'react'
// import Tooltip from 'tooltip.js'
import Moment from 'moment'
import FullCalendar from '@fullcalendar/react'
import dayGridMonth from '@fullcalendar/daygrid'
import Lottie from 'react-lottie'
import animationData from '../../Lotties/animation-w360-h240.json'


class Calendar extends Component {

  // tooltipHandler = (info) => {
  //   console.log('fire from tooltip', info)
  //   var tooltip = new Tooltip(info.el, {
  //     title: info.event.extendedProps.description,
  //     placement: 'top',
  //     trigger: 'hover',
  //     container: 'body'
  //   });
  //   console.log('show new tooltip: ', tooltip)
  // }

  render() {
    let month = Moment().format('M')
    const validRange = {
      start: Moment().date(1).format('YYYY-MM-DD'),
      end: Moment().month(+month + 1).date(0).format('YYYY-MM-DD')
    }

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      resizeMode: 'cover'
    }

    const newSources = [
      {
        events: [],
        color: 'green',
        textColor: '$gold-color'
      },
      {
        events: [],
        color: 'red',
        textColor: '$gold-color'
      }
    ]

    this.props.calendarList.map((ele) => {
      if(ele.style === 'income'){
        newSources[0].events.push({
          title: ele.nickname,
          start: ele.dueDate,
          description: `Amount: ${ele.amount}`
        })
      } else {
        newSources[1].events.push({
          title: ele.nickname,
          start: ele.dueDate,
          description: `Amount: ${ele.amount}`
        })
      }
    })

    if(this.props.loadingCalendar){
      return (<div>
        <Lottie options={defaultOptions} />
      </div>)
    } else {
      return (
        <FullCalendar 
        defaultView="dayGridMonth" 
        plugins={[ dayGridMonth ]}
        showNonCurrentDates={false}
        eventSources={newSources}
        validRange={validRange}
        progressiveEventRendering={true} />
      )
    }
  }
}
export default Calendar