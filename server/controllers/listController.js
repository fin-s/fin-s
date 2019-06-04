const moment = require('moment-weekdaysin')

const income = [
  {
    name: 'Monthly',
    fixed: true,
    frequency: 'monthly',
    income_date: 1,
    amount: 100
  },
  {
    name: 'Weekly',
    fixed: true,
    frequency: 'weekly',
    income_weekday: 5,
    amount: 50
  },
  {
    name: 'Bi-weekly',
    fixed: true,
    frequency: 'bi-weekly',
    income_date: 5,
    income_date_2: 20,
    amount: 300
  },
]

const debt = [
  {
    name: 'Credit Card 1',
    balance: 5000,
    minimum_payment: 50,
    due_date: 25,
    interest_rate: 2540
  },
  {
    name: 'Credit Card 2',
    balance: 3000,
    minimum_payment: 70,
    due_date: 9,
    interest_rate: 2120
  },
  {
    name: 'Credit Card 3',
    balance: 2000,
    minimum_payment: 100,
    due_date: 14,
    interest_rate: 1897
  }
]

const expense = [
  {
    name: 'Electricity',
    amount: 50,
    due_date: 12
  },
  {
    name: 'Gas',
    amount: 30,
    due_date: 17
  },
  {
    name: 'Water',
    amount: 15,
    due_date: 22
  },
]

const listUpcoming = (incomes, debts, expenses) => {
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
    switch (element.frequency) {
      case 'monthly':
        if (element.income_date >= day) {
          month0.dueDates.push({
            name: element.name,
            dueDate: element.income_date,
            amount: element.amount,
            type: 'income'
          })
        }
        month1.dueDates.push({
          name: element.name,
          dueDate: element.income_date,
          amount: element.amount,
          type: 'income'
        })
        month2.dueDates.push({
          name: element.name,
          dueDate: element.income_date,
          amount: element.amount,
          type: 'income'
        })
        break;
      case 'bi-weekly':
        if (element.income_date >= day) {
          month0.dueDates.push({
            name: element.name,
            dueDate: element.income_date,
            amount: element.amount,
            type: 'income'
          })
        }
        if (element.income_date_2 >= day) {
          month0.dueDates.push({
            name: element.name,
            dueDate: element.income_date_2,
            amount: element.amount,
            type: 'income'
          })
        }
        month1.dueDates.push({
          name: element.name,
          dueDate: element.income_date,
          amount: element.amount,
          type: 'income'
        }, {
            name: element.name,
            dueDate: element.income_date_2,
            amount: element.amount,
            type: 'income'
          })
        month2.dueDates.push({
          name: element.name,
          dueDate: element.income_date,
          amount: element.amount,
          type: 'income'
        }, {
            name: element.name,
            dueDate: element.income_date_2,
            amount: element.amount,
            type: 'income'
          })
        break;

      case 'weekly':
        let days0 = moment().month(month).weekdaysInMonth(element.income_weekday)
        let showMe0 = days0.map(day => {
          return day.date()
        })

        let days1 = moment().month(month + 1).weekdaysInMonth(element.income_weekday)
        let showMe1 = days1.map(day => {
          return day.date()
        })
        let days2 = moment().month(month + 2).weekdaysInMonth(element.income_weekday)
        let showMe2 = days2.map(day => {
          return day.date()
        })


        showMe0.forEach(pay => {
          if (pay >= day )
          month0.dueDates.push({
            name: element.name,
            dueDate: pay,
            amount: element.amount,
            type: 'income'
          })
        })

        showMe1.forEach(pay => {
          month1.dueDates.push({
            name: element.name,
            dueDate: pay,
            amount: element.amount,
            type: 'income'
          })
        })

        showMe2.forEach(pay => {
          month2.dueDates.push({
            name: element.name,
            dueDate: pay,
            amount: element.amount,
            type: 'income'
          })
        })


        break;
      default: console.log(`none`)
    }
  })



  debts.forEach(element => {
    if (element.due_date >= day) {
      month0.dueDates.push({
        name: element.name,
        dueDate: element.due_date,
        amount: element.minimum_payment,
        type: 'debt'
      })
    }
    month1.dueDates.push({
      name: element.name,
      dueDate: element.due_date,
      amount: element.minimum_payment,
      type: 'debt'
    })
    month2.dueDates.push({
      name: element.name,
      dueDate: element.due_date,
      amount: element.minimum_payment,
      type: 'debt'
    })
  })

  expenses.forEach(element => {
    if (element.due_date >= day) {
      month0.dueDates.push({
        name: element.name,
        dueDate: element.due_date,
        amount: element.amount,
        type: 'expense'
      })
    }
    month1.dueDates.push({
      name: element.name,
      dueDate: element.due_date,
      amount: element.amount,
      type: 'expense'
    })
    month2.dueDates.push({
      name: element.name,
      dueDate: element.due_date,
      amount: element.amount,
      type: 'expense'
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

let list = listUpcoming(income, debt, expense)

let showList = []

list.map(element => {
  element.dueDates.map(date => {
    showList.push(`${element.month} ${date.dueDate}: ${date.name}  $${date.amount}`)
  })
})

console.log(showList)




