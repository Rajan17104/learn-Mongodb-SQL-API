const express = require('express');
const { salsepeopleController } = require('../../../controller');


const router = express.Router();

router.get(
    '/list-salespeople',
    salsepeopleController.listSalespeople
)

router.post(
    '/add-salespeople',
    salsepeopleController.addSalespeople
)

module.exports = router;