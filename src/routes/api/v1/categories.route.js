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
    "/update-category",
    categoriesControler.updateCategory
)

router.delete(
    "/delete-category",
    categoriesControler.deleteCategory
)

module.exports = router;

