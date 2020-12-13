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
return (
  <Fragment>
    <Navbar width="auto" fixed="top" bg="primary" variant="light">
      <Navbar.Brand>
        <Link className="text-white" to="/dashboard" style={{ textDecoration: "none" }}>
          Hi! {first_name}
        </Link>
      </Navbar.Brand>
      <Nav>
        <Nav.Link>
          <Link className="text-white" to="/patientdashboard" style={{ textDecoration: "none" }}>
            Home
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link className="text-white" to="/patientprofile" style={{ textDecoration: "none" }}>
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
    <br /> <br />
    <div
        style={{
          background: "#D6EAF8",
          padding: "20px",
          width: "fit-content",
          borderRadius: "15px",
          justifyContent: "center",
          textAlign: "center",
          margin: "auto",
        }}
      >
    <div
        style={{
          background: "white",
          padding: "20px",
          width: "fit-content",
          borderRadius: "15px",
         // justifyContent: "center",
         // textAlign: "center",
          margin: "auto",
        }}
      >
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
    </div>
    <br />
    <div
          style={{
            backgroundColor: "White",
            padding: "15px",
            width: "auto",
            borderRadius: "15px",
            justifyContent: "center",
            textAlign: "left",
            margin: "auto",
          }}
        >
      
      <Table striped bordered hover borderless="true">
        <thead>
          <tr>
            <th lg="auto">Name</th>
            <th lg="auto">Username</th>
            <th lg="auto">Speciality</th>
            <th lg="auto">Hospital</th>
            <th lg="auto">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.record_id}>
              <td lg="auto">
                {user.first_name} {user.last_name}
              </td>
              <td lg="auto">{user.username}</td>
              <td lg="auto">{user.speciality}</td>
              <td lg="auto">{user.hospital_name}</td>
              <td lg="auto">+91{user.mobile_number}</td>
              
              <td lg="auto"><button type="button" class="btn btn-danger" onClick={(e)=>{deleteDoc(user)}}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      </div>
  </Fragment>
);
};

export default Patientpermission;