const User = require('./models/UserModel')
const Income = require('./models/IncomeModel')
const Debt = require('./models/DebtModel')
const Expense = require('./models/ExpenseModel')

module.exports = {
  create: function(req, res){
    let newUser = new User();
    newUser.Firstname = req.body.Firstname;
    newUser.Lastname = req.body.Lastname;
    newUser.Email = req.body.Email;
    newUser.Incomes = [];
    newUser.Debts = [];
    newUser.Expenses = [];
    newUser.save(function(err, data){
      if(err) {
        console.log(`you have an error in mdbCtrl create method`, err)
        throw err;
      } else {
        res.send(data)
      }
    })
  },

  get: function(req, res){
    User.find(req.query)
    .exec(function(err, data){
      if(err){
        res.error(500).send(err)
      } else {
        res.send(data)
      }
    })
  },

  updateMoney: function(req, res){
    User.findByIdandUpdate(req.query.Email, req.body, function(err, data){
      if(err){
        res.error(500).send(err)
      } else {
        res.send(data)
      }
    })
  }

  // editUser: function(req, res){

  // }
}