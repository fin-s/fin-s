const mongoose = require('mongoose')

const IncomeSchema = new mongoose.Schema({
  nickname: {type: string},
  type: {type: string},
  amount: {type: number},
  notes: {type: string},
  interval: {
    frequency: {type: String},
    date: {type: Number},
    weekDay1: {type: Number},
    weekDay2: {type: Number}
  }
})

module.exports = mongoose.model("Income", IncomeSchema)