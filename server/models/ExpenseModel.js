const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
  nickname: string,
  amount: number,
  notes: string
})

module.exports = mongoose.model("Expense", ExpenseSchema)