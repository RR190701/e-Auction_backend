//configurations
require('dotenv').config({path: "./config.env"})
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(express.json());
app.use('/api/auth', require("./routes/auth"));



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})