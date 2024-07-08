/* eslint-disable no-undef */
const chai = require("chai")
const chaiHttp = require("chai-http")
const axios = require("axios")
const app = require("../api/server")
const expect = chai.expect

chai.use(chaiHttp)

describe("GET /files/data", () => {
  const config = {
    method: "GET",
    headers: {
      Authorization: `${process.env.MY_SECRET_KEY}`,
    },
  }
  let externalApi

  before(async () => {
    try {
      const response = await axios({
        ...config,
        url: "https://echo-serv.tbxnet.com/v1/secret/files",
      })
      externalApi = response.data.files
    } catch (error) {
      console.error("Error fetching external data:", error.message)
      throw error
    }
  })

  it("should return a valid array", async () => {
    const res = await chai.request(app).get("/files/data")
    expect(res).to.have.status(200)
    expect(res.body).to.be.an("array")
  })

  it("should return a single file when using a valid query param, and none with a bad query", async () => {
    const correctParam = await chai
      .request(app)
      .get(`/files/data?fileName=${externalApi[1]}`)
    const wrongParam = await chai
      .request(app)
      .get("/files/data?fileName=wrongParam123")
    expect(correctParam).to.have.status(200)
    expect(wrongParam).to.have.status(200)
    expect(correctParam.body).to.be.an("array")
    expect(wrongParam.body).to.be.an("array")
    expect(correctParam.body.length).to.deep.equal(1)
    expect(wrongParam.body.length).to.deep.equal(0)
  })

  it("should include all healthy files from the external API", async () => {
    const res = await chai.request(app).get("/files/data")
    let filesNames = []
    res.body.forEach((file) =>
      file.forEach(
        (data) => !filesNames.includes(data.file) && filesNames.push(data.file)
      )
    )

    const comparison = filesNames.every((e) => externalApi.includes(e))
    expect(comparison).to.deep.equal(true)
  })

  it("shouldn't include any unhealthy file from the external API", async () => {
    const res = await chai.request(app).get("/files/data")
    let expectedHealtyFiles = []
    res.body.forEach((file) =>
      file.forEach(
        (data) =>
          !expectedHealtyFiles.includes(data.file) &&
          expectedHealtyFiles.push(data.file)
      )
    )
    let unhealthyFilesContent = []
    externalApi.forEach(
      (file) =>
        !expectedHealtyFiles.includes(file) && unhealthyFilesContent.push(file)
    )

    //handeling if a file returns an error
    if (unhealthyFilesContent.length) {
      await Promise.all(
        unhealthyFilesContent.map((file, idx) => {
          return axios({
            ...config,
            url: `https://echo-serv.tbxnet.com/v1/secret/file/${file}`,
          })
            .then(({ data }) => (unhealthyFilesContent[idx] = data))
            .catch((_error) => unhealthyFilesContent.splice(idx, 1))
        })
      )

      //handeling if a file returns a value, but none valid content
      unhealthyFilesContent = unhealthyFilesContent
        .map((file) =>
          file
            .split("\n")
            .map((data) => (data.split(",")[0] !== "file" ? data : null))
            .filter(Boolean)
        )
        .filter((e) => e.length)
    }

    expect(unhealthyFilesContent.length).to.deep.equal(0)
  })
})
