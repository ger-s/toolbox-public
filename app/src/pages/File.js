import React from "react"
import { Container } from "react-bootstrap"
import CustomTable from "../components/CustomTable"
import { useParams } from "react-router"

const File = () => {
  const { file } = useParams()

  return (
    <Container>{file.length ? <CustomTable file={file} /> : null}</Container>
  )
}

export default File
