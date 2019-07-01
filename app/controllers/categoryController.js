const express = require('express')
const Category = require('../models/category')
const authenticationUser = require('../middlewares/authinticationUser')
const authenticateUser = require('../middlewares/authenticateUser')
const _ = require('lodash')

const router = express.Router()
router.get('/', authenticationUser, authenticateUser,(req,res)=> {
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

module.exports = router