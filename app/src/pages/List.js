import React, { useState, useEffect } from "react"
import { Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"

const List = () => {
  const [nameFiles, setNameFiles] = useState([])

  useEffect(() => {
    if (!nameFiles.length) {
      fetch("http://localhost:4000/files/list")
        .then((res) => res.json())
        .then((data) => setNameFiles(data.files))
        .catch((error) => console.error({ error }))
    }
  }, [nameFiles])

  return (
    <Container>
      {nameFiles.length ? (
        <Table bordered hover variant="dark" className="m-5">
          <thead style={{ borderBottom: "1px solid #fff" }}>
            <tr>
              <th>File name</th>
            </tr>
          </thead>
          <tbody>
            {nameFiles.map((file, i) => (
              <tr key={i}>
                <td>
                  <Link to={`/files/${file}`}>{file}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </Container>
  )
}

export default List
