import React, { useState, useEffect, Component } from "react"
import { Link } from "gatsby"
import { Button, Card, Col, Row, Form, Spinner } from 'react-bootstrap';
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';



const MonpetitStock = () => {
  const [data1, settextdata1] = useState(null);
  const [data2, settextdata2] = useState(null);
  const [data3, settextdata3] = useState(null);
  const [value, onChange] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [textdata_label, settextdata_label] = useState("No File Selected");


  const dailyReport = e => {
    e.preventDefault()
    console.log(data1);


    //console.log(email);
    //console.log(Password);

    petit_stock();
  }

  const petit_stock = (e) => {

    let Monpetit_Warehouse = data1;
    let Monpetit_Shop = data2;
    let Monpetit_Marios = data3;
    let DateAdded = value;

    console.log(Monpetit_Marios);

    //console.log(formData)

    setIsLoading(true);
    console.log(DateAdded);
    axios({
      method: "post",
      //url: 'https://kmaz.pythonanywhere.com/setdatatosheets',
      url: 'http://localhost:8001/setdatatosheets',
      data: { DateAdded, Monpetit_Warehouse, Monpetit_Shop, Monpetit_Marios },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      console.log(res);
      setIsLoading(false);
      settextdata_label("Updated");

    }).catch(error => {
      console.error(error)
    });
  }

  return (
    <div>
      <Card>
        <Form onSubmit={dailyReport}>
          <Row >
            <Col className="m-2" >
              <Calendar onChange={onChange} value={value} />
            </Col>
            <Col>

              <Form.Group className="mt-3" onChange={(e) => settextdata1(e.target.value)} type="type">
                <Form.Label>Monpetit Warehouse</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group className="mt-3" onChange={(e) => settextdata2(e.target.value)} type="type">
                <Form.Label>Monpetit Shop</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group className="mt-3" onChange={(e) => settextdata3(e.target.value)} type="type">
                <Form.Label>Monpetit MariosTsimpos</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

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
          </Row>
        </Form>
      </Card>

    </div >
  )
}


export default MonpetitStock
