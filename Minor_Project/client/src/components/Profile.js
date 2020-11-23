import React,{Fragment, useState, useEffect, Component } from "react";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import { Row, Col } from 'reactstrap';
import { NavItem, Nav, FormControl, Navbar, NavDropdown, MenuItem, Button, Card } from "react-bootstrap";

const Profile = ({ setAuth }) => {
  const [first_name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5001/dashboard/", {
        method: "GET",
        headers: { token:localStorage.token },
      });

      const parseRes = await response.json();
      setName(parseRes.first_name);
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
    </Fragment>
  );
};
export default Profile;