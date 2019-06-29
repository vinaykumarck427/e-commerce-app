const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema
const userSchema = new Schema({
  name:{
    type:String,
    required:true,
    unique:true,
    minlength:5
  },
  email: {
    type:String,
    // required:true,
    unique:true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value)
      },
      message: function(){
        return ('invalid email entered, please give correct email')
      }
    }
  },
  password: {
    type: String,
    required:true,
    minlength: 6,
    maxlength: 128
  },
  tokens:[{
    token: {
      type:String
    },
    createdAt: {
      type:Date,
      default:Date.now
    }
  }]
})

userSchema.pre('save', function(next) {
  const user = this
  if(user.isNew){
    bcryptjs.genSalt(10)
    .then(function(salt){
      bcryptjs.hash(user.password,salt)
      .then(function(encryptedPassword) {
        user.password = encryptedPassword
        next()
      })
    })
  }else{
    next()
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
