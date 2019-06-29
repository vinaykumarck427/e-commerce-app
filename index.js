const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3005

app.listen(port, () => {
  console.log('connect to port',port)
})