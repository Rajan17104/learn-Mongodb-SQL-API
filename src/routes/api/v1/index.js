const express  = require("express");

const router = express.Router();

const categoriesRouter = require("./categories.route")
router.use("/categories",categoriesRouter);

const subcategoriesRouter = require("./subcategories.route")
router.use("/subcategories",subcategoriesRouter);

const productRouter = require("./products.route")
router.use("/products",productRouter);

module.exports = router;


