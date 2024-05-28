const express  = require("express");
const { productController } = require("../../../controller");

const router = express.Router();

router.get(
    "/list-products",
    productController.listProducts
)

router.post(
    "/add-product",
    productController.addProduct
)

router.put(
    "/update-product",
    productController.updateProduct
)

router.delete(
    "/delete-product",
    productController.deleteProduct
)

module.exports = router;