import React, { useState, useEffect, Component } from "react"
import { Link } from "gatsby"
import { Button, Card, Col, Row, Form, Spinner } from 'react-bootstrap';
import axios from 'axios'





const Step02 = () => {
  const [selected_file, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selected_file_label, setSelected_file_label] = useState("No File Selected");


  const fuexcludeproducts = e => {
    e.preventDefault()
    console.log(selected_file);


    //console.log(email);
    //console.log(Password);

    fileupload_exludeproducts();
  }

  const fileupload_exludeproducts = (e) => {
    setIsLoading(true);
    console.log(selected_file);
    const formData = new FormData();
    formData.append("name", "tmp");
    formData.append('file', selected_file);

    console.log(selected_file);
    console.log(formData.get("file"))
    axios({
      method: "post",
      url: 'https://kmaz.pythonanywhere.com/upload_excludeproducts',
      //url: 'http://localhost:8001/upload_excludeproducts',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      setIsLoading(false);
      setSelected_file_label(res.data);
    });

  }

  return (
    <div>
      <Form onSubmit={fuexcludeproducts}>
        <Form.Group className="mt-3" onChange={(e) => setSelectedFile(e.target.files[0])} type="file">
          <Form.Label>Εισαγωγή Προϊόντων για Εξαίρεση</Form.Label>
          <Form.Control type="file" />
          <Button className="mt-2" variant="primary" type="submit">
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
                Εισαγωγή
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
export default Step02