const express  = require("express");
const { categoriesControler } = require("../../../controller");
const router = express.Router();

router.get(
    "/list-categories",
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

module.exports = router;
