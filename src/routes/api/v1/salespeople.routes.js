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
    '/update-salespeople/:snum',
    salsepeopleController.update
)
router.delete(
    '/delete-salespeople/:snum',
    salsepeopleController.deleteSalespeople
)

module.exports = router;