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

const Patientprofile = ({ setAuth }) => {
  const [first_name, setName] = useState("");
  const [last_name, setLName] = useState("");
  const [middle_name, setMName] = useState("");
  const [gender, setGender] = useState("");
  const [date_of_birth, setDOB] = useState("");
  const [blood_group, setBgroup] = useState("");
  const [marital_status, setMar] = useState("");
  const [employeed, setEmp] = useState("");
  const [address, setAddress] = useState("");
  const [mobile_number, setMob] = useState("");
  const [phone_number, setphone] = useState("");
  const [username, setUsername] = useState("");
 // const [first_name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5001/patientdash/", {
        method: "GET",
        headers: { token:localStorage.token },
      });

      const parseRes = await response.json();
      console.log(`Parse= ${parseRes}`);
      setName(parseRes.first_name);
      setMName(parseRes.middle_name);
      setLName(parseRes.last_name);
      setGender(parseRes.gender);
      setDOB(parseRes.date_of_birth);
      setBgroup(parseRes.blood_group);
      setMar(parseRes.marital_status);
      setEmp(parseRes.employeed);
      setAddress(parseRes.address);
      setMob(parseRes.mobile_number);
      setphone(parseRes.phone_number);
      setUsername(parseRes.username);
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
        <Navbar.Brand>
          <Link
            className="text-white"
            to="/Patientdashboard"
            style={{ textDecoration: "none" }}
          >
            Hi! {first_name}
          </Link>
        </Navbar.Brand>
        <Nav>
          <Nav.Link>
            <Link
              className="text-white"
              to="/Patientdashboard"
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              className="text-white"
              to="/patientprofile"
              style={{ textDecoration: "none" }}
            >
              Profile
            </Link>
          </Nav.Link>
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
          <Col xs="auto"><h5><b>Date of Birth: </b><Moment format="DD/MM/YYYY">{date_of_birth}</Moment></h5></Col>
          <Col xs="auto"><h5><b>Gender: </b>{gender}</h5></Col>
          <Col xs="auto"><h5><b>Blood Group: </b>{blood_group}</h5></Col>
        </Row>
        <Row>
          <Col xs="auto"><h5><b>Marital Status: </b>{marital_status}</h5></Col>
          <Col xs="auto"><h5><b>Employed: </b>{employeed}</h5></Col>
        </Row>
        <Row>
          <Col xs="auto"><h5><b>Address: </b>{address}</h5></Col>
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
export default Patientprofile;