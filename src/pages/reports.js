import React, { useState, useEffect, Component } from "react"
import { Button, Card, Col, Row, Form, Spinner } from 'react-bootstrap';

import MainLayout from "../components/layouts/MainLayout"
import MonpetitStock from "../components/forms/monpetit_stock"
import TorouxoStock from "../components/forms/torouxo_stock"
import YgeiaStock from "../components/forms/ygeia"

const Reports = () => {
  const [step, setstep] = useState("monpetit");


  // function for going to next step by increasing step state by 1
  const monpetit = () => {
    setstep("monpetit");
  };

  const torouxo = () => {
    setstep("torouxo");
  };

  // function for going to previous step by decreasing step state by 1
  const ygeia = () => {
    setstep("ygeia");
  };

  const Ygeia = e => {
    e.preventDefault();

    ygeia();
  }

  const Monpetit = e => {
    e.preventDefault();

    monpetit();
  }

  const Torouxo = e => {
    e.preventDefault();

    torouxo();
  }

  const switch_form = () => {
    switch (step) {
      case "monpetit":
        return (<div>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Button className="m-1" onClick={Monpetit}>Monpetit</Button>
                  <Button className="m-1" onClick={Torouxo}>Torouxo</Button>
                  <Button className="m-1" onClick={Ygeia}>Ygeia</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <MonpetitStock />
            </Col>
          </Row>
        </div >
        )
      case "torouxo":
        return (<div>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Button className="m-1" onClick={Monpetit}>Monpetit</Button>
                  <Button className="m-1" onClick={Torouxo}>Torouxo</Button>
                  <Button className="m-1" onClick={Ygeia}>Ygeia</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <TorouxoStock />
            </Col>
          </Row>
        </div>
        )
      case "ygeia":
        return (<div>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Button className="m-1" onClick={Monpetit}>Monpetit</Button>
                  <Button className="m-1" onClick={Torouxo}>Torouxo</Button>
                  <Button className="m-1" onClick={Ygeia}>Ygeia</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <YgeiaStock />
            </Col>
          </Row>
        </div>
        )
      default:
      // do nothing
    }
  }
  return (
    <MainLayout>
      <h1>
        Αναφορές
      </h1>
      <div>{switch_form()}</div>
    </MainLayout>
  )
}

export default Reports
