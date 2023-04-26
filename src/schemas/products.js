const mongoose = require("mongoose")

const ProductsSchema = new mongoose.Schema({
product: {
type: String,
required: true,
max: 255
},
thumbnail: {
type: String,
required: true
},
description: {
type: String, 
required: true,
max: 255
},
category: {
type: String,
required: true,
max: 50
},
price: {
type: String,
required: true,
max: 10
}
}, {timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id
        // delete ret._id
      }
    }
})

module.exports = mongoose.model("ProductsModel", ProductsSchema, "products")