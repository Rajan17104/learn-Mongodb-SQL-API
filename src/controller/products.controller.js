const Products = require("../model/products.model");
const fileupload = require("../utils/cloudinary");

const listProducts = async (req, res) => {
    try {
        const products = await Products.find()
        console.log(products);

        if (!products || products.length === 0) {
            res.status(404).json({
                message: "No products data found",
                success: false,
            })
        }

        res.status(200).json({
            message: "Products data fetched successfully",
            success: true,
            data: products,
        })

    } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.params.product_id;
        const product = await Products.findById(id);
        console.log(product);

        if (!product) {
            res.status(404).json({
                message: "Product not found",
                success: false,
            })
        }
        res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            data: product,
        })

    } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
    }
}

const addProduct = async (req, res) => {

    console.log(req.body);
    console.log(req.file);

    try {
        const fileRes = await fileupload("Product_Img",req.file.path)

        console.log(fileRes);
    } catch (error) {
        
    }

    // try {
    //     const newData = req.body;
    //     const product = await Products.create(newData);
    //     console.log(product);

    //     if (!product) {
    //         res.status(400).json({
    //             message: "product can not created",
    //             success: false,
    //         })
    //     }

    //     res.status(201).json({
    //         message: "New product created successfully",
    //         success: true,
    //         data: product,
    //     })
    // } catch (error) {
    //     res.status(500).json({
    //         message: 'internal server Error' + error.message,
    //         success: false
    //     });
    // }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.product_id;
        const newData = req.body;
        const updateproduct = await Products.findByIdAndUpdate(id, newData, { new: true, runValidators: true })
        console.log(updateproduct);
        if (!updateproduct) {
            res.status(400).json({
                message: "No product data found",
                success: false,
            })
        }

        res.status(200).json({
            message: "Product fetched and Update successfully",
            success: true,
            data: updateproduct,
        })
    } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        });
    }
}

const deleteProduct = async(req, res) => {
   try {
    const id = req.params.product_id;
    const deleteproduct = await Products.findByIdAndDelete(id);

    if(!deleteproduct){
        res.status(400).json({
            message: "No product data found or Your request due to malformed syntax, missing parameters, etc",
            success: false,

        })
    }
    res.status(200).json({
        message: "Product delete successfully",
        success: true,
        data: deleteproduct,
    })

   } catch (error) {
    res.status(500).json({
        message: 'internal server Error' + error.message,
        success: false
    });
   }
}


module.exports = {
    listProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct
}