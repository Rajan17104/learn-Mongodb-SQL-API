const express  = require("express");
const { productController } = require("../../../controller");

const router = express.Router();

router.get(
    "/list-products",
    productController.listProducts
)
router.get(
    "/list-products/:product_id",
    productController.getProduct
)

router.post(
    "/add-product",
    productController.addProduct
)

router.put(
    "/update-product/:product_id",
    productController.updateProduct
)

router.delete(
    "/delete-product/:product_id",
    productController.deleteProduct
)

module.exports = router;