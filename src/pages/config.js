import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import axios from 'axios'
import MainLayout from '../components/layouts/MainLayout';
import fileDownload from 'js-file-download'





const ConfigPage = () => {
  const [disable_company, setDisableCompany] = useState(null);
  const [enable_company, setEnableCompany] = useState(null);


  const disabled_products = () => {
    axios({
      method: 'post',
      mode: "no-cors",
      url: 'https://kmaz.pythonanywhere.com/dsr',
      data: { disable_company },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      console.log(res)
      let extension = ".csv"
      let filename = disable_company.concat(extension);
      fileDownload(res.data, filename)

    }).catch(error => {
      console.error(error)
    });
  }

  const enabled_products = () => {
    axios({
      method: 'post',
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
      let extension = ".csv"
      let filename = enable_company.concat(extension);
      fileDownload(res.data, filename)
    }).catch(error => {
      console.error(error)
    });
  }

  const esr = e => {
    e.preventDefault()

    //console.log(email);
    //console.log(Password);

    enabled_products();
  }

  const dsr = e => {
    e.preventDefault()

    //console.log(email);
    //console.log(Password);

    disabled_products();
  }
  // useEffect(() => {
  //    const interval = setInterval(wifiSettingsRequest, 5000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  return (
    <MainLayout>
      <Row>
        <Col>
          <Card className="p-2">
            <Form onSubmit={dsr}>
              <Form.Group className="mb-3" controlId="dsr">
                <Form.Label>Απενεργοποιήσεις Προϊόντων</Form.Label>
              </Form.Group>
              <Form.Select aria-label="Select Carrier" onChange={(e) => setDisableCompany(e.target.value)} type="type">
                <option value="Kikkaboo">Kikkaboo</option>
                <option value="Lorelli">Lorelli</option>
                <option value="Bebestars">Bebestars</option>
                <option value="Cangaroo">Cangaroo</option>
              </Form.Select>
              <Row className="mt-5">
                <Col className="mt-4" md={{ span: 4, offset: 2 }} >
                  <Button variant="primary" type="submit" size="lg" >
                    Λήψη
                  </Button>
                </Col>
                <Col>
                  <p className="text-right">Λίγες Οδηγίες. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        <Col>
          <Card className="p-2">
            <Form onSubmit={esr}>
              <Form.Group className="mb-3" controlId="esr">
                <Form.Label>Eνεργοποιήσεις Προϊόντων</Form.Label>
              </Form.Group>
              <Form.Select aria-label="Select Carrier" onChange={(e) => setEnableCompany(e.target.value)} type="type">
                <option value="Kikkaboo">Kikkaboo</option>
                <option value="Lorelli">Lorelli</option>
                <option value="Bebestars">Bebestars</option>
                <option value="Cangaroo">Cangaroo</option>
              </Form.Select>
              <Row className="mt-5">
                <Col className="mt-4" md={{ span: 4, offset: 2 }} >
                  <Button variant="primary" type="submit" size="lg" >
                    Λήψη
                  </Button>
                </Col>
                <Col>
                  <p className="text-right">Λίγες Οδηγίες. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </MainLayout >
  )
}

export default ConfigPage