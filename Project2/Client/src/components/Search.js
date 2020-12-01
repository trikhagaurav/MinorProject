import React,{Fragment, useEffect, useState, Component} from "react";
import { NavItem, Nav, FormControl, Navbar, Media, Table, NavDropdown, MenuItem, Button, Card, CardGroup, CardDeck } from "react-bootstrap";
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

const Search = ({ setAuth }) => {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    //toast.success("Logged out successfully");
  };
  const [first_name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [reporttype, setReporttype] = useState("");
  const [report_date, setReportdate] = useState("");
  const [description, setDesc] = useState("");
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
},[]);
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
      <h1>Search for patient medical record</h1>
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
      <div style={{
      background: '#ebf3f5',
      marginBottom: '0',
    }}>
      <Table striped bordered hover borderless='true'>
        <thead>
          <tr>
            <th>Report Date</th>
            <th>Report Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr>
                <td><Moment format="DD/MM/YYYY">{user.report_date}</Moment></td>
                <td>{user.reporttype}</td>
                <td>{user.description}</td>
              </tr>
            ))
          }
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