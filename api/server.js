const express = require("express")
const http = require("http")
const app = express()
const api = require("./routes")
const cors = require("cors")

app.use(cors())

app.use("/files", api)

app.use((err, req, res, next) => {
  console.log("ERROR")
  console.log(err)
  res.status(500).send(err.message)
})

const server = http.createServer(app)

server.listen(4000, () => {
  console.log(`Server listening at port 4000`)
})

module.exports = server
