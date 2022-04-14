const express = require('express');
const dotenv = require('dotenv');
require("colors");

const users = require('./routes/users');

const app = express();
dotenv.config({path: "./config/config.env"});

app.use(express.json());
app.use('/',users);

const PORT = process.env.PORT || 5050
app.get('/', (req, res) => {
res.send('This is my S4 project')
})
app.listen(PORT,  ()=> {
console.log(`S4 project at: ${PORT}!`.yellow.bold); });