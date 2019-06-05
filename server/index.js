const express = require('express')
const app = express()
const massive = require('massive')
const mongoose = require('mongoose')
require('dotenv').config()
const session = require('express-session')
const MDBCtrl = require('./mongoDBCtrl')
const authCtrl = require('./authController')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, MONGO_URI} = process.env

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 4
  }
}))

app.post('/auth/register', authCtrl.register)

app.post('/api/users/register', MDBCtrl.create)
//THIS CREATES A USER OBJECT IN THE MONGODB
//EXPECTS FIRSTNAME, LASTNAME, EMAIL ON REQ.BODY
app.get('/api/users', MDBCtrl.get)
//FETCHES USER OBJECT FROM MONGODB
//EXPECTS USER EMAIL AS A QUERY
app.post('/api/users/money', MDBCtrl.updateMoney)
//INITIALIZES INCOMES, DEBTS, AND EXPENSES
//EXPECTS 3 ARRAYS CALLED INCOMES, DEBTS, EXPENSES
//ALSO EXPECTS EMAIL AS A STRING FROM REQ.BODY
app.post('/api/list', MDBCtrl.fetchList)
//FETCHES THE LIST OF UPCOMING EVENTS
//EXPECTS EMAIL AS A QUERY
app.post('/api/list/incomes', MDBCtrl.addIncome)
//ADDS NEW INCOMES TO THE EXISTING ARRAY
//EXPECTS AN ARRAY ON REQ.BODY CALLED INCOMES OF AT LEAST ONE
//OBJECT IN THE INCOME FORMAT AND EMAIL AS A STRING
//ON REQ.BODY
app.post('/api/list/debts', MDBCtrl.addDebt)
//ADDS NEW DEBTS TO THE EXISTING ARRAY
//EXPECTS AN ARRAY ON REQ.BODY CALLED DEBTS OF AT LEAST ONE
//OBJECT IN THE DEBT FORMAT AND EMAIL AS A STRING
//ON REQ.BODY
app.post('/api/list/expenses', MDBCtrl.addExpense)
//ADDS NEW EXPENSES TO THE EXISTING ARRAY
//EXPECTS AN ARRAY ON REQ.BODY CALLED EXPENSES OF AT LEAST ONE
//OBJECT IN THE EXPENSE FORMAT AND EMAIL AS A STRING
//ON REQ.BODY
app.put('/api/list/incomes', MDBCtrl.editIncome)
//EDITS AN EXISTING INCOME. 
//EXPECTS THE ENTIRE INCOME OBJECT CALLED 'INCOME'
//AND EMAIL ON REQ.BODY
app.put('/api/list/debts', MDBCtrl.editDebt)
//EDITS AN EXISTING DEBT. 
//EXPECTS THE ENTIRE DEBT OBJECT CALLED 'DEBT'
//AND EMAIL ON REQ.BODY
app.put('/api/list/expenses', MDBCtrl.editExpense)
//EDITS AN EXISTING EXPENSE. 
//EXPECTS THE ENTIRE EXPENSE OBJECT CALLED 'EXPENSE'
//AND EMAIL ON REQ.BODY
app.delete('/api/list/incomes', MDBCtrl.deleteIncome)

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log(`Postgres DB Set`)
})

mongoose.connect(MONGO_URI, {useNewUrlParser: true}).then(mdb => {
  app.set('mdb', mdb)
  console.log(`Mongo DB Set`)
})

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))