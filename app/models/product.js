const mongoose =  require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
          productname:{
                    type:String,
                    required:true
          },
          productprice:{
                    type:Number,
                    required:true
          },
          description:{
                    type:String
          },
          imgurl:{
                    type:String,
                    required:true
          },
          category:{
                    type: Schema.Types.ObjectId,
                    ref: 'Categroy',
                    require:true
          }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product

// product
// _id
// name
// price
// description
// imageURL
// categoryId 