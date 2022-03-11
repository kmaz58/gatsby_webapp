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
      url: 'http://localhost:8001/wsr',
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
      url: 'http://localhost:8001/dsr',
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
            <Form onSubmit={wsr}>
              <Form.Group className="mb-3" controlId="wsr">
                <Form.Label>Wifi SSID</Form.Label>
                <Form.Control onChange={(e) => setSSID(e.target.value)} type="text" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  This is a text
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>WPA key</Form.Label>
                <Form.Control onChange={(e) => setWPA(e.target.value)} type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
              </Form.Group>
              <Button variant="primary" type="submit">
                Set Wifi
              </Button>
            </Form>
          </Card>
        </Col>
        <Col>
          <Card className="p-2">
            <Form onSubmit={dsr}>
              <Form.Group className="mb-3" controlId="dsr">
                <Form.Label>Sim Pin</Form.Label>
                <Form.Control onChange={(e) => setPIN(e.target.value)} type="type" />
                <Form.Text className="text-muted">
                  If none, leave empty.
                </Form.Text>
              </Form.Group>
              <Form.Select aria-label="Select Carrier" onChange={(e) => setCARRIER(e.target.value)} type="type">
                <option value="Kikkaboo">Cosmote</option>
                <option value="Vodafone">Vodafone</option>
                <option value="Wind">Wind</option>
              </Form.Select>
              <Row className="mt-5">
                <Col>
                  <Button variant="primary" type="submit">
                    Set Data Connection
                  </Button>
                </Col>
                <Col>
                  <p className="text-right">Charges may apply</p>
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