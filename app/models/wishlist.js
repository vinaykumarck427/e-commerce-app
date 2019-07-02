const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wishlistSchema = new Schema({
          user:{
                    type:Schema.Types.ObjectId,
                    ref:'User'
          },
          product:{
                    type:Schema.Types.ObjectId,
                    ref:'Product'
          }
})

const Wishlist = mongoose.model('Wishlist',wishlistSchema)

module.exports = Wishlist

// wishlist
// _id
// userId
// productId