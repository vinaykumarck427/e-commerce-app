const express = require('express')
const mongoose = require('./config/db')
mongoose.set('useFindAndModify', false);

const router = require('./app/controllers/userController')
const router2 =  require('./app/controllers/addressController')
const router3 = require('./app/controllers/categoryController')
const app = express()
const port = 3005
app.use(express.json())

app.use('/users',router)
app.use('/address', router2)
app.use('/categories',router3)

app.listen(port, () => {
  console.log('connect to port',port)
})