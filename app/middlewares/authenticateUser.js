const User = require('../models/user')

const authenticateUser = (req,res,next) => {
          const {user} = req
          if(user.isAdmin === true){
                    req.user = user
          } else {
                    res.status('401').send('user must be admin')
          }
          next()         
}
module.exports = authenticateUser