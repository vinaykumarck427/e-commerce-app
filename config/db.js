const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/e-commerce-web-app', {useNewUrlParser:true, useCreateIndex:true})
.then(() => {
  console.log('successfully connecting to db' )
})
.catch(() => {
  console.log('unsuccessfull to connecting to db')
})

module.exports = mongoose