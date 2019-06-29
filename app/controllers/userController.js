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

module.exports = router