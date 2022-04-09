import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { Button, Card, Col, Row, Form, Table } from 'react-bootstrap';
import axios from 'axios'
import MainLayout from '../components/layouts/MainLayout';





const ConfigPage = () => {
  const [tableData, setTableData] = useState([]);


  const CodCheck = () => {
    axios({
      method: 'post',
      mode: "no-cors",
      // url: 'https://kmaz.pythonanywhere.com/cdc',
      url: 'http://localhost:8001/cdc',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      setTableData(res.data);
      console.log(tableData)
      console.log(res)
    }).catch(error => {
      console.error(error)
    });
  }


  const cdc = e => {
    e.preventDefault()

    //console.log(email);
    //console.log(Password);

    CodCheck();
  }
  // useEffect(() => {
  //    const interval = setInterval(wifiSettingsRequest, 5000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  const renderTableContent = () => {
    const data = [
      {
        voucher: '111',
        orderId: 1,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '222',
        orderId: 2,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '333',
        orderId: 3,
        data: '12/03/2022',
        status: false,
      },
      {
        voucher: '444',
        orderId: 4,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '111',
        orderId: 1,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '222',
        orderId: 2,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '333',
        orderId: 3,
        data: '12/03/2022',
        status: false,
      },
      {
        voucher: '444',
        orderId: 4,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '111',
        orderId: 1,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '222',
        orderId: 2,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '333',
        orderId: 3,
        data: '12/03/2022',
        status: false,
      },
      {
        voucher: '444',
        orderId: 4,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '111',
        orderId: 1,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '222',
        orderId: 2,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '333',
        orderId: 3,
        data: '12/03/2022',
        status: false,
      },
      {
        voucher: '444',
        orderId: 4,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '111',
        orderId: 1,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '222',
        orderId: 2,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '333',
        orderId: 3,
        data: '12/03/2022',
        status: false,
      },
      {
        voucher: '444',
        orderId: 4,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '111',
        orderId: 1,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '222',
        orderId: 2,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '333',
        orderId: 3,
        data: '12/03/2022',
        status: false,
      },
      {
        voucher: '444',
        orderId: 4,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '111',
        orderId: 1,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '222',
        orderId: 2,
        data: '12/03/2022',
        status: true,
      },
      {
        voucher: '333',
        orderId: 3,
        data: '12/03/2022',
        status: false,
      },
      {
        voucher: '444',
        orderId: 4,
        data: '12/03/2022',
        status: true,
      },
    ]

    return tableData.map(item => (
      <tr>
        <td>{item.voucher}</td>
        <td>{item.orderId}</td>
        <td>{item.data}</td>
        <td>{item.status}</td>
      </tr>
    ))
  }


  return (
    <MainLayout>
      <Row>
        <Form onSubmit={cdc}>
          <Form.Group className="mb-3" controlId="cdc">
            <Form.Label>CodCheck</Form.Label>
          </Form.Group>
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
          <Row>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Voucher</th>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody >
                  {renderTableContent()}
                </tbody>
              </Table>
            </div>

          </Row>
        </Form>
      </Row>
    </MainLayout >
  )
}

export default ConfigPage