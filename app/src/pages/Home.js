import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"

import CustomTable from "../components/CustomTable"

const Home = () => {
  const [files, setFiles] = useState([])

  useEffect(() => {
    if (!files.length) {
      fetch("http://localhost:4000/files/data")
        .then((res) => res.json())
        .then((data) => setFiles(data))
        .catch((error) => console.error({ error }))
    }
  }, [files])

  return (
    <Container>{files.length ? <CustomTable files={files} /> : null}</Container>
  )
}

export default Home
