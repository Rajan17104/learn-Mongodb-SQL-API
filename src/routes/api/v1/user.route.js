const express = require("express");
const { usersController } = require("../../../controller");

const app = express();
const router = express.Router();


// router.get("/list-user",
//     variantController.listusers
// );

// router.get("/list-user/:user_id",
//     variantController.getusers
// );

router.post("/register-user",
    usersController.registerUser
);

router.post("/login-user",
    usersController.loginUser
);

router.post("/relogin-user",
    usersController.loginUser
);

// router.put("/update-user/:user_id",
//     variantController.updateuser

// );

// router.delete("/delete-user/:user_id",
//     variantController.deleteuser
// );

module.exports = router;