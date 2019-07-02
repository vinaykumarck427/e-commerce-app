const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const Address = require('../models/address')
const _ = require('lodash')
const authenticationUser=require('../middlewares/authenticationUser')

router.post('/',authenticationUser,(req,res) => {
          const {user} = req
          const order = new Order(req.body)
          order.user = user._id
          order.save()
          .then(order => {
                    res.json(order)
          })
          .catch(err => {
                    res.send(err)
          })
})


module.exports = router