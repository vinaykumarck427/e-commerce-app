const express = require('express')
const mongoose = require('./config/db')
const router = require('./app/controllers/userController')
mongoose.set('useFindAndModify', false);

const app = express()
const port = 3005
app.use(express.json())

app.use('/users',router)

app.listen(port, () => {
  console.log('connect to port',port)
})