const bcrypt = require('bcryptjs')
const MDBCtrl = require('./mongoDBCtrl')

module.exports = {

  register: async (req, res) => {
    const db = req.app.get('db')
    console.log(req.body)
    const { email, firstName, lastName, password } = req.body
    const { session } = req
    let emailTaken = await db.checkEmail({ email })
    emailTaken = +emailTaken[0].count
    if (emailTaken !== 0) {
      return res.status(409).send(`Email is in use`)
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const user = await db.registerUser([email, firstName, lastName, hash])

    delete user.hash

    session.user = {
      email,
      userId: user[0].users_id,
      authenticated: true
    }

    MDBCtrl.createUser(req, res)
  },


  login: async (req, res) => {
    const db = req.app.get('db')
    const { session } = req
    const { email, password } = req.body
    console.log(email, password)
    try {
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
      res.sendStatus(401)
    }
  },


  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },


}
