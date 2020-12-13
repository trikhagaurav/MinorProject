import React, { Fragment, useEffect, useState } from "react";
import { Nav, Navbar, Media, Button } from "react-bootstrap";
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
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5001/auth/searchemr/?username=${username}`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      const parseRes = await response.json();
      console.log("search emr");
      setUsers(parseRes);
      console.log(parseRes);
      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  async function getName() {
    try {
      console.log(`Token in doctor ${localStorage.token}`);
      const response = await fetch("http://localhost:5001/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
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

  return (
    <Fragment>
      <Navbar width="auto" fixed="top" bg="primary" variant="light">
        <Navbar.Brand>
          <Link
            className="text-white"
            to="/dashboard"
            style={{ textDecoration: "none" }}
          >
            Hi! {first_name}
          </Link>
        </Navbar.Brand>
        <Nav>
          <Nav.Link>
            <Link
              className="text-white"
              to="/dashboard"
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              className="text-white"
              to="/Profile"
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
      <br /> <br /> <br />
      <div
        style={{
          background: "#ebf3f5",
          padding: "20px",
          width: "fit-content",
          borderRadius: "15px",
          justifyContent: "center",
          textAlign: "center",
          margin: "auto",
        }}
      >
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
      </div>
      <br />
      {users.map((user) => (
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
              <EditTodo user={user} />
            </Media.Body>
          </Media>
        </div>
      ))}
    </Fragment>
  );
};

export default Search;