const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")
const upload = require("../utils/multer")
const path = require("path")

const Customer = require("../schemas/cutomers")

router.get("/register", async(req,res)=>{
    try {
        const allcustomers = await Customer.find()
        res.status(200).send(allcustomers)
    } catch (error) {
        res.status(500).send({
        message: "Internal server error",
        error: error    
        })
    }

})

router.get("/login", async(req, res)=>{
    try {
        const allcustomers = await Customer.find()
        res.status(200).send(allcustomers)
    } catch (error) {
        res.status(500).send({
        message: "Internal server error",
        error: error    
        })
    }

})

router.post("/register", async(req, res)=>{
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(req.body.password, salt)
    const result = await cloudinary.upload(req.file)
    const customer = new Customer({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: hashpassword,
    imageprofile: result.secure_url
    })
try {
    const newcustomer = await customer.save()
    res.status(200).send({
        message: "Customer added",
        payload: newcustomer,
    })
} catch (error) {
    res.status(500).send({
        message: "Internal Server Error",
        error: error,
    })
}
})



router.post("/login", async(req, res)=>{
    const customer = await Customer.findOne({
    email: req.body.email,
    })
    if(!customer){
    return res.status(400).send("Utente non trovato")
    }
    const validPassword = await bcrypt.compare(req.body.password, customer.password)
    if(!validPassword){
    return res.status(400).send("Password non valida")
    }
    const token = jwt.sign({
        name: customer.name,
        surname: customer.surname,
        email: customer.email,
        id: customer._id
    }, process.env.JWT_SECRET, {expiresIn: "15m"})
    res.header("Authorization", token).status(200).send(
    token
    )
    })

module.exports = router