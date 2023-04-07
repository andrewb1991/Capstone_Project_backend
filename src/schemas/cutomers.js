const mongoose = require("mongoose")

const CustomersSchema = new mongoose.Schema({
name: {
type: String,
max: 255
},
surname: {
type: String, 
max: 255
},
email: {
type: String,
required: true,
max: 255,
unique: true
},
password: {
type: String,
required: true,
min: 8
},
profileimage: {
type: String,
required: true
}
}, {timestamps: true})

module.exports = mongoose.model("CustomersModel", CustomersSchema, "customers")