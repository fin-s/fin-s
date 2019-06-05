const bcrypt = require('bcryptjs')
const MDBCtrl = require('./mongoDBCtrl')

module.exports = {

  register: async (req, res) => {
    const db = req.app.get('db')
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
      userId: user[0].user_id
    }
    res.status(200).send(user)
  },


  login: async (req, res) => {
    const db = req.app.get('db')
    const { session } = req
    const { loginEmail: email } = req.body
    try {
      let users = await db.login({ email })
      session.user = users[0]
      const authenticated = bcrypt.compareSync(req.body.loginPassword, users[0].password)
      if (authenticated) {
        res.status(200).send({ authenticated, users_id: users[0].login_id })
      } else {
        throw new Error(401)
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
