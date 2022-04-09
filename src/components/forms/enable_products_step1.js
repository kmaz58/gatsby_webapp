import React, { useState, useEffect, Component } from "react"
import { Link } from "gatsby"
import { Button, Card, Col, Row, Form, Spinner } from 'react-bootstrap';
import axios from 'axios'





const Step01 = () => {
  const [selected_file, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const fuvp = e => {
    e.preventDefault()
    console.log(selected_file);


    //console.log(email);
    //console.log(Password);

    fileupload_vasipetit();
  }

  const fileupload_vasipetit = (e) => {
    setIsLoading(true);
    console.log(selected_file);
    const formData = new FormData();
    formData.append("name", "tmp");
    formData.append('file', selected_file);
    try {
      console.log(selected_file);
      console.log(formData.get("file"))
      axios({
        method: "post",
        url: 'https://kmaz.pythonanywhere.com/upload_vasipetit',
        //url: 'http://localhost:8001/upload_vasipetit',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false);
  }

  return (
    <div>
      <Form onSubmit={fuvp}>
        <Form.Group className="mt-3" onChange={(e) => setSelectedFile(e.target.files[0])} type="file">
          <Form.Label>Εισαγωγή Προϊόντων Monpetit</Form.Label>
          <Form.Control type="file" />
          <Button className="mt-2" variant="primary" type="submit" size="lg" >
            Εισαγωγή
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}


export default Step01
