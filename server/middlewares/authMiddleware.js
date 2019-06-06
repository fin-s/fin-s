module.exports = {
  checkLogin: (req, res, next) => {
    let user = req.session.user

    // console.log(req.session)

    if(user){
      next()
    } else {
      res.send(`User not logged in`)
    }
  }
}