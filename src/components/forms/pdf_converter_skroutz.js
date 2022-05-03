import React, { useState } from "react"
import { Button, Col, Row, Form, Spinner } from 'react-bootstrap';
import axios from 'axios'
import fileDownload from 'js-file-download'






const Pdfconverter = () => {
  const [selected_file, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selected_file_label, setSelected_file_label] = useState("No File Selected");


  const fupdf = e => {
    e.preventDefault()
    console.log(selected_file);


    //console.log(email);
    //console.log(Password);

    fileupload_pdfconvert();
  }

  const fileupload_pdfconvert = (e) => {


    console.log(selected_file);
    const formData = new FormData();
    formData.append("name", "tmp");
    formData.append('file', selected_file);

    //console.log(formData)

    setIsLoading(true);
    console.log(selected_file);
    console.log(formData.get("file"))
    axios({
      method: "post",
      url: 'https://kmaz.pythonanywhere.com/upload_pdftoconvert',
      //url: 'http://localhost:8001/upload_pdftoconvert',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      //console.log(res)

      let filename = disable_company;
      fileDownload(res.data, filename)
      setSelected_file_label("File Converted Successfully");
      setIsLoading(false)
    }).catch(error => {
      console.error(error)
    });



  }

  return (
    <div>
      <Form onSubmit={fupdf}>
        <Form.Group className="mt-3" onChange={(e) => setSelectedFile(e.target.files[0])} type="file">
          <Form.Label>Εισαγωγή Pdf για μετατροπή</Form.Label>
          <Form.Control type="file" />
          <Button className="mt-2" variant="primary" type="submit"  >
            <Row>
              {isLoading &&
                <Col>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </Col>
              }
              <Col>
                Μετατροπή
              </Col>
            </Row>
          </Button>
          <Row className="mt-5">
            <Col>{selected_file_label}</Col>
          </Row>
        </Form.Group>
      </Form>
    </div >
  )
}


export default Pdfconverter
