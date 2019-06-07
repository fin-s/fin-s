module.exports = {
  getList: async (req, res) => {
    const db = req.app.get('db')

    try {
      if(req.session.user) {
        const {email} = req.session.user
        let list = await db.getTodos([email])
        res.status(200).send(list[0].steps)
      } else {
        throw new Error()
      }
    } catch (error) {
      console.log(error)
      res.status(500).send(`Error getting todos`)
    }


  },

  setList: async (req, res) => {
    const db = req.app.get('db')
    console.log(`req.body userCtrl.setList`,req.body)
    try {
      const { stepsCompleted } = req.body
      console.log(`stepsCompleted setList userController.js`, stepsCompleted)
      if (stepsCompleted.length === 12) {
        await db.setList([req.session.user.email, stepsCompleted])

        res.sendStatus(200)
      } else {
        return res.status(500).send(`Wrong array length`)
      }

    } catch (error) {
      console.log(error)
      res.status(500).send(`Error editing todos`)
    }

  }
}