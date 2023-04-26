const express = require("express")
const router = express.Router()
const Products = require("../schemas/products")

router.get("/:category", async(req,res)=>{
try {
    const products = await Products.find({category: req.params.category});
    res.json(products);
    
} catch (error) {
res.status(500).send("Server Internal Error")
}
})

module.exports = router;