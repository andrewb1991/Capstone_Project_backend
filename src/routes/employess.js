const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const Employee = require("../schemas/employess")

router.get("/auth/employees", async(req, res)=>{
try {
    const allEmployess = await Employee.find()
    res.status(200).send(allEmployess)
} catch (error) {
    res.status(500).send({
    message: "Internal server error",
    error: error
    })
}
})

router.post("/auth/employees", async(req,res)=>{
const salt = await bcrypt.genSalt(10)
const hashpassword = await bcrypt.hash(req.body.password, salt)
const employee = new Employee({
code: req.body.code,
email: req.body.email,
password: hashpassword
})
try {
    const newemployee = await employee.save()
    res.status(200).send({
    message: "Employee added",
    error: error
    })
} catch (error) {
    res.status(500).send({
    message: "Internal Server Error",
    error: error
    })  
}
})

router.patch("/auth/employees/:id", async(req, res)=>{
    const {id} = req.params
    const employeeExist = await Employee.findById(id)
    if(!employeeExist){
        res.status(404).send({
            message: "Employee not found"
        })
    }
    try{
      const infoToUpdate = req.body
      const options = {
        new: true
    } 
      const result = await Employee.findByIdAndUpdate(id, infoToUpdate, options)
      res.status(200).send({
        message: "Employee updated",
        payload: result
    })
    }
    catch (error){
        res.status(500).send({
            message: "Internal server error",
            error: error,
            })    
    } 
})

router.delete("/auth/employees/:id", async(req,res)=>{
    const {id} = req.params

try{
const employee = await Employee.findById(id).deleteOne()
if(!employee){
return res.status(404).send({
    message: "Employee not found",
})
}
res.status(200).send({
    message: "Employee deleted",
})
}
catch (error){
    res.status(500).send({
        message: "Internal server error",
        error: error
    })

}
})


module.exports = router