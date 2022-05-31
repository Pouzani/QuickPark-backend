const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require("morgan");
require("colors");

const auth = require('./routes/auth');
const parkings = require('./routes/parkings');
const parkingSpots = require('./routes/parkingSpots');
const users = require('./routes/users');
const cars = require('./routes/cars');
const { errorHandler,endPointNotFound} = require('./middlewares/errorHandler');

const app = express();
dotenv.config({path: "./config/config.env"});

//? MORGAN MIDDLEWARE
app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth',auth);
app.use('/api/v1/parkings',parkings);
app.use('/api/v1/parkingSpots',parkingSpots);
app.use('/api/v1/users',users);
app.use('/api/v1/cars',cars);
app.use('*',endPointNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5050

app.listen(PORT,  ()=> {
console.log(`S4 project at: ${PORT}!`.yellow.bold); });