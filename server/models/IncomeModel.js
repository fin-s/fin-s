const mongoose = require('mongoose')

const IncomeSchema = new mongoose.Schema({
  nickname: string,
  type: string,
  amount: number,
  notes: string,
  interval: {
    frequency: string,
    date: number,
    weekDay1: number,
    weekDay2: number
  }
})

module.exports = mongoose.model("Income", IncomeSchema)