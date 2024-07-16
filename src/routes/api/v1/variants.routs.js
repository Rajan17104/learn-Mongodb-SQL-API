const express = require("express");
const { variantController } = require("../../../controller");
const upload = require("../../../middleware/upload");

const app = express();
const router = express.Router();


router.get("/list-varients",
    variantController.listVarients
);

router.get("/list-varients/:varients_id",
    variantController.getVarients
);

router.post("/add-varients",
    upload.array('pro_img', 12),
    variantController.addVarients
);

router.put("/update-varients/:varients_id",
    upload.array('pro_img', 12),
    variantController.updateVarients

);

router.delete("/delete-varients/:varients_id",
    variantController.deleteVarients
);

module.exports = router;