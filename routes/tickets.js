const express = require('express');
const router = express.Router();

const {addTicket} = require('../controllers/tickets');

router.post("/:userId/:carId",addTicket);

module.exports = router;