const axios = require("axios")

const handleGetFiles = async (req, res, next) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: `${process.env.MY_SECRET_KEY}`,
    },
  }

  let files = []
  let completeCsv = []

  if (!req?.query?.fileName?.length) {
    try {
      const response = await axios({
        ...config,
        url: "https://echo-serv.tbxnet.com/v1/secret/files",
      })
      if (!response.data?.files?.length) return res.status(404).send("No files")

      files = response.data.files
    } catch (error) {
      next(error)
    }
  } else {
    files = [req.query.fileName]
  }

  try {
    await Promise.all(
      files.map((file) => {
        return axios({
          ...config,
          url: `https://echo-serv.tbxnet.com/v1/secret/file/${file}`,
        })
          .then(({ data }) => {
            completeCsv.push(data)
          })
          .catch((_error) => null)
      })
    )

    completeCsv = completeCsv
      .map((file) =>
        file
          .split("\n")
          .map((data) => {
            const dataSplited = data.split(",")
            if (dataSplited[0] !== "file") {
              return {
                file: dataSplited[0],
                lines: {
                  text: dataSplited[1] ?? "",
                  number: dataSplited[2] ?? "",
                  hex: dataSplited[3] ?? "",
                },
              }
            }
            return null
          })
          .filter(Boolean)
      )
      .filter((e) => e.length)
      .sort()

    return res.status(200).send(completeCsv)
  } catch (error) {
    next(error)
  }
}

module.exports = { handleGetFiles }
