const mongoose = require('mongoose')
// const User = require('../controllers/userController')

const Schema = mongoose.Schema

const addressSchema = new Schema({
          addressType: {
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

const Address = mongoose.model('Address',addressSchema)

module.exports = Address
