import React,{Fragment, useEffect, useState, Component} from "react";
import { NavItem, Nav, FormControl, Navbar, NavDropdown, MenuItem, Button, Card, CardGroup, CardDeck } from "react-bootstrap";

const Search = ({ setAuth }) => {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(true);
    //toast.success("Logged out successfully");
  };

  return (
    <Fragment>
      <Navbar width="auto" fixed="top" bg="light" variant="light">
        <Navbar.Brand href="#home">Hi!</Navbar.Brand>
        <Nav>
          <Nav.Link
            className="border-left pl-2 ml-auto"
            onClick={(e) => logout(e)}
          >
            Home
          </Nav.Link>
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
      <h1>Search for patient medical record</h1>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Fragment>
  );
};

export default Search;