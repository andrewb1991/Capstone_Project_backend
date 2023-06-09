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

router.get("/allproducts/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const product = await Products.findById({_id:id})
        if(!product){
        return res.status(404).send({ message: "Prodotto non trovato"})
        }
    res.status(200).send(product)
    } catch (error) {
        res.status(500).send({
        message: "Internal server error",
        error: error
        })
    }
})


router.post("/allproducts",  upload.single('image'), async(req, res)=>{
    const product = new Products({
    product: req.body.product,
    thumbnail: req.body.thumbnail,
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

router.patch("/allproducts/:id", async(req, res)=>{
    const {id} = req.params
    const productExist = await Products.findById(id)
    if(!productExist){
        res.status(404).send({
            message: "Product not found"
        })
    }
    try{
      const infoToUpdate = req.body
      const options = {
        new: true
    } 
      const result = await Products.findByIdAndUpdate(id, infoToUpdate, options)
      res.status(200).send({
        message: "Product updated",
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


router.delete("/allproducts/:id", async(req,res)=>{
    const {id} = req.params

try{
const product = await Products.findById(id).deleteOne()
if(!product){
return res.status(404).send({
    message: "Product not found",
})
}
res.status(200).send({
    message: "Product deleted",
})
}
catch (error){
    res.status(500).send({
        message: "Internal server error",
        error: error
    })

}
})

router.get("/allproductspagination", async(req, res)=>{
    let {page, limit} = req.query;
    try {
    if(!page) page = 1;
    if(!limit) limit = 8;
    const skip = (page -1) * 8;
    const totalProducts = await Products.find().skip(skip).limit(limit)
    res.status(200).send(totalProducts)    
    } catch (error) {
      console.log(error)  
    }
    })


    router.get("/allproducts/:id", async(req, res)=>{
        const {id} = req.params
        try {
            const product = await Products.findById({_id:id})
            if(!product){
            return res.status(404).send({ message: "Product not found"})
            }
        res.status(200).send(product)
        } catch (error) {
            res.status(500).send({
            message: "Internal server error",
            error: error
            })
        }
    })


    //SORTing




module.exports = router