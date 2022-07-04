import React, { useState, useEffect, Component } from "react"
import { Link } from "gatsby"
import { Button, Card, Col, Row, Form, Spinner } from 'react-bootstrap';
import axios from 'axios'
import fileDownload from 'js-file-download'


const Step03 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [enable_company, setEnableCompany] = useState(null);

  const esr = e => {
    e.preventDefault()
    //console.log(email);
    //console.log(Password);

    enabled_products();
  }

  const enabled_products = () => {
    setIsLoading(true);
    axios({
      method: 'post',
      responseType: 'blob',
      mode: "no-cors",
      url: 'https://kmaz.pythonanywhere.com/esr',
      //url: 'http://localhost:8001/esr',
      data: { enable_company },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {

      //console.log(res)
      setIsLoading(false)
      let filename = enable_company;
      fileDownload(res.data, filename)
    }).catch(error => {
      console.error(error)
    });
  }

  return (
    <div>
      <Form onSubmit={esr}>
        <Form.Group className="mb-3" controlId="esr">
          <Form.Label>Επιλέξτε Εταιρεία</Form.Label>
        </Form.Group>
        <Form.Select aria-label="Select Carrier" onChange={(e) => setEnableCompany(e.target.value)} type="type">
          <option value="1">Select</option>
          <option value="Enabled Products Kikka Boo.xlsx">Kikka Boo</option>
          <option value="Enabled Products Lorelli.xlsx">Lorelli</option>
          <option value="Enabled Products Bebestars.xlsx">Bebestars</option>
          <option value="Enabled Products Cangaroo.xlsx">Cangaroo</option>
          <option value="Enabled Products Dimcol.xlsx">Dimcol</option>
          <option value="Enabled Products Le Blanc.xlsx">Le Blanc</option>
          <option value="Enabled Products Beauty Home.xlsx">Beauty Home</option>
          <option value="Enabled Products Baby Oliver.xlsx">Baby Oliver</option>
        </Form.Select>
        <Row className="mt-5">
          <Col>
            <Button variant="primary" type="submit" >
              <Row>{isLoading &&
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
                <Col>Λήψη</Col>
              </Row>
            </Button>
          </Col>
        </Row >
      </Form >
    </div >
  )

}
export default Step03