const express = require('express')
const Review = require('../models/review')
const router = express.Router()
const _ = require('lodash')
const authenticationUser = require('../middlewares/authenticationUser')


router.post('/', authenticationUser,(req,res) => {
          const {user} = req
          const review = new Review(req.body)
          review.user = user._id
          review.product = req.query.productId
          review.save()
          .then(review => {
                    res.json(review)
          })
          .catch(err => {
                    res.send(err)
          })
})

router.get('/',(req,res) => {
          Review.find()
          .then(reviews => {
                    res.json(reviews)
          })
          .catch(err => {
                    res.send(err)
          })
})

router.get('/:id',(req,res) => {
          const id = req.params.id
          Review.findById(id).populate('user',['_id','name']).populate('product',['_id','productname'])
          .then(review => {
                    res.json(review)
          })
          .catch(err => {
                    res.send(err)
          })
})

router.put('/:id',authenticationUser,(req,res) => {
          const id =  req.params.id
          const {user} = req
          Review.findOneAndUpdate({
                    _id:id,
                    user:user._id
          },{$set:req.body},{new:true}).populate('user', ['_id', 'name'],['_id', 'productname'])
          .then(review => {
                    res.json(review)
          })
          .catch(err => {
                    res.send(err)
          })
})

router.delete('/:id',authenticationUser,(req,res) => {
          const id = req.params.id
          const {user} = req
          Review.findOneAndDelete({
                    _id:id,
                    user:user._id
          })
          .then(review => {
                    res.json(review)
          })
          .catch(err => {
                    res.send(err)
          })
})

module.exports = router

// router.get('/',authenticationUser,(req,res) => {
//           const {user} = req
          
// })