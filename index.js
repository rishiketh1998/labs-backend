const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv')
const inquiry = require('./routes/inquiry.js')
const app = express()
dotenv.config({path: './.env'})

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors())
app.use('/v1/inquiry', inquiry)


/**
 * @author Rishi
 * @description: starts the server on "process.env.PORT" port
 */
app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`)
})