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

router.put(
    '/update-salespeople',
    salsepeopleController.updateSalespeople
)
router.delete(
    '/delete-salespeople',
    salsepeopleController.deleteSalespeople
)

module.exports = router;