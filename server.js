const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const port = 7070
const app = express()
const cors = require("cors")
const logMiddlewares = require("./middlewares/logMiddlewares")

app.use(express.json())
app.use(cors())
app.use(logMiddlewares)


mongoose.connect(process.env.MONGO_DB_URL)
const db = mongoose.connection
db.on("Error", console.log.bind(console, "Connection Error"))
db.once("open", ()=>{
    console.log("Connected")
})

app.listen(port, ()=> console.log(`Server ready with port ${port}`))
