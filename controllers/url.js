const shortid = require("shortid")
const URL = require("../models/url")


async function handleGenerateNewShortURL(req, res) {
  
  const body = await req.body;
  const shortID = shortid.generate();
  console.log(body);
  if(!body.url) return res.status(400).json({error: 'url is required'})
  await URL.create(
  {
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: []
  })

  return res.status(201).render("home",{shortId:shortID})

 
}

async function handleGetAnalytics(req,res) 
{
  const shortId = req.params.shortId
  const result = await URL.findOne({shortId})
  return res.json({totalClicks: result.visitHistory.length,
    analytics: result.visitHistory
  })
  
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics
}