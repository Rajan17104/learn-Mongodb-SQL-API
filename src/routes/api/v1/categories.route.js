const express  = require("express");
const { categoriesControler } = require("../../../controller");
const auth = require("../../../middleware/auth");
const router = express.Router();

router.get(
    "/list-categories",
    auth(['manger',"admin"]),
    categoriesControler.listCategories
)

router.get(
    "/list-categories/:category_id",
    categoriesControler.getcategory
)

router.post(
    "/add-category",
    categoriesControler.addCategory
)

router.put(
    "/update-category/:category_id",
    categoriesControler.updateCategory
)

router.delete(
    "/delete-category/:category_id",
    categoriesControler.deleteCategory
)

router.get(
    "/count-subcategory",
    categoriesControler.countSubcategory
)

router.get(
    "/count-active",
    categoriesControler.totalActivecategory
)

router.get(
    "/most-products",
    categoriesControler.highest_number_products
)
router.get(
    "/average-products",
    categoriesControler.number_products_perCategory
)
router.get(
    "/inactive",
    categoriesControler.totalInActivecategory
)

module.exports = router;
