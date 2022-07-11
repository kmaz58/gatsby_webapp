import React, { useState, useEffect, Component } from "react"
import MainLayout from "../components/layouts/MainLayout"
import Img_404 from "../images/404.gif"
import axios from 'axios'
import { Button, Card, Col, Row, Form, Spinner } from 'react-bootstrap';
import fileDownload from 'js-file-download'

const UserPref = () => {
  const [data1, settextdata1] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [textdata_label, settextdata_label] = useState("No File Selected");
  let acceptedDiff = 0;
  if (typeof window !== 'undefined') {
    acceptedDiff = localStorage.getItem("acceptedDiff");
  } else {
    acceptedDiff = 0
  }



  const setFileAcceptableDiffNumber = e => {
    e.preventDefault()
    console.log(data1);


    //console.log(email);
    //console.log(Password);
    localStorage.setItem("acceptedDiff", data1)
    console.log(localStorage.getItem("acceptedDiff"))


  }

  const downloadOldDisabledProducts = e => {
    e.preventDefault()
    setIsLoading(true);
    axios({
      method: 'post',
      responseType: 'blob',
      mode: "no-cors",
      //url: 'https://kmaz.pythonanywhere.com/download_disabledoldfiles',
      url: 'http://localhost:8001/download_disabledoldfiles',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      //console.log(res)
      setIsLoading(false)
      let filename = "Disabled_Products_Old.zip";
      fileDownload(res.data, filename)
    }).catch(error => {
      console.error(error)
    });

  }



  return (
    <MainLayout>
      <Row>

      </Row>
      <Row className="m-2">
        <Col>
          <strong>Απενεργοποιήσεις</strong>
          <Card className="Card">
            <Form onSubmit={setFileAcceptableDiffNumber}>

              <Form.Group className="mt-3" onChange={(e) => settextdata1(e.target.value)} type="type">
                <Form.Label>Αποδεκτή διαφορά αρχείων απενεργοποιήσεων</Form.Label>
                <Form.Control type="number" placeholder={acceptedDiff} step="0.1" />
              </Form.Group>
              <Row>
                <Col>
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
                        Εισαγωγή
                      </Col>
                    </Row>
                  </Button>
                </Col>
                <Col>
                  <Button className="mt-2" variant="primary" onClick={downloadOldDisabledProducts}>
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
                        Download Old Files
                      </Col>
                    </Row>
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card >
        </Col >
        <Col>
        </Col>
      </Row >

    </MainLayout >
  )
}

export default UserPref
