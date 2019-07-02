const express = require('express')
const router = express.Router()
const Wishlist = require('../models/wishlist')
const _ = require('lodash')
const authenticationUser = require('../middlewares/authinticationUser')

router.post('/',authenticationUser,(req,res) => {
          const {user} = req
          const wishlist = new Wishlist(req.body)
          wishlist.user = user._id
          wishlist.save()
          .then(wishlists => {
                    res.json(wishlists)
          })
          .catch(err => {
                    res.send(err)
          })
})

router.get('/',authenticationUser,(req,res)=>{
          const {user} = req
          Wishlist.find({
                    user:user._id
          }).populate('user',['_id','name']).populate('product', ['_id', 'productname', 'productprice', 'description', 'imgurl', 'category'])
          .then(wishlists => {
                    console.log(wishlists)
                    res.json(wishlists)
          })
          .then(err => {
                    res.send(err)
          })
})
// router.get()
module.exports = router