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

router.get('/',authenticationUser,(req,res) => {
          const {user} = req
          Order.find({
                    user:user._id
          })
                    .then(orders => {
                              res.json(orders)
                    })
                    .catch(err => {
                              res.send(err)
                    })
})

router.get('/:id',authenticationUser,(req,res) => {
          const {user} = req
          const id = req.params.id
          Order.findOne({
                    _id:id,
                    user:user._id
          }).populate('user',['_id','name']).populate('product',['_id','productPrice','description','productName','imgUrl']).populate('address',['street','city','pincode','landmark'])
                    .then(order => {
                              res.send(_.pick(order, ['_id','user', 'total', 'orderCode', 'address', 'orderLineItem', 'paymentMethod','createdAt']))
                    })
                    .catch(err => {
                              res.send(err)
                    })
})

router.put('/:id',authenticationUser,(req,res) => {
          const {user} = req
          const id = req.params.id
          Order.findOneAndUpdate({
                    _id:id,
                    user:user._id
          }, { $set: req.body }, { new: true }).populate('user', ['_id', 'name']).populate('product', ['_id', 'productPrice', 'description', 'productName', 'imgUrl']).populate('address', ['street', 'city', 'pincode', 'landmark'])
                    .then(order => {
                              res.json(_.pick(order, ['user', 'total', 'orderCode', 'address', 'orderLineItem', 'paymentMethod', 'createdAt']))
                    })
                    .catch(err => {
                              res.send(err)
                    })
})

router.delete('/:id',authenticationUser,(req,res) => {
          const { user } = req
          const id = req.params.id
          Order.findOneAndDelete({
                    _id:id,
                    user:user._id
          })
                    .then(order => {
                              res.json(order)
                    })
                    .catch(err => {
                              req.send(err)
                    })
})

module.exports = router