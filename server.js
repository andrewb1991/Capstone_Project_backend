const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const port = 8080
const app = express()
const cors = require("cors")
const logMiddlewares = require("./middlewares/logMiddlewares")
const customersRoute = require("./src/routes/customers")
const productsRoute = require("./src/routes/products")
app.use(logMiddlewares)
const employeesRoute = require("./src/routes/employess")

app.use(express.json())
app.use(cors())
app.use(customersRoute)
app.use(productsRoute)
app.use(employeesRoute)


mongoose.connect(process.env.MONGO_DB_URL)
const db = mongoose.connection
db.on("Error", console.log.bind(console, "Connection Error"))
db.once("open", ()=>{
    console.log("Connected")
})

app.listen(port, ()=> console.log(`Server ready with port ${port}`))
