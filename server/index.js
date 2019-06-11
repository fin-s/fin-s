const express = require('express')
const app = express()
const massive = require('massive')
const mongoose = require('mongoose')
require('dotenv').config()
const session = require('express-session')
const MDBCtrl = require('./mongoDBCtrl')
const authCtrl = require('./authController')
const authMiddleware = require('./middlewares/authMiddleware')
const userCTRL = require('./controllers/userController')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, MONGO_URI} = process.env

mongoose.set('useCreateIndex', true)

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 4
  }
}))

app.post('/auth/login', authCtrl.login)
//LOGS USER IN
//EXPECTS email AND password ON REQ.BODY
app.post('/auth/register', authCtrl.register)
//REGISTERS A NEW USER
//EXPECTS firstName, lastName, email, password ON REQ.BODY
app.delete('/auth/logout', authCtrl.logout)
app.post('/api/users/register', MDBCtrl.createUser)
//THIS CREATES A USER OBJECT IN THE MONGODB
//THIS IS NOW DEPRECATED, DO NOT USE IT
//EXPECTS firstName, lastName, email ON REQ.BODY
app.get('/api/users', authMiddleware.checkLogin, MDBCtrl.get)
//FETCHES USER OBJECT FROM MONGODB
//EXPECTS USER email AS A STRING ON REQ.BODY
app.post('/api/users/money', MDBCtrl.updateMoney)
//INITIALIZES INCOMES, DEBTS, AND EXPENSES
//EXPECTS 3 ARRAYS CALLED incomes, debts, expenses
//ALSO EXPECTS email AS A STRING FROM REQ.BODY
app.get('/api/list', authMiddleware.checkLogin, MDBCtrl.fetchList)
//FETCHES THE LIST OF UPCOMING EVENTS
//EXPECTS email AS A QUERY
app.get('/api/calendar', MDBCtrl.fetchCalendarList)
//DO NOT USE THIS ENDPOINT
//IT HAS BEEN DEPRECATED
app.post('/api/list/incomes', MDBCtrl.addIncome)
//ADDS NEW INCOMES TO THE EXISTING ARRAY
//EXPECTS AN ARRAY ON REQ.BODY CALLED incomes OF AT LEAST ONE
//OBJECT IN THE INCOME FORMAT AND email AS A STRING
//ON REQ.BODY
app.post('/api/list/debts', MDBCtrl.addDebt)
//ADDS NEW DEBTS TO THE EXISTING ARRAY
//EXPECTS AN ARRAY ON REQ.BODY CALLED debts OF AT LEAST ONE
//OBJECT IN THE DEBT FORMAT AND email AS A STRING
//ON REQ.BODY
app.post('/api/list/expenses', MDBCtrl.addExpense)
//ADDS NEW EXPENSES TO THE EXISTING ARRAY
//EXPECTS AN ARRAY ON REQ.BODY CALLED expenses OF AT LEAST ONE
//OBJECT IN THE EXPENSE FORMAT AND email AS A STRING
//ON REQ.BODY
app.put('/api/list/incomes', MDBCtrl.editIncome)
//EDITS AN EXISTING INCOME. 
//EXPECTS THE ENTIRE INCOME OBJECT CALLED income
//AND email ON REQ.BODY
app.put('/api/list/debts', MDBCtrl.editDebt)
//EDITS AN EXISTING DEBT. 
//EXPECTS THE ENTIRE DEBT OBJECT CALLED debt
//AND email ON REQ.BODY
app.put('/api/list/expenses', MDBCtrl.editExpense)
//EDITS AN EXISTING EXPENSE. 
//EXPECTS THE ENTIRE EXPENSE OBJECT CALLED expense
//AND email ON REQ.BODY
app.delete('/api/list/incomes', MDBCtrl.deleteIncome)
//Deletes AN income from the users income array
// needs Income._id and email on Req.body
app.delete('/api/list/debts', MDBCtrl.deleteDebt)
//Deletes AN income from the users income array
// needs Debt._id and email on Req.body
app.delete('/api/list/expenses', MDBCtrl.deleteExpense)
//Deletes AN income from the users income array
// needs Expense._id and email on Req.body
app.get('/api/todos', userCTRL.getList)
//GETS THE USERS TODO LIST
//PULLS EMAIL FROM SESSION
app.post('/api/todos', userCTRL.setList)
//UPDATES THE USERS TODO LIST
//NEEDS AN ARRAY OF 12 ITEMS CALLED stepsCompleted

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log(`Postgres DB Set`)
})

mongoose.connect(MONGO_URI, {useNewUrlParser: true}).then(mdb => {
  app.set('mdb', mdb)
  console.log(`Mongo DB Set`)
})

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))