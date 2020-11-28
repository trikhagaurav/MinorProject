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
      const response = await fetch("http://localhost:5001/auth/todo/check1", {
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
    setAuth(true);
    //toast.success("Logged out successfully");
}

  useEffect(() => {
    getName();
  }, []);
  return (
    <Fragment>
      <Navbar width="auto" fixed="top" bg="light" variant="light">
        <Navbar.Brand href="#home">Hi! {first_name}</Navbar.Brand>
        <Nav>
          <Nav.Link className="border-left pl-2 ml-auto"
            onClick={(e) => logout(e)}>Home</Nav.Link>
          <Nav.Link
            className="border-left pl-2 ml-auto"
            href="http://localhost:3000/profile"
          >
            Profile
          </Nav.Link>
          <Nav.Link
            className="border-left pl-2 ml-auto"
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
      <Table striped bordered hover borderless='true'>
  
  <tbody>
    <tr>
      <td><b>First Name: </b>{first_name}</td>
      <td><b>Middle Name: </b>{middle_name}</td>
      <td><b>Last Name: </b>{last_name}</td>
    </tr>
    <tr>
      <td><b>Date Of Birth: </b><Moment format="DD/MM/YYYY">{dob}</Moment></td>
      <td><b>Gender: </b>{gender}</td>
    </tr>
    <tr>
      <td colSpan='2'><b>Hospital Name: </b>{hospital_name}</td>
      <td><b>Speciality: </b>{speciality}</td>
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
    </Fragment>
  );
};
export default profile;