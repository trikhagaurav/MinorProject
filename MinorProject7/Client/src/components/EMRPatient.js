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
  Media,
} from "react-bootstrap";
import Moment from 'react-moment';
import ViewEMR from "./ViewEMR";

const EMRPatient = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  
  async function getData() {
    try {
      const response = await fetch("http://localhost:5001/auth/getemr", {
        method: "GET",
        headers: { token:localStorage.token },
      });
      const parseRes = await response.json();
      console.log(`Parse= ${parseRes}`);
      setUsers(parseRes);
      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getUser() {
    try {
      const response = await fetch("http://localhost:5001/patientdash/", {
        method: "GET",
        headers: { token:localStorage.token },
      });

      const user = await response.json();
      console.log(`Parse= ${user}`);
      setName(user.first_name),
      setAuth(true);
      // console.log("description");
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
    getData();
    getUser();
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
            Hi! {name}
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
      <h2>Your Record</h2>
      <br />
          {users.map((user)=> (
          <div
          style={{
            backgroundColor: "White",
            padding: "15px",
            width: "680px",
            borderRadius: "15px",
            justifyContent: "center",
            textAlign: "left",
            margin: "auto",
          }}
        >
          <Media as="li">
            <img
              width={120}
              height={120}
              className="mr-3"
              src="https://cdn5.vectorstock.com/i/1000x1000/06/19/medical-flat-icon-medical-report-vector-6480619.jpg"
              alt="Generic placeholder"
            />
            <Media.Body>
              <h7 style={{ marginRight: "5rem" }}>
                <b>Report Date:</b>{" "}
                <Moment format="DD/MM/YYYY">{user.report_date}</Moment>{" "}
              </h7>
              <h7>
                <b>Report Type:</b> {user.reporttype}
              </h7>
              <p>
                <b>Description:</b> {user.description}
              </p>
              <ViewEMR user={user} />
            </Media.Body>
          </Media>
        </div>
      ))}
        </div>
    </Fragment>
  );
};
export default EMRPatient;