const express  = require("express");
const { subcategoriesControler } = require("../../../controller");
const router = express.Router();

router.get(
    "/list-subcategories",
    subcategoriesControler.listSubCategories
)

router.post(
    "/add-subcategory",
    subcategoriesControler.addSubSubCategory
)

router.put(
    "/update-subcategory",
    subcategoriesControler.updateSubSubCategory
)

router.delete(
    "/delete-subcategory",
    subcategoriesControler.deleteSubSubCategory
)

module.exports = router;