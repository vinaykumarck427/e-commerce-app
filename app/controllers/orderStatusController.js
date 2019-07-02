const express = require('express')
const router = express.Router()

const _ = require('lodash')

const OrderStatus = require('../models/orderStatus')
const authenticationUser = require('../middlewares/authenticationUser')

router.post('/',authenticationUser,authenticateUser,(req,res) => {
          const orderStatus = new OrderStatus(req.body)
          orderStatus.save()
                    .then(statuses => {
                              res.json(statuses)
                    })
                    .catch(err => {
                              res.send(err)
                    })
})



module.exports = router