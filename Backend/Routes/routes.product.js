const express = require("express");

const router = express.Router();
const productModel = require("../Model/model.product")



// post 
router.post("/post", async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const newProduct = new productModel({ name, price, description });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


// get 
router.get("/", async (req, res) => {
    try {
        const products = await productModel.find()
        res.status(200).json(products)
    } catch (error) {

        res.status(500).json({ message: error.message })
    }
})

// delete

router.delete("/:id", async (req, res) => {
    const productId = req.params.id; // Extract product ID from URL parameters

    try {
        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// edit

router.patch("/edit/:id", async (req, res) => {
    const productId = req.params.id
    const { name, price, description } = req.body;

    try {
        const updateData = await productModel.findByIdAndUpdate(productId, { name, price, description })

        if (!updateData) {
            res.status(400).json("product not found")
        }

        res.status(200).json("product updated successfull")

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



// single product page

router.get("/singleproduct/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const singlePageProduct = await productModel.findById(id)

        res.status(200).json(singlePageProduct);

    } catch (error) {
        res.status(400).json("Something is wrong")

    }


})






module.exports = router;

