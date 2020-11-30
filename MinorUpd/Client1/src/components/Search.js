import React,{Fragment, useEffect, useState, Component} from "react";
import { NavItem, Nav, FormControl, Navbar, NavDropdown, MenuItem, Button, Card, CardGroup, CardDeck } from "react-bootstrap";
import {Link} from 'react-router-dom';

const Search = ({ setAuth }) => {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(true);
    //toast.success("Logged out successfully");
  };
  const [first_name, setName] = useState("");

async function getName() {
  try {
    console.log(`Token in doctor ${localStorage.token}`);
    const response = await fetch("http://localhost:5001/auth/todo/doctor1", {
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
      <h1>Search for patient medical record</h1>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Fragment>
  );
};

export default Search;