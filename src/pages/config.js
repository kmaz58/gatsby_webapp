import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import axios from 'axios'
import MainLayout from '../components/layouts/MainLayout';
import fileDownload from 'js-file-download'





const ConfigPage = () => {
  const [wifiSSID, setSSID] = useState(null);
  const [wpaKey, setWPA] = useState(null);
  const [simPin, setPIN] = useState(null);
  const [carrier, setCARRIER] = useState(null);


  const wifiSettingsRequest = () => {
    axios({
      method: 'post',
      mode: "no-cors",
      url: 'http://kmaz.pythonanywhere.com/wsr',
      data: { SSID: wifiSSID, wpa: wpaKey },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      console.log(res)

    }).catch(error => {
      console.error(error)
    });
  }

  const dataSettingsRequest = () => {
    axios({
      method: 'post',
      mode: "no-cors",
      url: 'http://kmaz.pythonanywhere.com/dsr',
      data: { pin: simPin, carrier: carrier },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      console.log(res)
      let extension = ".csv"
      let filename = carrier.concat(extension);
      fileDownload(res.data, filename)
    }).catch(error => {
      console.error(error)
    });
  }

  const wsr = e => {
    e.preventDefault()

    //console.log(email);
    //console.log(Password);

    wifiSettingsRequest();
  }

  const dsr = e => {
    e.preventDefault()

    //console.log(email);
    //console.log(Password);

    dataSettingsRequest();
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
              <Form.Select aria-label="Select Carrier" onChange={(e) => setCARRIER(e.target.value)} type="type">
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
                <Form.Label>Eνεργοποιήσεις Προϊόντων</Form.Label>
              </Form.Group>
              <Form.Select aria-label="Select Carrier" onChange={(e) => setCARRIER(e.target.value)} type="type">
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