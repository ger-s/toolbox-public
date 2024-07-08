import React, { useEffect, useState } from "react"
import { Table } from "react-bootstrap"

const CustomTable = ({ files, file }) => {
  const [tableFiles, setTableFile] = useState([])

  useEffect(() => {
    if (!tableFiles.length) {
      if (files?.length) setTableFile(files)

      if (file?.length) {
        fetch(`http://localhost:4000/files/data?fileName=${file}`)
          .then((res) => res.json())
          .then((data) => setTableFile(data))
          .catch((error) => console.error({ error }))
      }
    }
  }, [file, files, tableFiles])

  return (
    <>
      {tableFiles.length ? (
        <Table bordered hover variant="dark" className="m-5">
          <thead style={{ borderBottom: "1px solid #fff" }}>
            <tr>
              <th>File name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {tableFiles.map((file) =>
              file.map((data, i2) => (
                <tr key={i2}>
                  <td>{data.file}</td>
                  {data.lines.text.length ? (
                    <td>{data.lines.text}</td>
                  ) : (
                    <td className="text-danger-emphasis">Missing info</td>
                  )}
                  {data.lines.number.length ? (
                    <td>{data.lines.number}</td>
                  ) : (
                    <td className="text-danger-emphasis">Missing info</td>
                  )}
                  {data.lines.hex.length ? (
                    <td>{data.lines.hex}</td>
                  ) : (
                    <td className="text-danger-emphasis">Missing info</td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      ) : null}
    </>
  )
}

export default CustomTable
