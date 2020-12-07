import React, { Fragment, useEffect, useState } from "react";
import { Nav, Navbar, Media, Modal, Table, Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import Moment from 'react-moment';
import EditTodo from "./EditTodo";

const Patientpermission = ({ setAuth }) => {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully");
  };
  const [first_name, setName] = useState("");
  const [username, setUsername] = useState("");
  
  const [users, setUsers] = useState([]);
  
  const getCurrentDoctor = async ()=>{
      try{
          const res = await fetch(`http://localhost:5001/auth/doctorpermission`,
          {
            method: "GET",
            headers: { token:localStorage.token },
          });
          //if()
          console.log(res);
          const parseRes = await res.json();
          console.log(parseRes);
          if(parseRes.doc!=='Nodoctor'){
            setUsers(parseRes);
          }
          else{
            setUsers([]);
          }
          
          
      }
      catch(err){
          console.log(err);
      }
  }
  const deleteDoc = async (user) => {
    console.log(`User= ${user.doctor_id}`);
    const response = await fetch(`http://localhost:5001/auth/deleteDoc/${user.doctor_id}`,
       {
        method: "POST",
        headers: { token:localStorage.token },  
      });
      const parseRes = await response.json();
      console.log(parseRes);
      console.log(parseRes.delStatus);
      if(parseRes.delStatus==="success"){
        console.log('Deleting')
        toast.success('Doctor deleted successfully');
        getCurrentDoctor();
      }
  }

  const onSubmitForm = async (e) => {
    console.log(1);
    e.preventDefault();
    const body= {username};
    console.log(body);
    try {
      const response = await fetch(`http://localhost:5001/auth/doctorpermissionAdd/${username}`,
       {
        method: "POST",
        headers: { token:localStorage.token },  
      });
      const parseRes = await response.json();
      console.log(parseRes);
      if(parseRes.doc==='added'){
        getCurrentDoctor();
        toast.success('Doctor Added Successfully');
        //setUsers(parseRes);
      }
      else if(parseRes.doc==='Alreadypresent'){
        toast.success('Doctor already present in the list');
      }
      else if(parseRes.doc==='Invalidusername'){
        toast.success('Invalid doctor name');
      }
      
      /*console.log(parseRes);
      console.log(parseRes.reporttype);
      setReporttype(parseRes.reporttype);
      setReportdate(parseRes.report_date);
      setDesc(parseRes.description);*/
      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  }
async function getName() {
  try {
    console.log(`Token in doctor ${localStorage.token}`);
    const response = await fetch("http://localhost:5001/patientdash/", {
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
  getCurrentDoctor();
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
    <h1>Add/Remove Doctors</h1>
    <form className="d-flex">
      <input
        type="text"
        placeholder="Search"
        className="mr-sm-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button variant="success" onClick={onSubmitForm}>
        Add
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
            <th>Name</th>
            <th>Username</th>
            <th>Speciality</th>
            <th>Hospital</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.record_id}>
              <td>
                {user.first_name} {user.last_name}
              </td>
              <td>{user.username}</td>
              <td>{user.speciality}</td>
              <td>{user.hospital_name}</td>
              <td>{user.mobile_number}</td>
              
              <td><button onClick={(e)=>{deleteDoc(user)}}>Delete</button></td>
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

export default Patientpermission;