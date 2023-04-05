const mongoose = require("mongoose")

const EmployeesSchema = new mongoose.Schema({
code: {
type: Number,
required: true,
max: 4
},
email: {
type: String,
required: true,
max: 255
},
password: {
type: String,
required: true,
min: 8
}
}, {timestamps: true})

module.exports = mongoose.model("EmployeesModel", EmployeesSchema, "employees")