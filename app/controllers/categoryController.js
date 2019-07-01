const express = require('express')
const Category = require('../models/category')
const authenticationUser = require('../middlewares/authinticationUser')
const authenticateUser = require('../middlewares/authenticateUser')
const _ = require('lodash')

const router = express.Router()
router.get('/',(req,res)=> {
          const {user} = req
          Category.find()
          .then(categories => {
                    res.json(categories)
          })
          .catch(err => {
                    res.send(err)
          })
})

router.post('/', authenticationUser, authenticateUser,(req,res) => {
          const {user} = req
          const body = req.body
          const category = new Category(body)
          category.save()
          .then(cat => {
                    res.send(_.pick(cat,['_id', 'name']))
          })
          .catch(err => {
                    res.send(err)
          })
})

router.get('/:id', authenticationUser, authenticateUser,(req,res) => {
          const id = req.params.id
          Category.findById(id)
          .then(category => {
                    res.json(category)
          })
          .catch(err => {
                    res.send(err)
          })
})

router.delete('/:id', authenticationUser, authenticateUser,(req,res) => {
          const id = req.params.id
          Category.findByIdAndDelete(id)
          .then(category => {
                    res.json(category)
          })
          .catch(err => {
                    res.send(err)
          })
})

router.put('/:id', authenticationUser, authenticateUser ,(req,res) => {
          const id = req.params.id
          const body = req.body
          Category.findByIdAndUpdate(id,{$set:body},{new:true})
          .then(category => {
                    res.json(category)
          })
          .catch(err => {
                    res.send(err)
          })
})

module.exports = router