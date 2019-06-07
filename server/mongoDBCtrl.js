const User = require('./models/UserModel')
const Income = require('./models/IncomeModel')
const Debt = require('./models/DebtModel')
const Expense = require('./models/ExpenseModel')
const getList = require('./controllers/getList')
const {showCalendarList} = require('./controllers/getCalendarList')

const updateIncome = (incomes, email) => {
  const schemas = []

  incomes.forEach(element => {
    let newIncome = new Income();
    newIncome.nickname = element.nickname;
    newIncome.type = element.type;
    newIncome.amount = element.amount;
    newIncome.notes = element.notes;
    newIncome.interval = element.interval
    schemas.push(newIncome)
  })

  let result = User.findOneAndUpdate({ email: email }, {
    $set: { incomes: schemas }
  }, { useFindAndModify: false }, function (err, data) {
    if (err) {
      console.log(`Error in updateIncome`)
    } else {
      return data
    }
  })
  return result
}

const updateDebt = (debts, email) => {
  const schemas = []

  debts.forEach(element => {
    let newDebt = new Debt();
    newDebt.nickname = element.nickname;
    newDebt.balance = element.balance;
    newDebt.interestRate = element.interestRate;
    newDebt.dueDate = element.dueDate;
    newDebt.minimumPayment = element.minimumPayment;
    newDebt.actualPayment = element.actualPayment;
    newDebt.notes = element.notes;
    schemas.push(newDebt)
  })

  let result = User.findOneAndUpdate({ email: email }, {
    $set: { debts: schemas }
  }, { useFindAndModify: false }, function (err, data) {
    if (err) {
      console.log(`Error in updateIncome`)
    } else {
      return data
    }
  })
  return result
}

const updateExpense = (expenses, email) => {
  const schemas = []

  expenses.forEach(element => {
    let newExpense = new Expense();
    newExpense.nickname = element.nickname;
    newExpense.dueDate = element.dueDate;
    newExpense.amount = element.amount;
    newExpense.notes = element.notes
    schemas.push(newExpense)
  })

  let result = User.findOneAndUpdate({ email: email }, {
    $set: { expenses: schemas }
  }, { useFindAndModify: false }, function (err, data) {
    if (err) {
      console.log(`Error in updateIncome`)
    } else {
      return data
    }
  })
  return result
}

module.exports = {
  createUser: function (req, res) {

    try {
      let newUser = new User();
      newUser.firstName = req.body.firstName;
      newUser.lastName = req.body.lastName;
      newUser.email = req.body.email;
      newUser.incomes = [];
      newUser.debts = [];
      newUser.expenses = [];
      newUser.save(function (err, data) {
        if (err) {
          console.log(`you have an error in mdbCtrl create method`, err)
          throw err;
        } else {
          res.send(data)
        }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send(`Error creating user`)
    }


  },

  get: function (req, res) {

    try {
      User.find({ email: req.session.user.email })
        .exec(function (err, data) {
          if (err) {
            res.error(500).send(err)
          } else {
            res.send(data[0])
          }
        })
    } catch (error) {
      console.log(error)
      res.status(500).send(`Error fetching user data`)
    }
  },

  updateMoney: async function (req, res) {

    try {
      const { incomes, debts, expenses } = req.body
      const { email } = req.session.user

      let updatedIncome = await updateIncome(incomes, email)
      let updatedDebt = await updateDebt(debts, email)
      let updatedExpenses = await updateExpense(expenses, email)

      res.status(200).send(updatedExpenses)
    } catch (error) {
      console.log(error)
      res.status(500).send(`Error updating user events`)
    }
  },

  fetchList: async (req, res) => {

    try {
      const { email } = req.session.user
      let users = await User.find({ email: email })
      let user = users[0]

      const { incomes, debts, expenses } = user
      // console.log(incomes)

      let list = getList.getList(incomes, debts, expenses)
      res.status(200).send(list)
    } catch (error) {
      console.log(error)
      res.status(500).send(`There was an error fetching the list`)
    }
  },

  fetchCalendarList: async (req, res) => {
    const {email} = req.session.user

    let users = await User.find({email: email})
    let user = users[0]
    const {incomes, debts, expenses} = user
    let list = getList.getList(incomes, debts, expenses)
    res.status(200).send(list)
  },

  addIncome: async (req, res) => {

    try {
      const { incomes } = req.body
      const { email } = req.session.user

      let users = await User.find({ email: email })
      let oldIncomes = users[0].incomes
      let newIncomes = [...oldIncomes, ...incomes]

      let update = await updateIncome(newIncomes, email)

      res.status(200).send(update)
    } catch (error) {
      console.log(error)
      res.status(500).send(`There was an error adding income`)
    }
  },

  addDebt: async (req, res) => {

    try {
      const { debts } = req.body
      const { email } = req.session.user

      let users = await User.find({ email: email })
      let oldDebts = users[0].debts
      let newDebts = [...oldDebts, ...debts]

      let update = await updateDebt(newDebts, email)

      res.status(200).send(update)
    } catch (error) {
      console.log(error)
      res.status(500).send(`There was an error adding debt`)
    }
  },

  addExpense: async (req, res) => {

    try {
      const { expenses } = req.body
      const { email } = req.session.user

      let users = await User.find({ email: email })
      let oldExpenses = users[0].expenses
      let newExpenses = [...oldExpenses, ...expenses]

      let update = await updateExpense(newExpenses, email)

      res.status(200).send(update)
    } catch (error) {
      console.log(error)
      res.status(500).send(`There was an error adding expense`)
    }
  },

  editIncome: async (req, res) => {

    try {
      const { income } = req.body
      const { email } = req.session.user
      User.updateOne({
        email: email, "incomes._id": income._id
      },
        {
          $set: {
            "incomes.$.nickname": income.nickname,
            "incomes.$.type": income.type,
            "incomes.$.amount": income.amount,
            "incomes.$.notes": income.notes,
            "incomes.$.interval.frequency": income.interval.frequency,
            "incomes.$.interval.incomeDate1": income.interval.incomeDate1,
            "incomes.$.interval.incomeDate2": income.interval.incomeDate2,
            "incomes.$.interval.incomeWeekday": income.interval.incomeWeekday
          }
        }).exec((err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send(data)
          }
        })
    } catch (error) {
      console.log(error)
      res.status(500).send(`There was an error editing income`)
    }
  },

  editDebt: async (req, res) => {

    try {
      const { debt } = req.body
      const { email } = req.session.user
      User.updateOne({
        email: email, "debts._id": debt._id
      },
        {
          $set: {
            "debts.$.nickname": debt.nickname,
            "debts.$.balance": debt.balance,
            "debts.$.interestRate": debt.interestRate,
            "debts.$.dueDate": debt.dueDate,
            "debts.$.minimumPayment": debt.minimumPayment,
            "debts.$.actualPayment": debt.actualPayment,
            "debts.$.notes": debt.notes
          }
        }).exec((err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send(data)
          }
        })
    } catch (error) {
      console.log(error)
      res.status(500).send(`There was an error editing debt`)
    }
  },

  editExpense: async (req, res) => {

    try {
      const { expense } = req.body
      const { email } = req.session.user
      User.updateOne({
        email: email, "expenses._id": expense._id
      },
        {
          $set: {
            "expenses.$.nickname": expense.nickname,
            "expenses.$.amount": expense.amount,
            "expenses.$.dueDate": expense.dueDate,
            "expenses.$.notes": expense.notes
          }
        }).exec((err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send(data)
          }
        })
    } catch (error) {
      console.log(error)
      res.status(500).send(`There was an error editing expenses`)
    }
  },

  deleteIncome: (req, res) => {

    try {
      const { income } = req.body
      const { email } = req.session.user
      User.updateOne({ email: email },
        {
          $pull: { "incomes": { _id: income._id } }
        })
        .exec((err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send(data)
          }
        })
    } catch (error) {
      console.log(error)
      res.status(500).send(`There was an error deleting income`)
    }
  },

  deleteDebt: (req, res) => {

    try {
      const { debt } = req.body
      const { email } = req.session.user
      User.updateOne({ email: email },
        {
          $pull: { "debts": { _id: debt._id } }
        })
        .exec((err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send(data)
          }
        })
    } catch (error) {
      console.log(error)
      res.status(500).send(`There was an error editing debt`)
    }
  },

  deleteExpense: (req, res) => {

    try {
      const { expense } = req.body
      const { email } = req.session.user
      User.updateOne({ email: email },
        {
          $pull: { "expenses": { _id: expense._id } }
        })
        .exec((err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send(data)
          }
        })
    } catch (error) {
      console.log(error)
      res.status(500).send(`There was an error editing expense`)
    }
  }


}