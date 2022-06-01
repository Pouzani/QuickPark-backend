const express = require('express');
const router = express.Router();

const {addTicket, getTickets, getTicket} = require('../controllers/tickets');

router.post("/:userId/:carId",addTicket).get("/:userId/:carId", getTickets).get("/:ticketId",getTicket);

module.exports = router;