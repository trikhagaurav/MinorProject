import React from 'react';
import { Button, Form, Col, Carousel } from "react-bootstrap";
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
            <Carousel>
                <Carousel.Item>
                    <img
                        className="doctorpic"
                        src="https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
                        alt="Doctor slide"
                        width="500px"
                    />
                    <Carousel.Caption class="font">
                    <h3>Doctor </h3>
                    <p> A person who is licensed to practice medicine and has trained at a school of medicine, osteopathic medicine, chiropractic, optometry, podiatry, dentistry, or veterinary medicine.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="patientpic"
                    src="https://understandingpatientdata.org.uk/themes/upd/assets/images/hero.svg"
                    alt="Patient slide"
                    width="500px"
                    />

                    <Carousel.Caption class="font">
                    <h3>Patient</h3>
                    <p>A patient is any recipient of health care services performed by healthcare professionals.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="hospitalpic"
                    src="https://1t6hhl2qpk1w3268212z843v-wpengine.netdna-ssl.com/wp-content/uploads/cmh-ventura-exterior.jpg"
                    alt="Hospital slide"
                    width="500px"
                    />

                    <Carousel.Caption class="font">
                    <h3>Hospital</h3>
                    <p>A hospital is a health care institution providing patient treatment with specialized medical and nursing staff and medical equipment.</p>
                    </Carousel.Caption> 
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        // <div className="home" >
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
                        // </div>
    );
}

export default Home;