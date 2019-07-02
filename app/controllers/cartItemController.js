const express = require('express')
const router = express.Router()

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

module.exports = router