const express = require('express');
const router = express.Router();

const { getParking,getParkings,addParking,updateParking } = require('../controllers/parkings');

router.get("/", getParkings).get("/:parkingId",getParking).post("/",addParking).put("/:parkingId",updateParking);

module.exports = router;