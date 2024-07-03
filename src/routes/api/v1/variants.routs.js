const express = require("express");
const { variantController } = require("../../../controller");



const app = express();
const router = express.Router();


router.get("/list-varients",
    variantController.listVarients
);

router.get("/list-varients/:varients_id",
    variantController.getVarients
);

router.post("/add-varients",
    variantController.addVarients
);

router.put("/update-varients/:varients_id",
    variantController.updateVarients

);

router.delete("/delete-varients/:varients_id",
    variantController.deleteVarients
);

module.exports = router;