const express = require('express');
const router = express.Router();

const {addTicket, getTickets, getTicket,updateTicket, deleteTicket} = require('../controllers/tickets');

router.post("/:userId/:carId",addTicket).get("/:userId/:carId", getTickets).get("/:ticketId",getTicket).put("/:ticketId",updateTicket).delete("/:ticketId", deleteTicket);

module.exports = router;