require('dotenv').config({path: "./config.env"})
const express = require('express')
const mongoose = require('mongoose');
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

//db configure
connectDB();

//configurations
const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(express.json());
app.use('/api/auth', require("./routes/auth"));
/**
 * error handling should be the last peice of the middleware
 */
 app.use('/api/private', require("./routes/private"));

app.use(errorHandler);


                         
//API endpoints created in routes..


//listener
const server = app.listen(port, () => {
  console.log(`Server is working at http://localhost:${port}`)
})


//for smooth closing of server whenever the run is crashed
process.on("unhandledRejection", (err, promise) => {
  console.log(`logged Error ${err}`);
  server.close(()=> process.exit(1));
})