const mongoose = require('mongoose')
			Income = require('./IncomeModel').schema
			Debt = require('./DebtModel').schema
			Expense = require('./ExpenseModel').schema

const UserSchema = new mongoose.Schema({
	firstName: {type: 'string', required: true},
	lastName: {type: 'string', required: true},
	email: {type: 'string', required: true, unique: true},
	incomes: [Income],
	debts: [Debt],
	expenses: [Expense]
})

module.exports = mongoose.model("User", UserSchema)