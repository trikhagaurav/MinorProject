import React, { Fragment, useEffect, useState } from "react";
import { Nav, Navbar, Media, Modal, Table, Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import Moment from 'react-moment';
import EditTodo from "./EditTodo";

const Search = ({ setAuth }) => {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully");
  };
  const [first_name, setName] = useState("");
  const [username, setUsername] = useState("");
  
  const [users, setUsers] = useState([]);

  

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:5001/auth/searchemr/?username=${username}`,
       {
        method: "GET",
        headers: { token:localStorage.token },
      });
      const parseRes = await response.json();
      console.log('search emr');
      setUsers(parseRes);
      console.log(parseRes);
      console.log(parseRes.reporttype);
      setReporttype(parseRes.reporttype);
      setReportdate(parseRes.report_date);
      setDesc(parseRes.description);
      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  }
async function getName() {
  try {
    console.log(`Token in doctor ${localStorage.token}`);
    const response = await fetch("http://localhost:5001/dashboard/", {
      method: "GET",
      headers: { token:localStorage.token },
    });

    const parseRes = await response.json();
    console.log(parseRes);
    setName(parseRes.first_name);
    setAuth(true);
  } catch (err) {
    console.error(err.message);
  }
}

useEffect(() => {
  setAuth(true);
  getName();
}, []);

{/*
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-90w"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Medical Report
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Hospital/Clinic Name</h4>
        <h7><b>Doctor Name:</b> </h7>
        <h7><b style={{ marginLeft: '25rem' }}>Speciality:</b> </h7> <br />
        <h7><b>Mobile Number:</b> </h7>
        <h7><b style={{ marginLeft: '23.8rem' }}>Phone Number:</b> </h7> <br /> <br />
        <h5>Patient Infromation</h5>
        <Table striped bordered hover borderless="true">
          <tbody>
            <tr>
              <td>
                <b>First Name: </b>
                {patient_first_name}
              </td>
              <td>
                <b>Middle Name: </b>
                {middle_name}
              </td>
              <td>
                <b>Last Name: </b>
                {last_name}
              </td>
            </tr>
            <tr>
              <td>
                <b>Date Of Birth: </b>
                <Moment format="DD/MM/YYYY">{date_of_birth}</Moment>
              </td>
              <td>
                <b>Gender: </b>
                {gender}
              </td>
              <td>
                <b>Blood Group: </b>
                {blood_group}
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <b>Address: </b>
                {address}
              </td>
            </tr>
            <tr>
              <td>
                <b>Mobile Number: </b>+91{mobile_number}
              </td>
              <td>
                <b>Phone Number: </b>
                {phone_number}
              </td>
            </tr>
          </tbody>
        </Table>
        {users.map((user) => (
        <h7 key={user.record_id}>
        <h7><b>Date:</b> <Moment format="DD/MM/YYYY">{user.report_date}</Moment></h7>
        <h7><b style={{ marginLeft: '25rem' }}>Report Type:</b> {user.reporttype}</h7> <br />
        <h7><b>Problems:</b> <br />{user.description}</h7> <br />
        <h7><b>Medications:</b> <br /> {user.medical_prescription}</h7> <br />
        <h7><b>Allergies:</b> {user.specifyallergies}</h7> <br />
        <h7><b>Refered Doctor:</b> {user.referreddoctor}</h7> <br />
        </h7>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
} */}

return (
  <Fragment>
    <Navbar width="auto" fixed="top" bg="light" variant="light">
      <Navbar.Brand>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          Hi! {first_name}
        </Link>
      </Navbar.Brand>
      <Nav>
        <Nav.Link>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            Home
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/Profile" style={{ textDecoration: "none" }}>
            Profile
          </Link>
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
    <br /> <br /> <br />
    <h1>Search for Patient Medical Record</h1>
    <form className="d-flex">
      <input
        type="text"
        placeholder="Search"
        className="mr-sm-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button variant="success" onClick={onSubmitForm}>
        Search
      </Button>
    </form>
    <br />
    <br />
    <div
      style={{
        background: "#ebf3f5",
        marginBottom: "0",
      }}
    >
      
      <Table striped bordered hover borderless="true">
        <thead>
          <tr>
            <th>Report Date</th>
            <th>Report Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.record_id}>
              <td>
                <Moment format="DD/MM/YYYY">{user.report_date}</Moment>
              </td>
              <td>{user.reporttype}</td>
              <td>{user.description}</td>
              <td>
              <EditTodo user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    {/*
        <ul className="list-unstyled">
          <Media as="li">
            <img
              width={120}
              height={120}
              className="mr-3"
              src="https://cdn5.vectorstock.com/i/1000x1000/06/19/medical-flat-icon-medical-report-vector-6480619.jpg"
              alt="Generic placeholder"
            />
            <Media.Body>
              {users.map( user => (
            <Media.Body>
                <h5>Report Date: {user.report_date}</h5>
                <h5>Report Type: {user.reporttype}</h5>
                <p>
                  Description: {user.description}
                </p>
            </Media.Body>
              ))}
            </Media.Body>
          </Media>
          <br />
          <Media as="li">
            <img
              width={120}
              height={120}
              className="mr-3"
              src="https://cdn5.vectorstock.com/i/1000x1000/06/19/medical-flat-icon-medical-report-vector-6480619.jpg"
              alt="Generic placeholder"
            />
            <Media.Body>
            <h5>Report Date: {report_date}</h5>
              <h5>Report Type: {reporttype}</h5>
              <p>
                Description: {description}
              </p>
            </Media.Body>
          </Media>
          <br />
          <Media as="li">
            <img
              width={120}
              height={120}
              className="mr-3"
              src="https://cdn5.vectorstock.com/i/1000x1000/06/19/medical-flat-icon-medical-report-vector-6480619.jpg"
              alt="Generic placeholder"
            />
            <Media.Body>
            <h5>Report Date: {report_date}</h5>
              <h5>Report Type: {reporttype}</h5>
              <p>
                Description: {description}
              </p>
            </Media.Body>
          </Media>
              </ul> */}
  </Fragment>
);
};

export default Search;