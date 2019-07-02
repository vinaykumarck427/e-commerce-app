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
    required:true,
    unique:true,
    validate: {
      validator: function(value) {
        return validator.isEmail(value)
      },
      message: function(value){
        return 'invalid email entered, please give correct email'
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
  }],
  isAdmin: {
    type:Boolean,
    default:false
  }
})

userSchema.pre('save', function(next) {
  const user = this
  if(user.isNew){
    console.log('user new',user)
    bcryptjs.genSalt(10)
    .then(function(salt){
      bcryptjs.hash(user.password,salt)
      .then(function(encryptedPassword){
        console.log(encryptedPassword)
        user.password = encryptedPassword
        next()
      })
    })
  }else{
    next()
  }
})

// own Static method

userSchema.statics.findByCredentials = function(email,password){
  const User = this
  return User.findOne({email})
  .then(function(user){
    if(!user){
      return Promise.reject({errors:'invalid email'})
    }
    return bcryptjs.compare(password, user.password)
      .then(result => {
        if(result){
          return Promise.resolve(user)
        }else{
          return Promise.reject({ errors: 'invalid password' })
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  })
  .catch(err => {
    return Promise.reject(err)
  })
}

// own instance methods 

userSchema.methods.generateToken = function(){
  const user = this
  const tokenData = {
    _id: user._id,
    name: user.name,
    createdAt: Number(new Date())
  }
  const token = jwt.sign(tokenData, 'vinay@427')
  user.tokens.push({token})

  return user.save()
    .then(function(user){
      return Promise.resolve(token)
    })
    .catch(function(err){
      return Promise.reject(err)
    })
}

userSchema.statics.findByToken = function(token){
  const User = this
  let tokenData
  try{
      tokenData = jwt.verify(token, 'vinay@427')
  } catch(err){
      return Promise.reject(err)
  }
  return User.findOne({
    _id:tokenData._id,
    'tokens.token':token
  })
}
const User = mongoose.model('User', userSchema)

module.exports = User
