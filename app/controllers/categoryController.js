const express = require('express')
const Category = require('../models/category')
const authenticationUser = require('../middlewares/authinticationUser')
const authenticateUser = require('../middlewares/authenticateUser')

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

// router.post('/',)

module.exports = router