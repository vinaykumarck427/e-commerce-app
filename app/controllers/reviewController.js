const express = require('express')
const Review = require('../models/review')
const router = express.Router()
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
module.exports = router

// router.get('/',authenticationUser,(req,res) => {
//           const {user} = req
          
// })