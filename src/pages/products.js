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
      let disabled_products_res = res.data
      // fileDownload(res.data, filename)
      axios({
        method: 'post',
        mode: "no-cors",
        url: 'https://kmaz.pythonanywhere.com/percentage',
        //url: 'http://localhost:8001/percentage',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }).then(res => {

        if (res.data > parseFloat(localStorage.getItem("acceptedDiff"))) {
          console.log("Last percentage:", res.data)
          alert('Πολύ μεγάλη διαφορά μεταξύ των τελευταίων αρχείων: ' + Math.round(res.data * 100) / 100 + ' %\n\n' + 'Αποδεκτή Διαφορά: <= ' + Math.round(localStorage.getItem("acceptedDiff") * 100) / 100 + '%\n');
        }
        else {
          console.log("Last percentage:", res.data)
          fileDownload(disabled_products_res, filename)
        }


        // console.log(res.data)

      }).catch(error => {
        console.error(error)
      });


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
      //url: 'https://kmaz.pythonanywhere.com/gxml',
      url: 'http://localhost:8001/getrawxml',
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
              <Row>
                <Col>
                  <Button className="m-1" onClick={Previous}>Previous</Button>
                  <Button className="m-1" onClick={Continue}>Next</Button>
                </Col>
              </Row>
            </Col>
          </Row >
        </div >
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
            <h4>Eνεργοποιήσεις Προϊόντων</h4>
            <div>{switch_form()}</div>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card className="Card">
            <Form onSubmit={dsr}>
              <Form.Group className="mb-3" controlId="dsr">
                <Form.Label><h4>Απενεργοποιήσεις Προϊόντων</h4></Form.Label>
              </Form.Group>
              <Form.Select aria-label="Select Supplier" onChange={(e) => setDisableCompany(e.target.value)} type="type">
                <option value="1">Select</option>
                <option value="Kikka Boo Disabled Products.xlsx">Kikka Boo</option>
                <option value="Lorelli Disabled Products.xlsx">Lorelli</option>
                <option value="Bebestars Disabled Products.xlsx">Bebestars</option>
                <option value="Cangaroo Disabled Products.xlsx">Cangaroo</option>
                <option value="Dimcol Disabled Products.xlsx">Dimcol</option>
                <option value="Le Blanc Disabled Products.xlsx">Le Blanc</option>
                <option value="Beauty Home Disabled Products.xlsx">Beauty Home</option>
                <option value="Baby Oliver Disabled Products.xlsx">Baby Oliver</option>
              </Form.Select>
              <Row className="mt-5">
                <Col className="mt-4" md={{ span: 4, offset: 2 }} >
                  <Button variant="primary" type="submit" >
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
                <Form.Label><h4>Xml Προμηθευτών (Raw) </h4></Form.Label>
              </Form.Group>
              <Form.Select aria-label="Select Supplier" onChange={(e) => setCompanyXml(e.target.value)} type="type">
                <option value="1">Select</option>
                <option value="Kikka Boo.xml">Kikka Boo</option>
                <option value="Lorelli.xml">Lorelli</option>
                <option value="Bebestars.xml">Bebestars</option>
                <option value="Cangaroo.xml">Cangaroo</option>
                <option value="Dimcol.xlsx">Dimcol</option>
                <option value="Le Blanc.xml">Le Blanc</option>
                <option value="Beauty Home.xml">Beauty Home</option>
                <option value="Baby Oliver.xml">Baby Oliver</option>
              </Form.Select>
              <Row className="mt-5">
                <Col className="mt-4" md={{ span: 4, offset: 2 }} >
                  <Button variant="primary" type="submit"  >
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