import React from 'react';
import { Button, Form, Col, Carousel, CardDeck, Card,Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css";
import { Fragment } from 'react';

function Home() {
  function changeloginpage() {
    window.location.href = "/login";
  }
  function changeregisterpage() {
    window.location.href = "/register";
  }
  function changepatientloginpage() {
    window.location.href = "/Patientlogin";
  }
  function changepatientregisterpage() {
    window.location.href = "/Patientregister";
  }
  return (
    <Fragment>
      {/* <div className="home">
          <br></br>
          <br></br>
          <br></br>
    <div class="carousalpor"> */}
      <br />
      <br />
      <br />
      <div
        style={{
          background: "#ebf3f5",
          padding: "5px",
          // width: "900px",
          borderRadius: "15px",
          justifyContent: "center",
          textAlign: "center",
          margin: "auto",
          width: "98%",
          position: "fixed",
          top: "50px",
          left: "0px",
          right: "0px",
          bottom: "295px",
        }}
      >
        <Carousel>
          <Carousel.Item interval={200}>
            <img
              height="400px !important"
              className="d-block w-100"
              src="https://images.pexels.com/photos/2383010/pexels-photo-2383010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3></h3>
              <p style={{color: 'black'}}>
                Healthcare is the maintenance or improvement of health via the
                prevention, diagnosis, treatment, recovery, or cure of disease,
                illness, injury, and other physical and mental impairments in
                people.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={200}>
            <img
              height="400px !important"
              className="d-block w-100"
              src="https://wallpapercave.com/wp/wp2469685.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3 style={{color: 'black'}}>EMR</h3>
              <p style={{color: 'black'}}>
                An electronic health record is the systematized collection of
                patient and population electronically stored health information
                in a digital format. These records can be shared across
                different health care settings.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              height="400px !important"
              className="d-block w-100"
              src="https://image.freepik.com/free-vector/doctors-research-with-digital-device-patient_82574-85.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3 style={{color: 'black'}}>Visualisation</h3>
              <div style={{width:"fit-content", backgroundColor:"white"}}>
              <p style={{color: 'black'}}>
                Analyze current and historical industry data to predict trends,
                improve outreach, and even better manage the spread of diseases.
                It can reveal paths to improvement in patient care quality,
                clinical data, diagnosis, and business management.
              </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div
        style={{
          padding: "10px",
          // width: "900px",
          borderRadius: "15px",
          justifyContent: "center",
          textAlign: "center",
          margin: "auto",
          width: "38%",
          height: "20% !important",
          position: "fixed",
          top: "1250px",
          left: "300px",
          right: "300px",
          bottom: "1050px",
        }}
      >
        <CardDeck>
          <Card border="primary" height="30px !important">
            <Card.Img
              variant="top"
              src="https://w0.pngwave.com/png/59/292/computer-icons-user-icon-design-patient-png-clip-art.png"
              height="150px"
            />
            <Card.Body>
              <Card.Title>Patient</Card.Title>
              <Button variant="success" onClick={changepatientloginpage}>
                Login
              </Button>
              &nbsp;&nbsp;
              <Button variant="warning" onClick={changepatientregisterpage}>
                Register
              </Button>
            </Card.Body>
          </Card>
          <Card border="primary">
            <Card.Img
              variant="top"
              height="150px"
              src="https://media.istockphoto.com/vectors/medical-team-icon-male-and-female-doctor-symbols-on-gray-background-vector-id990307026"
            />
            <Card.Body>
              <Card.Title>Doctor</Card.Title>
              <Button variant="success" onClick={changeloginpage}>
                Login
              </Button>
              &nbsp;&nbsp;
              <Button variant="warning" onClick={changeregisterpage}>
                Register
              </Button>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    </Fragment>
  );
}

export default Home;