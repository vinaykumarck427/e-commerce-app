const express = require('express')
const Wishlist = require('../models/wishlist')
const _ = require('lodash')

router.post('/',authenticationUser,(req,res) => {
          const {user} = req
          const wishlist = new Wishlist(req.body)
          Wishlist.find({
                    user:user._id
          }).populate('product')
          .then(wishlist => {
                    res.send(_.pick(product, ['_id', 'productname', 'productprice', 'description', 'imgurl', 'category']))
          })
          .catch(err => {
                    res.send(err)
          })
})