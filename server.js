const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
require("colors");

const auth = require('./routes/auth');

const app = express();
dotenv.config({path: "./config/config.env"});


app.use(cors());
app.use(express.json());

// app.use((req,res,next) => {
//     console.log('Rochdi maghadich ikml projet');
//     next();
// });
app.use('/api/v1/auth',auth);

const PORT = process.env.PORT || 5050

app.listen(PORT,  ()=> {
console.log(`S4 project at: ${PORT}!`.yellow.bold); });