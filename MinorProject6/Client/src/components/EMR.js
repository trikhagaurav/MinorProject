import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import { Form, Col, Navbar, Nav, Row, Button, FormGroup, FormControl, ControlLabel , InputGroup} from 'react-bootstrap';
import "../EMR.css";
const EMR = ({ setAuth }) => {
  let referredDoc = "";
  const [inputs, setInputs] = useState({
    username: "",
    reporttype: "Pathology Report",
    description: "",
    medical_prescription: "",
    systolicbp: "",
    diastolicbp: "",
    heartrate: "",
    bodytemperature: "",
    nextvisitdate: "",
    referrals: "None",
    referreddoctor: "",
    prevallergies: "No",
    specifyallergies: "",
    bloodP: "",
    bodyweight: "",
  });
  var date;
  const [showResults, setShowResults] = useState(false);
  const [refDoc, setRefDoc] = useState("");
  const {
    username,
    reporttype,
    description,
    medical_prescription,
    systolicbp,
    diastolicbp,
    heartrate,
    bodytemperature,
    nextvisitdate,
    referrals,
    referreddoctor,
    prevallergies,
    specifyallergies,
    bloodP,
    bodyweight,
  } = inputs;
  
  const onChange = (e) => {
    if (e.target.name != "referreddoctor") {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
      setRefDoc(`Dr. ${e.target.value}`);
    }
  };
  /*
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  */
  
  const genCurrentDate = () => {
    let separator = "-";
    let currentDate = new Date();
    let c_date = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    date = `${c_date < 10 ? `0${c_date}` : `${c_date}`}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
    return `${c_date < 10 ? `0${c_date}` : `${c_date}`}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
  };
  
  const dispAllergies = (e) => {
    if (e.target.value === "Yes") {
      setShowResults(true);
      onChange(e);
    } else {
      setShowResults(false);
      onChange(e);
    }
  };
  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token");
    setAuth(true);
    //toast.success("Logged out successfully");
}
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
  /*
  const Results = () => (
    <Form.Row>
      <Form.Group as={Col}>
        <Form.Label>Specify Allergies</Form.Label>
        <Form.Control
          as="textarea"
          row={2}
          name="specifyAllergies"
          value={specifyAllergies}
          onChange={(e) => onChange(e)}
        ></Form.Control>
      </Form.Group>
    </Form.Row>
  );
  useEffect(() => {
    setAuth(true);
  }, []);
  */
 const onSubmitForm = async (e) => {
  e.preventDefault()
  //handleSubmit(e);
  setInputs({ ...inputs, [referreddoctor]: `Dr. ${referreddoctor}` });
  try {
    console.log('EMR token : $1', localStorage.token);
    const res = await fetch(`http://localhost:5001/auth/checkPermission/${username}`,{
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parResp = await res.json();
      console.log(parResp);
      if(parResp.permission==='true'){
    const body = {
      username,
      reporttype,
      date,
      description,
      medical_prescription,
      systolicbp,
      diastolicbp,
      heartrate,
      bodytemperature,
      bodyweight,
      nextvisitdate,
      referrals,
      referreddoctor,
      prevallergies,
      specifyallergies,
      bodyweight,
    };
    const response = await fetch("http://localhost:5001/auth/emr",{
        method: "POST",
        headers: { token: localStorage.token,
          "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const parseRes = await response.json();
    //console.log(parseRes);
    if (parseRes.token) {
      localStorage.setItem("token", parseRes.token);
      setAuth(true);
      toast.success("login successfully");
    } else {
      setAuth(false);
      toast.error(parseRes);
    }
  }
else{
  toast.error('You are not permitted to add EMR for the pateint ');
} 
  }
  catch (err) {
    console.log(err.message);
  }
};

  return (
    <Fragment>
      <Navbar width="auto" fixed="top" bg="primary" variant="light">
          <Navbar.Brand><Link className="text-white" to="/dashboard" style={{ textDecoration: 'none' }}>Hi! {first_name}</Link></Navbar.Brand>
          <Nav>
            <Nav.Link><Link className="text-white" to="/dashboard" style={{ textDecoration: 'none' }}>Home</Link></Nav.Link>
            <Nav.Link><Link className="text-white" to="/Profile" style={{ textDecoration: 'none' }}>Profile</Link></Nav.Link>
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
      <br />
      <div class="newRec rounded shadow-lg mt-2 mb-2">
        <h2 className="card-header bg-success  shadow text-center py-4">
          <strong>Add Medical Report</strong>
        </h2>
        <Form /*noValidate validated={validated}*/ onSubmit={onSubmitForm}>
          <div class="newForm">
            <Form.Row>
              <Form.Group as={Col} controlId="formBasic">
                <Form.Label>Patient Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Patient Username"
                  required
                  name="username"
                  value={username}
                  onChange={(e) => onChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter patient's username.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={5} controlId="recordType">
                <Form.Label>Report Type</Form.Label>
                <Form.Control
                  as="select"
                  className="mr-0"
                  defaultValue="Choose..."
                  name="reporttype"
                  value={reporttype}
                  onChange={(e) => onChange(e)}
                >
                  <option>Pathology Report</option>
                  <option>Physical Report</option>
                  <option>Consultation Report</option>
                  <option>Laboratory Report</option>
                  <option>Ultrasound Report</option>
                  <option>MRI Scan Report</option>
                  <option>CET Scan Report</option>
                  <option>PET Scan Report</option>
                </Form.Control>
                <Form.Control.Feedback type="valid"></Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={3} controlId="recordDate">
                <Form.Label>Date of Report</Form.Label>
                <Form.Control
                  type="disabled"
                  placeholder="Record Date"
                  name="date"
                  value={genCurrentDate()}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md={4}>
                <Form.Row className="mb-2">Heart Rate</Form.Row>
                <InputGroup>
                  <Form.Control
                    type="number"
                    className="pl-3 pr-0 mr-0"
                    placeholder="70"
                    name="heartrate"
                    value={heartrate}
                    onChange={(e) => onChange(e)}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text className="mr-2">
                      beats/min
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md={4}>
                <Form.Row className="mb-2">Body Temperature</Form.Row>
                <InputGroup>
                  <Form.Control
                    type="number"
                    className="pl-2 pr-0"
                    maxLength={3}
                    placeholder="98.6"
                    name="bodytemperature"
                    value={bodytemperature}
                    onChange={(e) => onChange(e)}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text className="mr-2">
                      Fahrenheit
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md={4}>
                <Form.Row className="mb-2">Weight</Form.Row>
                <InputGroup className="mr-2">
                  <Form.Control
                    type="number"
                    className="pl-2 pr-0"
                    placeholder="65"
                    name="bodyweight"
                    value={bodyweight}
                    onChange={(e) => onChange(e)}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text className="mr-3">
                      Kilograms
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row className="mb-2">Blood Pressure</Form.Row>

            <Form.Row>
              <Form.Group as={Col} md={4}>
                <InputGroup>
                  <Form.Control
                    type="number"
                    className="bp pl-1 pr-0"
                    placeholder="Systolic"
                    name="systolicbp"
                    value={systolicbp}
                    onChange={(e) => onChange(e)}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>mm Hg</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md={4}>
                <InputGroup>
                  <Form.Control
                    type="number"
                    className="pl-1 pr-0"
                    placeholder="Diastolic"
                    name="diastolicbp"
                    value={diastolicbp}
                    onChange={(e) => onChange(e)}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>mm Hg</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  row={3}
                  name="description"
                  value={description}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                <Form.Label>Medical Prescription</Form.Label>
                <Form.Control
                  as="textarea"
                  row={6}
                  name="medical_prescription"
                  value={medical_prescription}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md={3} controlId="nextVisitDate">
                <Form.Label>Next Visit</Form.Label>
                <Form.Control
                  type="date"
                  className="ml-0 pl-0 mr-0 pr-0"
                  placeholder=" "
                  name="nextvisitdate"
                  value={nextvisitdate}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} md={4} controlId="referrals">
                <Form.Label>Referrals</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  name="referrals"
                  value={referrals}
                  onChange={(e) => onChange(e)}
                >
                  <option>None</option>
                  <option>Cardiologist</option>
                  <option>Gynacologist</option>
                  <option>General Physician</option>
                  <option>Dentist</option>
                  <option>Psychiatrists</option>
                  <option>Oncologist</option>
                  <option>Neurologist</option>
                  <option>Endocrinologist</option>
                  <option>Orthopaedic surgeon</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="referredDoctor">
                <Form.Label>Referred Doctor:</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text className="ml-1">Dr.</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    className="pl-3 pr-0 mr-0"
                    placeholder="Doctor's Name"
                    name="referreddoctor"
                    value={referreddoctor}
                    onChange={(e) => onChange(e)}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group className="mt-2 mr-2">Previous Allergies:</Form.Group>
              <Form.Group as={Col} md={2}>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  name="prevallergies"
                  value={prevallergies}
                  onChange={(e) => dispAllergies(e)}
                >
                  <option>No</option>
                  <option>Yes</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            {showResults ? (
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Specify Allergies</Form.Label>
                  <Form.Control
                    as="textarea"
                    row={2}
                    name="specifyallergies"
                    value={specifyallergies}
                    onChange={(e) => onChange(e)}
                  ></Form.Control>
                </Form.Group>
              </Form.Row>
            ) : null}
            <div class="recordButtons">
              
              <Link to="/dashboard"><button className="btn btn-primary backbutton">Back</button></Link>
						<Button variant="success" type="submit" className="submitbutton">
							Submit
						</Button>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default EMR;