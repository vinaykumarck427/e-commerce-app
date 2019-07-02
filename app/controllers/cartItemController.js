const express = require('express')
const router = express.Router()
const _ = require('lodash')

const CartItem = require('../models/cart-item')
const authenticationUser = require('../middlewares/authinticationUser')

router.post('/',authenticationUser,(req,res) => {
          const {user} = req
          const cartItem = new CartItem(req.body)
          cartItem.user = user._id
          cartItem.save()
          .then(cartItem => {
                    res.json(cartItem)
          })
          .catch(err => {
                    res.send(err)
          })
})

router.get('/',authenticationUser,(req,res)=> {
          const {user} = req
          CartItem.find()
          .then(cartitems => {
                    res.json(cartitems)
          })
          .then(err => {
                    res.send(err)
          })
})

router.get('/:id', authenticationUser,(req,res) => {
          const {user} = req
          const id = req.params.id
          CartItem.findOne({
                    _id:id,
                    user:user._id
          }).populate('product', ['_id', 'productname', 'productprice', 'description', 'imgurl'])
          .then(cartItem => {
                    res.send(_.pick(cartItem, ['product','quantity']))
          })
          .catch(err => {
                    res.send(err)
          })
})

router.put('/:id', authenticationUser,(req,res) => {
          const id = req.params.id
          const {user} = req
          CartItem.findOneAndUpdate({
                    _id:id,
                    user:user._id
          }, { $set: req.body }, { new: true }).populate('product', ['_id', 'productname', 'productprice', 'description', 'imgurl'])
          .then(cartItem => {
                    res.send(_.pick(cartItem, ['product', 'quantity']))
          })
          .catch(err => {
                    res.send(err)
          })
})

router.delete('/:id',authenticationUser,(req,res) => {
          const {user} = req
          const id = req.params.id
          CartItem.findOneAndDelete({
                    _id:id,
                    user:user._id
          })
          .then(cartItem => {
                    res.json(cartItem)
          })
          .catch(err => {
                    res.send(err)
          })
})
module.exports = router