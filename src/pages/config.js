import React, { useState, useEffect, Component } from "react"
import { Link } from "gatsby"
import { Button, Card, Col, Row, Form, Spinner } from 'react-bootstrap';
import axios from 'axios'
import MainLayout from '../components/layouts/MainLayout';
import fileDownload from 'js-file-download'
import Step03 from "../components/forms/enable_products_step3";
import Step02 from "../components/forms/enable_products_step2";
import Step01 from "../components/forms/enable_products_step1";





const ConfigPage = () => {
  const [disable_company, setDisableCompany] = useState(null);
  const [companyxml, setCompanyXml] = useState(null);
  const [enable_company, setEnableCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selected_file, setSelectedFile] = useState(null);
  const [step, setstep] = useState(1);





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

  const getXml = () => {
    setIsLoading(true);
    axios({
      method: 'post',
      responseType: 'blob',
      mode: "no-cors",
      url: 'https://kmaz.pythonanywhere.com/gxml',
      //url: 'http://localhost:8001/dsr',
      data: { companyxml },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      //console.log(res)
      setIsLoading(false)
      let filename = companyxml;
      fileDownload(res.data, filename)
    }).catch(error => {
      console.error(error)
    });
  }


  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  const Continue = e => {
    e.preventDefault();
    nextStep();
  }

  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  const dsr = e => {
    e.preventDefault()

    //console.log(email);
    //console.log(Password);

    disabled_products();
  }

  const gxml = e => {
    e.preventDefault()

    //console.log(email);
    //console.log(Password);

    getXml();
  }





  // useEffect(() => {
  //    const interval = setInterval(wifiSettingsRequest, 5000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])


  const switch_form = () => {
    switch (step) {
      case 1:
        return (<div>
          <Step01 />
          <Row>
            <Col>
            </Col>
            <Col xs lg="2">
              <Button className="m-1" onClick={Continue}>Next</Button>
            </Col>
          </Row>
        </div >
        )
      case 2:
        return (<div>
          <Step02 />
          <Row>
            <Col>
            </Col>
            <Col xs lg="2">
              <Button className="m-1" onClick={Previous}>Previous</Button>
              <Button className="m-1" onClick={Continue}>Next</Button>
            </Col>
          </Row>
        </div>
        )
      case 3:
        return (<div>
          <Step03 />
          <Row>
            <Col>
            </Col>
            <Col xs lg="2">
              <Button className="m-1" onClick={Previous}>Previous</Button>
            </Col>
          </Row>
        </div>
        )
      default:
      // do nothing
    }
  }


  return (
    <MainLayout style={{
      backgroundColor: 'blue',
      width: '100px',
      height: '100px'
    }}>
      <Row>
        <Col>
        </Col>
        <Col>
          <div>
            Προϊόντα
          </div>
          <div>
            Προϊόντα
          </div>
        </Col>
        <Col xs lg="1">
          {isLoading &&
            <Spinner
              className="mr-5"
              as="span"
              animation="border"
              role="status"
              variant="primary"
              aria-hidden="true"
            />}</Col>
      </Row>
      <Row>
        <Col>
          <Card className="Card">
            <h2>Eνεργοποιήσεις Προϊόντων</h2>
            <div>{switch_form()}</div>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card className="Card">
            <Form onSubmit={dsr}>
              <Form.Group className="mb-3" controlId="dsr">
                <Form.Label>Απενεργοποιήσεις Προϊόντων</Form.Label>
              </Form.Group>
              <Form.Select aria-label="Select Supplier" onChange={(e) => setDisableCompany(e.target.value)} type="type">
                <option value="1">Select</option>
                <option value="Disabled Products Kikka Boo.csv">Kikka Boo</option>
                <option value="Disabled Products Lorelli.csv">Lorelli</option>
                <option value="Disabled Products Bebestars.csv">Bebestars</option>
                <option value="Disabled Products Cangaroo.csv">Cangaroo</option>
                <option value="Disabled Products Dimcol.xlsx">Dimcol</option>
                <option value="Disabled Products Le Blanc.xlsx">Le Blanc</option>
                <option value="Disabled Products Beauty Home.xlsx">Beauty Home</option>
                <option value="Disabled Products Baby Oliver.xlsx">Baby Oliver</option>
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
          <Card className="Card">
            <Form onSubmit={gxml}>
              <Form.Group className="mb-3" controlId="gxml">
                <Form.Label>Xml Προμηθευτών </Form.Label>
              </Form.Group>
              <Form.Select aria-label="Select Supplier" onChange={(e) => setCompanyXml(e.target.value)} type="type">
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