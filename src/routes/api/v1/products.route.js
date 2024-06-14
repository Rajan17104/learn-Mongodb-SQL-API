const express  = require("express");
const { productController } = require("../../../controller");
const upload = require("../../../middleware/upload");

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
    upload.single("product_image"),
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