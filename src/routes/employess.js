const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const Employee = require("../schemas/employess")

router.get("/auth/employess", async(req, res)=>{
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










module.exports = router