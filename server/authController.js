const bcrypt = require('bcryptjs')
const MDBCtrl = require('./mongoDBCtrl')

module.exports = {

  register: async (req, res) => {

    try {
      const db = req.app.get('db')
    const steps = [0,0,0,0,0,0,0,0,0,0]
    // console.log(req.body)
    const { email, firstName, lastName, password } = req.body
    const { session } = req
    let emailTaken = await db.checkEmail({ email })
    emailTaken = +emailTaken[0].count
    if (emailTaken !== 0) {
      return res.status(409).send(`Email is in use`)
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const user = await db.registerUser([email, firstName, lastName, hash, steps])

    delete user.hash

    session.user = {
      email,
      userId: user[0].users_id,
      authenticated: true
    }

    MDBCtrl.createUser(req, res)
    } catch (error) {
      console.log(error)
      res.status(500).send(`There was an error registering`)
    }
  },


  login: async (req, res) => {
    const db = req.app.get('db')
    // console.log(email, password)
    try {
      const { session } = req
      const { email, password } = req.body
      let users = await db.login({ email })
      const authenticated = bcrypt.compareSync(password, users[0].hash)
      if (authenticated) {
        session.user = {
          email,
          userId: users[0].users_login_id,
          authenticated: true
        }
        MDBCtrl.get(req,res)
      } else {
        return res.status(401).send('Email or password incorrect')
      }
    } catch (err) {
      res.status(500).send(`There was an error logging in`)
    }
  },


  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },


}
