require('dotenv').config()

console.log(process.env)

const temp_key = process.env.API_KEY_TEMP
const api_key_aqi = process.env.API_KEY_AQI
// const fetch = require('node-fetch')
const port = process.env.PORT || 3000
const fs = require('fs')
const express = require('express')
const app = express()

//https://github.com/louischatriot/nedb#creatingloading-a-database
const Datastore = require('nedb')
const db = new Datastore('database.db')
db.loadDatabase()
// db.insert({ name: 'nidhi' })

app.listen(port, () => {
  console.log(`app is listening to port ${port}`)
})
//server any file in the folder i.e public in the folder
// if you have a blank tab localhost:3000 then it will always access index.html
// so that is why are able to see index.html
app.use(express.static('public'))
//.................................fetch with post server side work..............................

//server to understand incoming data
app.use(express.json({ limit: '1mb' }))

///api is path
// request is all the data that needs to be send, info about clienst who is sending info

app.post('/api', (request, response) => {
  console.log('I got data send by client')
  // console.log(request.body)
  const data = request.body

  const timeStamp = Date.now()

  data.timeStamp = timeStamp

  console.log(data)
  db.insert(data)
  response.json(data)
})

//.................................fetch with get only client side work..............................

app.get('/ap', (req, res) => {
  // res.json({ id: 123 })
  db.find({}, (err, data) => {
    if (err) {
      res.end()
      return
    }
    res.json(data)
  })
})
app.get('/api_keys', (req, res) => {
  const data = {
    weather_api_key: temp_key,
    air_quality_api_key: api_key_aqi,
  }
  res.status(200).json(data)
})
