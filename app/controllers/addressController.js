const express = require('express')
const router = express.Router()
const Address = require('../models/address')
const authenticationUser = require('../middlewares/authinticationUser')

router.post('/',authenticationUser,(req,res) => {
          const {user} = req
          const body = req.body
          const address = new Address(body)
          address.user = user._id
          address.save()
          .then(address => {
                    res.json(address)
          })
          .catch(err => {
                    res.send(err)
          })
})
router.get('/',authenticationUser,(req,res) => {
          const {user} = req
          Address.find({
                    user:user._id
          })
          .then(addressess => {
                    res.json(addressess)
          })
          .catch(err => {
                    res.send(err)
          })
})


module.exports = router
