import * as React from "react"

import MainLayout from "../components/layouts/MainLayout"
import Pdfconverter from "../components/forms/pdf_converter_skroutz"
import { Card, Row, Col } from "react-bootstrap"

const Contact = () => {
  return (
    <MainLayout>
      <h2>Check Skroutz</h2>
      <Row>
        <Col>
          <Card className="Card">
            <Pdfconverter />
          </Card>
        </Col>
        <Col>
        </Col>
      </Row>
    </MainLayout>

  )
}
export default Contact
