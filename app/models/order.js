const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
          user:{
                    type:Schema.Types.ObjectId,
                    ref:'User'
          },
          address:{
                    type: Schema.Types.ObjectId,
                    ref:'Address'
          },
          paymentMethod:{
                    type:String
          },
          total:{
                    type:Number
          },
          createdAt:{
                    type:Date,
                    default:Date.now()
          },
          orderCode: {
                    type:String,
                    required:true
          },
          orderLineItem: [{
                    product:{
                              type:Schema.Types.ObjectId,
                              ref:'Product'
                    },
                    price:{
                              type:Number
                    },
                    qauntity:{
                              type:Number
                    }
          }]
})

const Order = mongoose.model('Order',orderSchema)

module.exports = Order

// order
// _id
// userId
// addressId
// paymentMethod
// total
// createdAt
// orderCode
// orderLineItems[
//           {
//                     productId, price, quantity
//           }
// ]