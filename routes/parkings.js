const express = require('express');
const router = express.Router();

const { getParking,getParkings,addParking } = require('../controllers/parkings');

router.get("/", getParkings).get("/:parkingId",getParking).post("/",addParking);

module.exports = router;