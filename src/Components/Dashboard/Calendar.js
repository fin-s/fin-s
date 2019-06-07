import React, {Component} from 'react'
import Tooltip from 'tooltip.js'
import Moment from 'moment'
import FullCalendar from '@fullcalendar/react'
import dayGrid from '@fullcalendar/daygrid'


class Calendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      eventSources: [
        {
          events: [
            {
              title: 'event green',
              start: '2019-06-10',
              description: 'a big long ass description that just keeps going on for as long as can keep typing random shit that comes into my head'
            }
          ],
          color: 'green',
          textColor: '$gold-color'
        },
        {
          events: [
            {
              title: 'event red',
              start: '2019-06-15',
              description: 'also a description but for the red one'
            }
          ],
          color: 'red',
          textColor: '$gold-color'
        }
      ],
      validRange: {
        start: '',
        end: ''
      },
      eventRender: null
    }
  }

  async componentDidMount(){
    let month = Moment().format('M')
    let start = Moment().date(1).format('YYYY-MM-DD')
    let end = Moment().month(+month + 1).date(0).format('YYYY-MM-DD')
    this.setState({validRange: {start, end}, eventRender: function (info) {
      console.log('fire from tooltip', info)
      var tooltip = new Tooltip(info.el, {
        title: info.event.extendedProps.description,
        placement: 'top',
        trigger: 'hover click',
        container: 'body'
      })
      // console.log('show new tooltip: ', tooltip)
    }})
  }

  // tooltip = new Tooltip(info.el, {
  //   title: info.event.extendedProps.description,
  //   placement: 'top',
  //   trigger: 'click',
  //   container: 'body'
  // })

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
    return (
      <FullCalendar 
      defaultView="dayGridMonth" 
      plugins={[ dayGrid ]}
      showNonCurrentDates={false}
      eventSources={this.state.eventSources}
      validRange={this.state.validRange}
      eventRender={this.state.eventRender}
      progressiveEventRendering={true} />
    )
  }
}
export default Calendar