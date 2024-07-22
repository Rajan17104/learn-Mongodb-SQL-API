const express  = require("express");

const router = express.Router();

const categoriesRouter = require("./categories.route")
router.use("/categories",categoriesRouter);

const subcategoriesRouter = require("./subcategories.route")
router.use("/subcategories",subcategoriesRouter);

const productRouter = require("./products.route")
router.use("/products",productRouter);

const variantRouter = require("./variants.routs")
router.use("/variants",variantRouter);

const salespeopleRouter = require("./salespeople.routes")
router.use("/salespeople",salespeopleRouter)


const userRouter = require("./user.route")
router.use("/user",userRouter)

module.exports = router;


