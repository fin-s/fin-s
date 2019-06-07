const moment = require('moment-weekdaysin')

const showCalendarList = (list) => {

  let month = moment().format('M')

  let calendarList = list.map(element => {

    let date = moment().month(element.month).date(element.dueDate).format('YYYY-MM-DD')
    let eventMonth = moment().month(element.month).format('M')

    if(+eventMonth === +month || +eventMonth - +month === 1) {
      return {
      nickname: element.nickname,
      dueDate: date,
      amount: element.amount,
      style: element.style,
      _id: element._id
    }
    } else {
      return
    }

    
  })

  let filteredCalendar = calendarList.filter(element => {
    return element !== undefined
  })

  return filtered
}

module.exports = {
  showCalendarList
}