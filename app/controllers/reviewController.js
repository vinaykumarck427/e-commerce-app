const express = require('express')
const Review = require('../models/review')
const router = express.Router()
const _ = require('lodash')
const authenticationUser = require('../middlewares/authinticationUser')


router.post('/', authenticationUser,(req,res) => {
          const {user} = req
          const review = new Review(req.body)
          review.user = user._id
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

module.exports = router

// router.get('/',authenticationUser,(req,res) => {
//           const {user} = req
          
// })