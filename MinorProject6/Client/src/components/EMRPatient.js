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

const EMRPatient = ({ setAuth }) => {
  const [description, setDescription] = useState("");
  const [reporttype, setReporttype] = useState("");
  const [report_date, setReportdate] = useState("");
  const [medical_prescription, setMedPres] = useState("");
  const [systolicbp, setSysbp] = useState("");
  const [diastolicbp, setDiabp] = useState("");
  const [heartrate, setHR] = useState("");
  const [bodytemperature, setBT] = useState("");
  const [bodyweight, setBW] = useState("");
  const [nextvisitdate, setNV] = useState("");
  const [referrals, setRef] = useState("");
  const [referreddoctor, setRD] = useState("");
  const [prevallergies, setPA] = useState("");
  const [specifyallergies, setSA] = useState("");
  const [name, setName] = useState("");
  
  async function getData() {
    try {
      const response = await fetch("http://localhost:5001/auth/getemr", {
        method: "GET",
        headers: { token:localStorage.token },
      });

      const parseRes = await response.json();
      console.log(`Parse= ${parseRes}`);
      setDescription(parseRes.description),
      setReporttype(parseRes.reporttype),
      setReportdate(parseRes.report_date),
      setMedPres(parseRes.medical_prescription),
      setSysbp(parseRes.systolicbp),
      setDiabp(parseRes.diastolicbp),
      setHR(parseRes.heartrate),
      setBT(parseRes.bodytemperature),
      setBW(parseRes.bodyweight),
      setNV(parseRes.nextvisitdate),
      setRef(parseRes.referrals),
      setRD(parseRes.referreddoctor),
      setPA(parseRes.prevallergies),
      setSA(parseRes.specifyallergies);
      setAuth(true);
      // console.log("description");
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
        <Row>
          <Col xs="auto"><h5><b>Description: </b>{description}</h5></Col>
          <Col xs="auto"><h5><b>Medical Prescription: </b>{medical_prescription}</h5></Col>
        </Row>
        </div>
    </Fragment>
  );
};
export default EMRPatient;