const express = require('express')
const Product = require('../models/product')
const router =  express.Router()
const _ = require('lodash')

const authenticationUser = require('../middlewares/authenticationUser')
const authenticateUser = require('../middlewares/authenticateUser')

router.post('/', authenticationUser, authenticateUser,(req,res) => {
          const body = req.body
          const product = new Product(body)
          product.save()
          .then(product => {
                    res.json(_.pick(product,['_id','productname', 'productprice','description','imgurl','category']))
          })
          .catch(err => {
                    res.send(err)
          })
})

router.get('/', (req,res) => {
          Product.find()
          .then(products => {
                    res.json(products)
          })
          .catch(err => {
                    res.send(err)
          })
})

router.get('/:id', authenticationUser, authenticateUser,(req,res) => {
          const id = req.params.id
          Product.findById(id).populate('category', ['_id', 'name'])
          .then(product => {
                    res.send(_.pick(product, ['_id','productname', 'productprice', 'description', 'imgurl', 'category']))
          })
          .catch(err => {
                    res.send(err)
          })
})

router.put('/:id', authenticationUser, authenticateUser, (req,res) => {
          const id = req.params.id
          const body = req.body
          Product.findByIdAndUpdate(id,{$set:body},{new:true}).populate('category', ['_id', 'name'])
          .then(product => {
                    res.send(_.pick(product, ['_id','productname', 'productprice', 'description', 'imgurl', 'category']))
          })
          .catch(err => {
                    res.send(err)
          })
})

router.delete('/:id', authenticationUser, authenticateUser,(req,res) => {
          const id = req.params.id
          Product.findByIdAndDelete(id)
          .then(product => {
                    res.json(product)
          })
          .catch(err => {
                    res.send(err)
          })
})

module.exports = router