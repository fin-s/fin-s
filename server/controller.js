const bcrypt = require('bcryptjs')

module.exports = {

  register: async (req, res) => {
    const db = req.app.get('db')
    const { email, firstname, lastname, password } = req.body
    const { session } = req
    let emailTaken = await db.checkEmail({ email })
    emailTaken = +emailTaken[0].count
    if (emailTaken !== 0) {
      return res.sendStatus(409)
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const user_id = await db.registerUser({
      email,
      firstname,
      lastname,
      hash
    })
    session.user = {
      email,
      users_login_id: users_id[0]
    }
    res.sendStatus(200)
  },


  login: async (req, res) => {
    const db = req.app.get('db')
    const { session } = req
    const { loginEmail: email } = req.body
    try {
      let user = await db.login({ email })
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
