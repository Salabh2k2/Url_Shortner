 const express = require("express")
 const {connectToMongoDB} = require("./connect")
 const urlRoute = require("./routes/url")
 const app = express()
 const URL = require("./models/url")
 const path = require("path")
 const staticRoute = require("./routes/staticRouter")
 const userRoute = require('./routes/user')
 const PORT = 8001
 app.use(express.urlencoded({extended:true}))
 app.set("view engine", "ejs")
 app.set("views", path.resolve("./views"))

 connectToMongoDB("mongodb+srv://salabhrai:salabh123@cluster0.ild12qx.mongodb.net")
 .then(()=>console.log("Mongodb connected"))
 .catch((error)=> console.log(error))

 app.use(express.json())
 app.use("/url", urlRoute)
  app.use("/", staticRoute)
  app.use("/user",userRoute)

  

 app.get("/test", async (req, res) =>{
    const allUrls = await URL.find({})
    return res.render('home', {
      urls: allUrls
    })
 })

 app.get('/url/:shortId', async (req,res)=>{
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