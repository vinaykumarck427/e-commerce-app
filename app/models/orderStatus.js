const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderStatusSchema = new Schema({
          order:{
                    type:Schema.Types.ObjectId,
                    ref:'Order'
          },
          name:{
                    type:String,
                    required:true
          },
          createdAt:{
                    type:Date,
                    default:Date.now()
          }
})

const OrderStatus = mongoose.model('OrderStatus',orderStatusSchema)

module.exports = OrderStatus
// orderStatus
// _id
// orderId
// name
// createdAt 
