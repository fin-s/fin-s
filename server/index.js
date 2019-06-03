const express = require('express')
const app = express()
const massive = require('massive')
const mongoose = require('mongoose')
require('dotenv').config()
const session = require('express-session')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 4
  }
}))

massive(CONNECTION_STRING).then(db => {
  app.set('db')
  console.log(`DB Set`)
})

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))