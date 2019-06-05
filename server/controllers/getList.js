const moment = require('moment-weekdaysin')

const getList = (incomes, debts, expenses) => {
  let month0 = {
    month: moment().format('MMMM'),
    dueDates: []
  }
  let month1 = {
    month: moment().add(1, 'months').format('MMMM'),
    dueDates: []
  }
  let month2 = {
    month: moment().add(2, 'months').format('MMMM'),
    dueDates: []
  }

  let day = new Date().getDate()
  let month = new Date().getMonth()
  incomes.forEach(element => {
    switch (element.interval.frequency) {
      case 'monthly':
        if (element.interval.incomeDate1 >= day) {
          month0.dueDates.push({
            nickname: element.nickname,
            style: 'income',
            amount: element.amount,
            dueDate: element.interval.incomeDate1,
          })
        }
        month1.dueDates.push({
          nickname: element.nickname,
          style: 'income',
          amount: element.amount,
          dueDate: element.interval.incomeDate1,
        })
        month2.dueDates.push({
          nickname: element.nickname,
          style: 'income',
          amount: element.amount,
          dueDate: element.interval.incomeDate1,
        })
        break;
      case 'semi-monthly':
        if (element.interval.incomeDate1 >= day) {
          month0.dueDates.push({
            nickname: element.nickname,
            style: 'income',
            amount: element.amount,
            dueDate: element.interval.incomeDate1,
          })
        }
        if (element.interval.incomeDate2 >= day) {
          month0.dueDates.push({
            nickname: element.nickname,
            style: 'income',
            amount: element.amount,
            dueDate: element.interval.incomeDate2,
          })
        }
        month1.dueDates.push({
          nickname: element.nickname,
          style: 'income',
          amount: element.amount,
          dueDate: element.interval.incomeDate1,
        }, {
            nickname: element.nickname,
            style: 'income',
            amount: element.amount,
            dueDate: element.interval.incomeDate2,
          })
        month2.dueDates.push({
          nickname: element.nickname,
          style: 'income',
          amount: element.amount,
          dueDate: element.interval.incomeDate1,
        }, {
            nickname: element.nickname,
            style: 'income',
            amount: element.amount,
            dueDate: element.interval.incomeDate2,
          })
        break;

      case 'weekly':
        let days0 = moment().month(month).weekdaysInMonth(element.interval.incomeWeekday)
        let showMe0 = days0.map(day => {
          return day.date()
        })

        let days1 = moment().month(month + 1).weekdaysInMonth(element.interval.incomeWeekday)
        let showMe1 = days1.map(day => {
          return day.date()
        })
        let days2 = moment().month(month + 2).weekdaysInMonth(element.interval.incomeWeekday)
        let showMe2 = days2.map(day => {
          return day.date()
        })


        showMe0.forEach(pay => {
          if (pay >= day)
            month0.dueDates.push({
              nickname: element.nickname,
              style: 'income',
              amount: element.amount,
              dueDate: pay,
            })
        })

        showMe1.forEach(pay => {
          month1.dueDates.push({
            nickname: element.nickname,
            style: 'income',
            amount: element.amount,
            dueDate: pay,
          })
        })

        showMe2.forEach(pay => {
          month2.dueDates.push({
            nickname: element.nickname,
            style: 'income',
            amount: element.amount,
            dueDate: pay,
          })
        })


        break;
      default: console.log(`none`)
    }
  })



  debts.forEach(element => {
    
    let balance1
    let balance2
    let payment

    if (element.actualPayment) {
      balance1 = element.balance - element.actualPayment
      balance2 = element.balance - element.actualPayment * 2
      payment = element.actualPayment
    } else {
      balance1 = element.balance - element.minimumPayment
      balance2 = element.balance - element.minimumPayment * 2
      payment = element.minimumPayment
    }

    

    if (element.dueDate >= day) {
      month0.dueDates.push({
        nickname: element.nickname,
        dueDate: element.dueDate,
        amount: payment,
        balance: element.balance,
        style: 'debt'
      })
    }

    month1.dueDates.push({
      nickname: element.nickname,
      dueDate: element.dueDate,
      amount: payment,
      balance: balance1,
      style: 'debt'
    })
    
    month2.dueDates.push({
      name: element.nickname,
      dueDate: element.dueDate,
      amount: payment,
      balance: balance2,
      style: 'debt'
    })
  })

  expenses.forEach(element => {
    if (element.dueDate >= day) {
      month0.dueDates.push({
        nickname: element.nickname,
        dueDate: element.dueDate,
        amount: element.amount,
        style: 'expense'
      })
    }
    month1.dueDates.push({
      nickname: element.nickname,
      dueDate: element.dueDate,
      amount: element.amount,
      style: 'expense'
    })
    month2.dueDates.push({
      nickname: element.nickname,
      dueDate: element.dueDate,
      amount: element.amount,
      style: 'expense'
    })
  })

  month0.dueDates = month0.dueDates.sort((a, b) => {
    const dateA = a.dueDate
    const dateB = b.dueDate
    if (dateA > dateB) {
      return 1
    } else {
      return -1
    }
  })

  month1.dueDates = month1.dueDates.sort((a, b) => {
    const dateA = a.dueDate
    const dateB = b.dueDate
    if (dateA > dateB) {
      return 1
    } else {
      return -1
    }
  })

  month2.dueDates = month2.dueDates.sort((a, b) => {
    const dateA = a.dueDate
    const dateB = b.dueDate
    if (dateA > dateB) {
      return 1
    } else {
      return -1
    }
  })


  const schedule = [month0, month1, month2]

  return schedule
}

module.exports = {
  getList
}