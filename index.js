 const express = require("express")
 const {connectToMongoDB} = require("./connect")
 const urlRoute = require("./routes/url")
 const app = express()
 const URL = require("./models/url")
 const PORT = 8001

 connectToMongoDB("mongodb+srv://salabhrai:salabh123@cluster0.ild12qx.mongodb.net")
 .then(()=>console.log("Mongodb connected"))
 .catch((error)=> console.log(error))

 app.use(express.json())
 app.use("/url", urlRoute)

 app.get('/:shortId', async (req,res)=>{
  const shortId = req.params.shortId
  const entry =  await URL.findOneAndUpdate(
    {
      shortId: shortId
    },
    {
      $push: {visitHistory: {
        timestamp: Date.now()
      
      }}
    }
  ) 
  res.redirect(entry.redirectURL)
 })
 app.listen(PORT, ()=> console.log(`Server Startged at port: ${PORT}`))