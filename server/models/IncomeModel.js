const mongoose = require('mongoose')

const IncomeSchema = new mongoose.Schema({
  nickname: {type: 'string'},
  type: {type: 'string'},
  amount: {type: 'number'},
  notes: {type: 'string'},
  interval: {
    frequency: {type: 'string'},
    date: {type: 'number'},
    incomeDate1: {type: 'number'},
    incomeDate2: {type: 'number'},
    incomeWeekday: {type: 'number'}
  }
})

module.exports = mongoose.model("Income", IncomeSchema)