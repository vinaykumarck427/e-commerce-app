const express = require('express')
const mongoose = require('./config/db')
mongoose.set('useFindAndModify', false);

const userRouter = require('./app/controllers/userController')
const addressRouter =  require('./app/controllers/addressController')
const categoryRouter = require('./app/controllers/categoryController')
const productRouter = require('./app/controllers/productController')
const reviewRouter = require('./app/controllers/reviewController')
const cartItemRouter = require('./app/controllers/cartItemController')
const wishlistRouter = require('./app/controllers/wishlistController')


const app = express()
const port = 3005
app.use(express.json())

app.use('/users',userRouter)
app.use('/address', addressRouter)
app.use('/categories',categoryRouter)
app.use('/products', productRouter)
app.use('/reviews', reviewRouter)
app.use('/cartitems', cartItemRouter)
app.use('/wishlists', wishlistRouter)



app.listen(port, () => {
  console.log('connect to port',port)
})