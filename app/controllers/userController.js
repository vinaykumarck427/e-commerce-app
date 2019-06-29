const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/register', (req,res) => {
  const body =  req.body
  const user = new User(body)
  user.save()
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.send(err)
    })
})

router.post('/login', (req,res) => {
  const body = req.body
  User.findByCredentials(body.email, body.password)
  .then(user => {
    return user.generateToken()
  })
  .then(token => {
    res.send({token:token})
  })
  .catch(err => {
    res.send(err)
  })
})

// router.delete('/logout',authenticationUser,function(req,res){
//   const {user,token} = req
//   User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
// })
module.exports = router