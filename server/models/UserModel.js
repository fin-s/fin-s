const mongoose = require('mongoose')
			Income = require('./IncomeModel')
			Debt = require('./DebtModel')
			Expense = require('./ExpenseModel')

const UserSchema = new mongoose.Schema({
	Firstname: {type: string, required: true},
	Lastname: {type: string, required: true},
	Email: {type: string, required: true},
	Incomes: [Income],
	Debts: [Debt],
	Expenses: [Expense]
})

module.exports = mongoose.model("User", UserSchema)