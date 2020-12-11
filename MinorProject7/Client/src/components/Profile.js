import React,{Fragment, useState, useEffect, Component } from "react";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import { Row, Col } from 'reactstrap';
import {
  NavItem,
  Nav,
  FormControl,
  Navbar,
  NavDropdown,
  Table,
  MenuItem,
  Button,
  Card,
} from "react-bootstrap";
import Moment from 'react-moment';

const profile = ({ setAuth }) => {
  const [first_name, setName] = useState("");
  const [last_name, setLName] = useState("");
  const [middle_name, setMName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [hospital_name, setHName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [mobile_number, setMob] = useState("");
  const [phone_number, setphone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
 // const [first_name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5001/dashboard/", {
        method: "GET",
        headers: { token:localStorage.token },
      });

      const parseRes = await response.json();
      setName(parseRes.first_name);
      setMName(parseRes.middle_name);
      setLName(parseRes.last_name);
      setGender(parseRes.gender);
      setDOB(parseRes.dob);
      setHName(parseRes.hospital_name);
      setSpeciality(parseRes.speciality);
      setMob(parseRes.mobile_number);
      setphone(parseRes.phone_number);
      setUsername(parseRes.username);
      setPass(parseRes.password);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token");
    setAuth(false);
    //toast.success("Logged out successfully");
}

  useEffect(() => {
    setAuth(true);
    getName();
  }, []);
  return (
    <Fragment>
      <Navbar width="auto" fixed="top" bg="primary" variant="light">
          <Navbar.Brand><Link className="text-white" to="/dashboard" style={{ textDecoration: 'none' }}>Hi! {first_name}</Link></Navbar.Brand>
          <Nav>
            <Nav.Link><Link className="text-white" to="/dashboard" style={{ textDecoration: 'none' }}>Home</Link></Nav.Link>
            <Nav.Link><Link className="text-white" to="/Profile" style={{ textDecoration: 'none' }}>Profile</Link></Nav.Link>
            <Nav.Link
              className="border-left pl-2 ml-auto text-white"
              onClick={(e) => logout(e)}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      
      <div
        style={{
          background: "#ebf3f5",
         // display:"flex",
          justifyContent:"center",
          textAlign:"center",
          width:"fit-content",
          height:"fit-content",
          margin:"auto",
          borderRadius:"15px",
          padding: "20px 10px 15px 20px",
        }}
      >
      <h2>Your Profile</h2>
      <br />
        <Row>
          <Col lg="auto"><h5><b>First Name:</b> {first_name}</h5></Col>
          <Col lg="auto"><h5><b>Middle Name: </b>{middle_name}</h5></Col>
          <Col lg="auto"><h5><b>Last Name: </b>{last_name}</h5></Col>
        </Row>
        <Row>
          <Col xs="auto"><h5><b>Date of Birth: </b><Moment format="DD/MM/YYYY">{dob}</Moment></h5></Col>
          <Col xs="auto"><h5><b>Gender: </b>{gender}</h5></Col>
        </Row>
        <Row>
          <Col xs="auto"><h5><b>Hospital/Clinic: </b>{hospital_name}</h5></Col>
          <Col xs="auto"><h5><b>Speciality: </b>{speciality}</h5></Col>
        </Row>
        <Row>
          <Col xs="auto"><h5><b>Mobile Number: </b>{mobile_number}</h5></Col>
          <Col xs="auto"><h5><b>Phone Number: </b>{phone_number}</h5></Col>
        </Row>
        <Row>
          <Col xs="auto"><h5><b>Username: </b>{username}</h5></Col>
        </Row>
        </div>
    </Fragment>
  );
};
export default profile;