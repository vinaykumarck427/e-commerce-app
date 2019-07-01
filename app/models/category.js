const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
          name:{
                    type:String,
                    required:true
          }
})

const Category = mongoose.model('Categroy', categorySchema)

module.exports = Category