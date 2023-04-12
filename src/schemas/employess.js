const mongoose = require("mongoose")

const EmployeesSchema = new mongoose.Schema({
code: {
type: String,
required: true,
max: 4
},
name: {
type: String,
required: true
},
surname: {
type: String,
required: true
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
},
role: {
type: String,
required: true,
max: 255
}
}, {timestamps: true})

module.exports = mongoose.model("EmployeesModel", EmployeesSchema, "employees")