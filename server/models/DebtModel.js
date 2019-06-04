const mongoose = require('mongoose')

const DebtSchema = new mongoose.Schema({
  nickname: {type: 'string'},
  balance: {type: 'number'},
  interestRate: {type: 'number'},
  dueDate: {type: 'number'},
  minimumPayment: {type: 'number'},
  actualPayment: {type: 'number'},
  notes: {type: 'string'}
})

module.exports = mongoose.model("Debt", DebtSchema)