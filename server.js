require('dotenv').config({path: "./config.env"})
const express = require('express')
const mongoose = require('mongoose');
const connectDB = require("./config/db");


//configurations
const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(express.json());
app.use('/api/auth', require("./routes/auth"));


//db configure
connectDB();
                         
//API endpoints created in routes..


//listener
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})