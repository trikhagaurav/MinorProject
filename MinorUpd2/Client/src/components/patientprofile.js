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
          <Navbar.Brand><Link className="text-white" to="/Patientdashboard" style={{ textDecoration: 'none' }}>Hi! {first_name}</Link></Navbar.Brand>
          <Nav>
            <Nav.Link><Link className="text-white" to="/Patientdashboard" style={{ textDecoration: 'none' }}>Home</Link></Nav.Link>
            <Nav.Link><Link className="text-white" to="/patientprofile" style={{ textDecoration: 'none' }}>Profile</Link></Nav.Link>
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
      
      <h1>Your Profile</h1>
      <div style={{
      background: '#ebf3f5',
      marginBottom: '0',
    }}>
      <Table striped bordered hover borderless='true'>
  
  <tbody>
    <tr>
      <td><b>First Name: </b>{first_name}</td>
      <td><b>Middle Name: </b>{middle_name}</td>
      <td><b>Last Name: </b>{last_name}</td>
    </tr>
    <tr>
      <td><b>Date Of Birth: </b><Moment format="DD/MM/YYYY">{date_of_birth}</Moment></td>
      <td><b>Gender: </b>{gender}</td>
      <td><b>Blood Group: </b>{blood_group}</td>
    </tr>
    <tr>
      <td colSpan='2'><b>Address: </b>{address}</td>
    </tr>
    <tr>
      <td><b>Mobile Number: </b>+91{mobile_number}</td>
      <td><b>Phone Number: </b>{phone_number}</td>
    </tr>
    <tr>
      <td><b>Username: </b>{username}</td>
    </tr>
  </tbody>
</Table>
</div>
    </Fragment>
  );
};
export default Patientprofile;