import React from 'react';
import { Button, Form, Col, Carousel, CardDeck, Card,Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css";

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
        <div className="home" >
            <br></br>
            <br></br>
            <br></br>
            <div class="patientpor">
            <CardDeck >
                <Card>
                    <Card.Img variant="top" src="https://www.reutersevents.com/pharma/sites/default/files/patient.jpg" height="300px" />
                    <Card.Body>
                        <Card.Title>Patient</Card.Title>
                        <Button variant="success" onClick={changepatientloginpage}>Login</Button>
                        &nbsp;&nbsp;
                        <Button variant="warning" onClick={changepatientregisterpage}>Register</Button>
                    </Card.Body>
                </Card>
            </CardDeck>
            </div>
            <div class="carousalpor">
            <Carousel >
                <Carousel.Item>
                    <img
                        className="doctorpic"
                        src="https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
                        alt="Doctor slide"
                        width="300px"
                    />
                    <Carousel.Caption class="font">
                    <h3>Doctor </h3>
                    <p> A person who is licensed to practice medicine and has trained at a school of medicine, osteopathic medicine, chiropractic, optometry, podiatry, dentistry, or veterinary medicine.</p>
                    {/* <Button block bsSize="large" onClick={changeloginpage} >
                    Doctor Login
                    </Button>
                <Button block bsSize="large" onClick={changeregisterpage}>
                    Doctor Register
                    </Button> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="patientpic"
                    src="https://understandingpatientdata.org.uk/themes/upd/assets/images/hero.svg"
                    alt="Patient slide"
                    width="300px"
                    />

                    <Carousel.Caption class="font">
                    <h3>Patient</h3>
                    <p>A patient is any recipient of health care services performed by healthcare professionals.</p>
                    {/* <Button block bsSize="large" onClick={changepatientloginpage} >
                    Patient Login
                    </Button>
                    <Button block bsSize="large" onClick={changepatientregisterpage}>
                         Patient Register
                    </Button> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="hospitalpic"
                    src="https://1t6hhl2qpk1w3268212z843v-wpengine.netdna-ssl.com/wp-content/uploads/cmh-ventura-exterior.jpg"
                    alt="Hospital slide"
                    width="300px"
                    />

                    <Carousel.Caption class="font">
                    <h3>Hospital</h3>
                    <p>A hospital is a health care institution providing patient treatment with specialized medical and nursing staff and medical equipment.</p>
                    </Carousel.Caption> 
                    </Carousel.Item>
                </Carousel>
            </div>
            <div class="doctorpor">
            <CardDeck>
                <Card>
                    <Card.Img variant="top" src="https://cdn.sanity.io/images/0vv8moc6/hcplive/0ebb6a8f0c2850697532805d09d4ff10e838a74b-200x200.jpg?auto=format" height="300px" />
                    <Card.Body>
                        <Card.Title>Doctor</Card.Title>
                        <Button variant="success" onClick={changeloginpage}>Login</Button>
                        &nbsp;&nbsp;
                        <Button variant="warning" onClick={changeregisterpage}>Register</Button>
                    </Card.Body>
                </Card>
            </CardDeck>
            </div>
                        {/* // <div className="home" >
                        //     <div class="formhome">
                        //         <h1>DigiMR</h1>
                        //         <Form >
                        //             <Button block bsSize="large" onClick={changeloginpage} >
                        //                 Doctor Login
                        //                 </Button>
                        //             <Button block bsSize="large" onClick={changeregisterpage}>
                        //                 Doctor Register
                        //                 </Button>
                        //             <Button block bsSize="large" onClick={changepatientloginpage} >
                        //                 Patient Login
                        //                 </Button>
                        //             <Button block bsSize="large" onClick={changepatientregisterpage}>
                        //                 Patient Register
                        //                 </Button>
                        //         </Form>
                        //     </div>
                        // </div> */}
                        </div>
    );
}

export default Home;