const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartItemSchema = new Schema({
    user:{
              type:Schema.Types.ObjectId,
              ref:'User'
    },
    product:[{
              type: Schema.Types.ObjectId,
              ref:'Product'
    }],
    quantity:{
              type: Number,
              required:true
    }
})

const CartItem = mongoose.model('CartItem', cartItemSchema)

module.exports = CartItem

// cartLineItem - CRUD
// _id
// userId
// productId
// quantity