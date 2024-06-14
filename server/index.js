require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connection = require('./db')
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const tokenVerification = require('./middleware/tokenVerification')

const app = express()

//midleware
app.use(express.json())
app.use(cors({
    origin: '*'
}));


// routes
app.get("/api/users", tokenVerification)
app.get("/api/users/details", tokenVerification)
app.delete("/api/users", tokenVerification) 
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)


connection()

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))


