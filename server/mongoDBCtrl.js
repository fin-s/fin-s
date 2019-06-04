const User = require('./models/UserModel')
const Income = require('./models/IncomeModel')
const Debt = require('./models/DebtModel')
const Expense = require('./models/ExpenseModel')

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
    // const schemas = []
    // const { incomes, email } = body

    // // console.log(incomes)

    // incomes.forEach(element => {
    //   let newIncome = new Income();
    //   newIncome.nickname = element.nickname;
    //   newIncome.type = element.type;
    //   newIncome.amount = element.amount;
    //   newIncome.notes = element.notes;
    //   newIncome.interval = element.interval
    //   schemas.push(newIncome)
    // })

    // User.findOneAndUpdate({ email: email }, {
    //   $set: { incomes: schemas }
    // }, function (err, data) {
    //   console.log(err, data)
    // })

    const {body} = req

    let updatedIncome = await updateIncome(body)

    res.status(200).send(updatedIncome)
  }
}