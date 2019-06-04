const mongoose = require('mongoose')

const IncomeSchema = new mongoose.Schema({
  nickname: {type: string},
  type: {type: string},
  amount: {type: number},
  notes: {type: string},
  interval: {
    frequency: {type: string},
    date: {type: number},
    weekDay1: {type: number},
    weekDay2: {type: number}
  }
})

module.exports = mongoose.model("Income", IncomeSchema)