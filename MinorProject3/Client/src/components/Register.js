import React,{Fragment, useState } from "react";
import Select from "react-select";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import { Row, Col } from 'reactstrap';
import { Form } from "react-bootstrap";


const Register = ({ setAuth }) => {
  const options = [
    { value: "Podiatrist", label: "Podiatrist" },
    { value: "General Practitioner", label: "General Practitioner" },
    { value: "Pediatrician", label: "Pediatrician" },
    { value: "Endocrinologist", label: "Endocrinologist" },
    { value: "Neurologist", label: "Neurologist" },
    { value: "Rheumatologist", label: "Rheumatologist" },
    { value: "Allergist/Immunologist", label: "Allergist/Immunologist" },
    { value: "Psychiatrist", label: "Psychiatrist" },
    { value: "Nephrologist", label: "Nephrologist" },
    { value: "OB/GYN", label: "OB/GYN" },
    { value: "Pulmonologist", label: "Pulmonologist" },
    { value: "Surgeon", label: "Surgeon" },
    { value: "Emergency Physician", label: "Emergency Physician" },
    { value: "Ophthalmologist", label: "Ophthalmologist" },
    { value: "Oncologist", label: "Oncologist" },
    { value: "Urologist", label: "Urologist" },
    { value: "ENT", label: "ENT" },
    { value: "Anesthesiologist", label: "Anesthesiologist" },
    { value: "Dermatologist", label: "Dermatologist" },
    { value: "Radiologist", label: "Radiologist" },
    { value: "Gastroenterologist", label: "Gastroenterologist" },
    { value: "Cardiologist", label: "Cardiologist" },
    { value: "Orthopedist", label: "Orthopedist" },
  ];

  const gen = [
    { value: "M", label: "M" },
    { value: "F", label: "F" },
  ];

  const [inputs, setInputs] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    mobile_number: "",
    phone_number: "",
    hospital_name: "",
    username: "",
    password: "",
    dob: "",
  });

  const {
    first_name,
    middle_name,
    last_name,
    mobile_number,
    phone_number,
    speciality,
    hospital_name,
    gender,
    username,
    password,
    dob,
  } = inputs;

  const [state, setState] = useState({
    speciality: "",
    gender: "",
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        first_name,
        middle_name,
        last_name,
        mobile_number,
        phone_number,
        speciality,
        hospital_name,
        gender,
        username,
        password,
        dob,
      };

      const response = await fetch("http://localhost:5001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registered successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
        <br/>
        <br/>
        <br/>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form class= "auth-wrapper auth-inner" onSubmit={onSubmitForm}>
          <Row>
            <Col>
              <h3>Registration</h3>
            </Col>
          </Row>
          <Row>
              <Col xs={4}>
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  className="form-control"
                  value={first_name}
                  onChange={(e) => onChange(e)}
                />
              </Col>
              <Col xs={4}>
              <label>Middle Name</label>
                <input
                  type="text"
                  name="middle_name"
                  placeholder="Middle Name"
                  className="form-control"
                  value={middle_name}
                  onChange={(e) => onChange(e)}
                />
              </Col>
              <Col xs={4}>
              <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className="form-control"
                  value={last_name}
                  onChange={(e) => onChange(e)}
                />
              </Col>
          </Row>
          <br />
          <Row>
            <Col xs={4}>
            <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                placeholder="Date of birth"
                className="form-control"
                value={dob}
                onChange={(e) => onChange(e)}
              />
            </Col>
            <Col xs={2}>
            <label>Gender</label>
              <Select
                options={gen}
                name="gender"
                placeholder="M/F"
                value={gender}
                handleChange={(evt) => handleChange(evt)}
              />
            </Col>
          </Row>
          <br />
          <Row xs={20}>
            <Col xs={9}>
            <label>Mobile Number</label>
            <Row>
              <Col xs={2}>
               <input class="country-prefix form-control" type="text" value="+91"></input>
              </Col>
              <Col xs={4}>
              <input
                type="tel"
                name="mobile_number"
                placeholder="Mobile number"
                className="form-control"
                maxlength="10"
                value={mobile_number}
                onChange={(e) => onChange(e)}
              />
              </Col>
              </Row>
            </Col>
            <Col xs={5}>
            <label>Landline</label>
            <Row>
            <Col xs={3}>
               <input class="country-prefix form-control" type="text" value="011"></input>
              </Col>
              <Col xs={8}>
              <input
                type="tel"
                name="phone_number"
                placeholder="Landline"
                className="form-control"
                maxlength="8"
                value={phone_number}
                onChange={(e) => onChange(e)}
              />
              </Col>
              </Row>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={6}>
            <label>Speciality</label>
              <Select
                options={options}
                name="speciality"
                placeholder="Speciality"
                value={speciality}
                handleChange={(evt) => handleChange(evt)}
              />
            </Col>
            {/*  <input
            type="text"
            name="speciality"
            placeholder="Speciality"
            className="form-control my-3"
            value={speciality}
            onChange={(e) => onChange(e)}
          /> */}
            <Col xs={6}>
            <label>Hospital/Clinic</label>
              <input
                type="text"
                name="hospital_name"
                placeholder="Hospital/Clinic name"
                className="form-control"
                value={hospital_name}
                onChange={(e) => onChange(e)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={6}>
            <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="form-control"
                value={username}
                onChange={(e) => onChange(e)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={6}>
            <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={3}>
              <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </Col>
            <Col xs={3}>
              <a href="http://localhost:3000/register">
                <input type="button" className="btn btn-primary btn-block" value="Cancel"/>
              </a>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="forgot-password text-right">
                Already registered ? <a href="http://localhost:3000/login">sign in</a>
              </p>
            </Col>
          </Row>
        </Form>
      </div>

    </Fragment>
  );
};

export default Register;