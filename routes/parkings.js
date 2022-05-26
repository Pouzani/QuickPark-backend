const express = require('express');
const router = express.Router();

const { getParking,getParkings } = require('../controllers/parkings');

router.get("/", getParkings).get("/:parkingId",getParking);

module.exports = router;