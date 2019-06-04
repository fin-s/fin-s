const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
  nickname: {type: 'string'},
  amount: {type: 'number'},
  notes: {type: 'string'}
})

module.exports = mongoose.model("Expense", ExpenseSchema)