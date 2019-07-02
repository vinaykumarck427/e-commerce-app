const express = require('express')
const router = express.Router()

const _ = require('lodash')

const OrderStatus = require('../models/orderStatus')
const authenticationUser = require('../middlewares/authenticationUser')
const authenticateUser = require('../middlewares/authenticateUser')


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

router.get('/',(req,res) => {
          const id = req.query.orderId
          OrderStatus.find({
                    order:id
          })
                    .then(orderStatus => {
                              res.json(orderStatus)
                    })
                    .catch(err => {
                              res.send(err)
                    })
})

router.get('/:id',(req,res) => {
          const id = req.params.id
          OrderStatus.findById(id).populate('order', ['orderCode'])
          .then(orderStatus => {
                    res.json(orderStatus)
          })
          .catch(err => {
                    res.send(err)
          })
})

// router.get('/:id', (req, res) => {
//           const id = req.params.id
//           OrderStatus.findOne({
//                     order: id
//           }).populate('order', ['orderCode'])
//                     .then(orderStatus => {
//                               res.json(orderStatus)
//                     })
//                     .catch(err => {
//                               res.send(err)
//                     })
// })

module.exports = router