import React,{Fragment, useEffect, useState, Component} from "react";
import {toast} from 'react-toastify';
import {Link} from "react-router-dom";
import { NavItem, Nav, FormControl, Navbar, NavDropdown, MenuItem, Button, Card, CardGroup, CardDeck } from "react-bootstrap";

const Dashboard = ({setAuth}) => {

    const [first_name, setName] = useState("");

    async function getName() {
        try {
          console.log(`Dashboard token = ${localStorage.token}`);
            const response = await fetch("http://localhost:5001/dashboard/", {
                method:"GET",
                headers: { token: localStorage.token}
            });

            const parseRes = await response.json();
            console.log(`Dashboard res = ${parseRes.first_name}`);
            setName(parseRes.first_name);
            setAuth(true);
        } catch (err) {
            console.error(err.message);
        }
    };

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out successfully");
    }

    useEffect(() => {
        setAuth(true);
        getName();
    },[]);

    return (
      <Fragment>
        <Navbar width="auto" fixed="top" bg="light" variant="light">
          <Navbar.Brand><Link to="/dashboard" style={{ textDecoration: 'none' }}>Hi! {first_name}</Link></Navbar.Brand>
          <Nav>
            <Nav.Link><Link to="/dashboard" style={{ textDecoration: 'none' }}>Home</Link></Nav.Link>
            <Nav.Link><Link to="/Profile" style={{ textDecoration: 'none' }}>Profile</Link></Nav.Link>
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
        <CardDeck style={{height: "10rv", width: "60rem"}}>
          <Card border="primary" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://thumbs.dreamstime.com/b/doctor-hold-clipboard-takes-notes-medical-report-checklist-flat-design-vector-illustration-background-doctor-hold-112434258.jpg"
            />
            <Card.Body>
              <Card.Title>Create EMR</Card.Title>
              <Card.Text>
                Create Electronic Medical Record for your patient.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
                
                <Link to="/emr"><button className="btn btn-primary addButton">Create EMR</button></Link>
            </Card.Footer>
          </Card>
         { /*
         <Card border="primary" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://secure.webtoolhub.com/static/resources/icons/set72/ad2d5c07.png"
            />
            <Card.Body>
              <Card.Title>Register new patient</Card.Title>
              <Card.Text>
                If the patient do not have an account already, register the new patient here.{" "}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" href="http://localhost:3000/profile">Register</Button>
            </Card.Footer>
          </Card> 
         */}
          <Card border="primary" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://previews.123rf.com/images/magurok/magurok1704/magurok170400064/76041723-hand-holding-medical-clipboard-and-hand-holding-magnifying-glass-clipboard-with-medical-records-pati.jpg"
            />
            <Card.Body>
              <Card.Title>Search EMR</Card.Title>
              <Card.Text>
                Search and access the medical record of an already registered patient.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              
              <Link to="/search"><button className="btn btn-primary addButton">Search</button></Link>
            </Card.Footer>
          </Card>
        </CardDeck>
      </Fragment>
    );
};

export default Dashboard;