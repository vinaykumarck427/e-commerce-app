const mongoose = require('mongoose')
// const User = require('../controllers/userController')

const Schema = mongoose.Schema

const addressSchema = new Schema({
          type: {
                    type:String
          },
          street: {
                    type:String
          },
          city:{
                    type:String,
                    required:true
          },
          pin:{
                    type:Number,
                    required:true
          },
          landmark: {
                    type:String
          },
          user:{
                    type:Schema.Types.ObjectId,
                    ref:'User'
          }
})

// addressSchema.pre('save', function(next) {
//           const address = this
//           console.log(user._id)
//           console.log(address)
//           next()
// })

const Address = mongoose.model('Address',addressSchema)

module.exports = Address

// _id
//           - type
//           - street
//           - city
//           - pin
//           - landmark
//           - userId