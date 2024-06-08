 const express = require("express")
 const {connectToMongoDB} = require("./connect")
 const urlRoute = require("./routes/url")
 const app = express()

 const PORT = 8001

 connectToMongoDB("mongodb+srv://salabhrai:salabh123@cluster0.ild12qx.mongodb.net")
 app.listen(PORT, ()=> console.log(`Server Startged at port: ${PORT}`))