const mongoose = require('mongoose')

const DebtSchema = new mongoose.Schema({
  nickname: string,
  balance: number,
  interestRate: number,
  minimumPayment: number,
  notes: string
})

module.exports = mongoose.model("Debt", DebtSchema)