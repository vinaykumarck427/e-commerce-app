const express = require('express')
const Product = require('../models/product')
const router =  express.Router()
const _ = require('lodash')

router.post('/',authenticationUser,authenticateUser,(req,res) => {
          const body = req.body
          const product = new Product(body)
          product.save()
          .then(product => {
                    res.json(_.pick(product,['productname', 'productprice','description','imgurl','category']))
          })
          .catch(err => {
                    res.send(err)
          })
})

// router.get('/',(req,res) => {
//           Product.find()
//           .then(products => {
//                     res.json(products)
//           })
//           .catch(err => {
//                     res.send(err)
//           })
// })

// router.


module.exports = router