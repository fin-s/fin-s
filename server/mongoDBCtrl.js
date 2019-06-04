const User = require('./models/UserModel')
const Income = require('./models/IncomeModel')
const Debt = require('./models/DebtModel')
const Expense = require('./models/ExpenseModel')
const getList = require('./controllers/getList')

const updateIncome = (body) => {
  const schemas = []
  // var result = []
  const { incomes, email } = body

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
  }, {useFindAndModify: false}, function (err, data) {
    if(err) {
      console.log(`Error in updateIncome`)
    } else {
      return data
    }
  })
  return result
}

const updateDebt = (body) => {
  const schemas = []
  // var result = []
  const { debts, email } = body

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
  }, {useFindAndModify: false}, function (err, data) {
    if(err) {
      console.log(`Error in updateIncome`)
    } else {
      return data
    }
  })
  return result
}

const updateExpense = (body) => {
  const schemas = []
  // var result = []
  const { expenses, email } = body

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
  }, {useFindAndModify: false}, function (err, data) {
    if(err) {
      console.log(`Error in updateIncome`)
    } else {
      return data
    }
  })
  return result
}

module.exports = {
  create: function (req, res) {
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
  },

  get: function (req, res) {
    User.find({ email: req.query.email })
      .exec(function (err, data) {
        if (err) {
          res.error(500).send(err)
        } else {
          res.send(data[0])
        }
      })
  },

  updateMoney: async function (req, res) {
    const {body} = req

    let updatedIncome = await updateIncome(body)
    let updatedDebt = await updateDebt(body)
    let updatedExpenses = await updateExpense(body)

    res.status(200).send(updatedExpenses)
  },

  fetchList: async (req, res) => {
    const {email} = req.query
    let users = await User.find({email: email})
    let user = users[0]

    const {incomes, debts, expenses} = user

    let list = getList.getList(incomes, debts, expenses)
    res.status(200).send(list)
  },

  addIncome: async (req, res) => {
    const {email} = req.query
    const {incomes} = req.body

    let users = await User.find({email: email})
    let oldIncomes = users[0].incomes
    let newIncomes = [...oldIncomes, incomes]
    
    res.status(200).send(oldIncomes)
  }
}