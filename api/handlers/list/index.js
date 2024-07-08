const axios = require("axios")

const handleGetList = async (res, next) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: `${process.env.MY_SECRET_KEY}`,
    },
  }

  try {
    const response = await axios({
      ...config,
      url: "https://echo-serv.tbxnet.com/v1/secret/files",
    })
    if (!response.data?.files?.length) return res.status(404).send("No files")

    return res.status(200).send(response.data)
  } catch (error) {
    return next(error)
  }
}

module.exports = { handleGetList }
