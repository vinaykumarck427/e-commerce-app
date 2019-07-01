const express = require('express')
const mongoose = require('./config/db')
mongoose.set('useFindAndModify', false);

const router = require('./app/controllers/userController')
const router2 =  require('./app/controllers/addressController')
const app = express()
const port = 3005
app.use(express.json())

app.use('/address', router2)
app.use('/users',router)


app.listen(port, () => {
  console.log('connect to port',port)
})