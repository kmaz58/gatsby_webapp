import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { Button, Card, Col, Row, Form, Spinner } from 'react-bootstrap';
import axios from 'axios'
import MainLayout from '../components/layouts/MainLayout';
import fileDownload from 'js-file-download'





const ConfigPage = () => {
  const [disable_company, setDisableCompany] = useState(null);
  const [enable_company, setEnableCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const enabled_products = () => {
    axios({
      method: 'post',
      responseType: 'blob',
      mode: "no-cors",
      url: 'https://kmaz.pythonanywhere.com/esr',
      data: { enable_company },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      console.log(res)
      let extension = ".csv"
      let filename = enable_company.concat(extension);
      fileDownload(res.data, filename)

    }).catch(error => {
      console.error(error)
    });
  }

  const disabled_products = () => {
    setIsLoading(true);
    axios({
      method: 'post',
      responseType: 'blob',
      mode: "no-cors",
      url: 'https://kmaz.pythonanywhere.com/dsr',
      //url: 'http://localhost:8001/dsr',
      data: { disable_company },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      //console.log(res)
      setIsLoading(false)
      let filename = disable_company;
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
            <Form onSubmit={esr}>
              <Form.Group className="mb-3" controlId="esr">
                <Form.Label>Eνεργοποιήσεις Προϊόντων</Form.Label>
              </Form.Group>
              <Form.Select aria-label="Select Carrier" onChange={(e) => setEnableCompany(e.target.value)} type="type">
                <option value="1">Select</option>
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
            <Form onSubmit={dsr}>
              <Form.Group className="mb-3" controlId="dsr">
                <Form.Label>Απενεργοποιήσεις Προϊόντων</Form.Label>
              </Form.Group>
              <Form.Select aria-label="Select Supplier" onChange={(e) => setDisableCompany(e.target.value)} type="type">
                <option value="1">Select</option>
                <option value="Kikka Boo.csv">Kikka Boo</option>
                <option value="Lorelli.csv">Lorelli</option>
                <option value="Bebestars.csv">Bebestars</option>
                <option value="Cangaroo.csv">Cangaroo</option>
                <option value="Dimcol.xlsx">Dimcol</option>
                <option value="Le Blanc.xlsx">Le Blanc</option>
                <option value="Beauty Home.xlsx">Beauty Home</option>
                <option value="Baby Oliver.xlsx">Baby Oliver</option>
              </Form.Select>
              <Row className="mt-5">
                <Col className="mt-4" md={{ span: 4, offset: 2 }} >
                  <Button variant="primary" type="submit" size="lg" >
                    {isLoading &&
                      <Spinner
                        className="mr-5"
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />}
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