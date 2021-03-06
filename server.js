const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const path = require('path')
const keys = require('./config/keys')
const certifications = require("./routes/api/certifications")
const upload = require("./routes/api/upload")

Object.keys(keys).forEach(function(key) {
  console.log(key + " : " + JSON.stringify(keys[key]))
})

const db = keys.mongoURI
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err))

const app = express()
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client/build')))
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
})
app.use("/api/certifications", certifications)
app.use("/certifications", certifications) // for server
app.use("/api/upload", upload)
app.use("/upload", upload) // for server
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server up and running on port ${port} !`))