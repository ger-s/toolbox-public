const express = require("express")
const { handleGetFiles } = require("../handlers/files")
const { handleGetList } = require("../handlers/list")

const router = express.Router()

router.get("/data", (req, res, next) => handleGetFiles(req, res, next))

router.get("/list", (req, res, next) => handleGetList(res, next))

router.use("/", function (req, res) {
  res.sendStatus(200)
})

module.exports = router
