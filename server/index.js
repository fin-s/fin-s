const express = require('express')
const app = express()
const massive = require('massive')
const mongoose = require('mongoose')
require('dotenv').config()
const session = require('express-session')
const MDBCtrl = require('./mongoDBCtrl')

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

app.post('/api/users/register', MDBCtrl.create)
app.get('/api/users', MDBCtrl.get)
app.post('/api/users/money', MDBCtrl.updateMoney)
app.post('/api/list', MDBCtrl.fetchList)
app.post('/api/list/incomes', MDBCtrl.addIncome)
app.post('/api/list/debts', MDBCtrl.addDebt)
app.post('/api/list/expenses', MDBCtrl.addExpense)
app.put('/api/list/incomes', MDBCtrl.editIncome)
app.put('/api/list/debts', MDBCtrl.editDebt)
app.put('/api/list/expenses', MDBCtrl.editExpense)

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log(`Postgres DB Set`)
})

mongoose.connect(MONGO_URI, {useNewUrlParser: true}).then(mdb => {
  app.set('mdb', mdb)
  console.log(`Mongo DB Set`)
})

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))