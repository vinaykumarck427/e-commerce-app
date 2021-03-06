const express = require('express')
const router = express.Router()
const Address = require('../models/address')
const authenticationUser = require('../middlewares/authenticationUser')

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

router.get('/', authenticationUser, (req, res) => {
          const { user } = req
          Address.find({
                    user: user._id
          })
                    .then(addressess => {
                              res.json(addressess)
                    })
                    .catch(err => {
                              res.send(err)
                    })
})
router.put('/:id', authenticationUser,(req,res) => {
          const { user } = req
          const id = req.params.id
          const body = req.body
          Address.findOneAndUpdate({
                    _id:id,
                    user:user._id
          }, {$set:body}, {new:true})
          .then(address => {
                    res.json(address)
          })
          .catch(err => {
                    res.send(err)
          })
})

router.delete('/:id',authenticationUser, (req,res) => {
          const {user} = req
          const id = req.params.id
          Address.findOneAndDelete({
                    _id:id,
                    user:user._id
          })
          .then(address => {
                    res.json(address)
          })
          .catch(err => {
                    res.send(err)
          })
})

router.get('/:id', authenticationUser, (req, res) => {
          const { user } = req
          const id = req.params.id
          Address.findOne({
                    _id: id,
                    user: user._id
          })
                    .then(address => {
                              res.json(address)
                    })
                    .catch(err => {
                              res.send(err)
                    })
})

module.exports = router
