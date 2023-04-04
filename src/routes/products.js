const express = require("express")
const router = express.Router()
const Products = require("../schemas/products")
const cloudinary = require("../utils/cloudinary")
const multer  = require('multer')
const upload = multer()
router.get("/allproducts", async(req, res)=>{
try {
    const allproducts = await Products.find()
    res.status(200).send(allproducts)
} catch (error) {
    res.status(500).send({
    message: "Internal server error",
    error: error
    })
}
})



router.post("/allproducts",  upload.single('image'), async(req, res)=>{
    const result = await cloudinary.uploader(req.file.filename)
    const product = new Products({
    product: req.body.product,
    thumbnail: result.secure_url,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price
    })
try {
    const newproduct = await product.save()
    res.status(200).send({
        message: "Product Added",
        payload: newproduct,
    })
} catch (error) {
    res.status(500).send({
        message: "Internal Server Error",
        error: error
    })
}
})














module.exports = router