import React, { Fragment, useState, useEffect } from "react";
import { Nav, Navbar, Media, Modal, Table, Button } from "react-bootstrap";
import { Row, Col } from 'reactstrap';
import Moment from 'react-moment';

const EditTodo = ({ user }) => {
  console.log(user.record_id);
  const [description, setDescription] = useState(user.description);
  const [reporttype, setReporttype] = useState(user.reporttype);
  const [report_date, setReportdate] = useState(user.report_date);
  const [medical_prescription, setMedPres] = useState(user.medical_prescription);
  const [systolicbp, setSysbp] = useState(user.systolicbp);
  const [diastolicbp, setDiabp] = useState(user.diastolicbp);
  const [heartrate, setHR] = useState(user.heartrate);
  const [bodytemperature, setBT] = useState(user.bodytemperature);
  const [bodyweight, setBW] = useState(user.bodyweight);
  const [nextvisitdate, setNV] = useState(user.nextvisitdate);
  const [referrals, setRef] = useState(user.referrals);
  const [referreddoctor, setRD] = useState(user.referreddoctor);
  const [prevallergies, setPA] = useState(user.prevallergies);
  const [specifyallergies, setSA] = useState(user.specifyallergies);
          
  const [patients, setPatient] = useState([]);
  const [doctor, setDoctor] = useState([]);
  
  

  async function getPName() {
    try {
      const response = await fetch(`http://localhost:5001/auth/searchpatient/${user.username}`, {
        method: "GET",
        headers: { token:localStorage.token },
      });

      const parseRes = await response.json();
      console.log(parseRes);
      setPatient(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getDName() {
    try {
      const response = await fetch(`http://localhost:5001/auth/searchdoc/${user.record_id}`, {
        method: "GET",
        headers: { token:localStorage.token },
      });

      const parseRes = await response.json();
      console.log(parseRes);
      setDoctor(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }
  //edit description function

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5001/auth/todos/${user.record_id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPName();
    getDName();
  }, []);

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${user.record_id}`}
      >
        View
      </button>
      <div
        class="modal"
        id={`id${user.record_id}`}
        onClick={() => {
          setDescription(user.description),
            setReporttype(user.reporttype),
            setReportdate(user.report_date),
            setMedPres(user.medical_prescription),
            setSysbp(user.systolicbp),
            setDiabp(user.diastolicbp),
            setHR(user.heartrate),
            setBT(user.bodytemperature),
            setBW(user.bodyweight),
            setNV(user.nextvisitdate),
            setRef(user.referrals),
            setRD(user.referreddoctor),
            setPA(user.prevallergies),
            setSA(user.specifyallergies);
        }}
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Medical Record</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div class="modal-body">
            {doctor.map((doc) => (
              <div>
              <h4><b>{doc.hospital_name}</b></h4>
              <Row>
              <Col lg="auto"><h6><b>Name: </b>Dr. {doc.first_name}</h6></Col>
              <Col lg="auto"><h6><b>Speciality: </b>{doc.speciality}</h6></Col>
             </Row>
             <Row>
              <Col lg="auto"><h6><b>Mobile No.: </b>{doc.mobile_number}</h6></Col>
              <Col lg="auto"><h6><b>Phone No.: </b>{doc.phone_number}</h6></Col>
            </Row>
              </div>
            ))}
              <br />
              <h5>Patient Infromation</h5>
              {patients.map((patient) => (
                <div style={{background: "#F7FBF9",
                 //justifyContent:"center",
                 textAlign:"center",
                 width:"fit-content",
                 height:"fit-content",
                 padding: "10px",}}>
                <Row>
                <Col lg="auto"><h6><b>First Name:</b> {patient.first_name}</h6></Col>
                <Col lg="auto"><h6><b>Middle Name: </b>{patient.middle_name}</h6></Col>
                <Col lg="auto"><h6><b>Last Name: </b>{patient.last_name}</h6></Col>
              </Row>
              <Row>
                <Col lg="auto"><h6><b>Date of Birth: </b><Moment format="DD/MM/YYYY">{patient.date_of_birth}</Moment></h6></Col>
                <Col lg="auto"><h6><b>Gender: </b>{patient.gender}</h6></Col>
                <Col lg="auto"><h6><b>Blood Group: </b>{patient.blood_group}</h6></Col>
              </Row>
              <Row>
                <Col lg="auto"><h6><b>Address: </b>{patient.address}</h6></Col>
              </Row>
              <Row>
                <Col lg="auto"><h6><b>Mobile Number: </b>{patient.mobile_number}</h6></Col>
                <Col lg="auto"><h6><b>Phone Number: </b>{patient.phone_number}</h6></Col>
              </Row>
              <Row>
                <Col lg="auto"><h6><b>Username: </b>{patient.username}</h6></Col>
              </Row>
              <br />
              </div>
              ))}
              <br />
              <Row>
              <Col lg="auto"><h6><b>Date: </b>{report_date}</h6></Col>
              <Col lg="auto"><h6><b>Report Type: </b>{reporttype}</h6></Col>
             </Row>
             <Row>
              <Col lg="auto"><h6><b>Body Weight: </b>{bodyweight}</h6></Col>
              <Col lg="auto"><h6><b>Body Temperature: </b>{bodytemperature}</h6></Col>
            </Row><Row>
              <Col lg="auto"><h6><b>Heart Rate: </b>{heartrate}</h6></Col>
              <Col lg="auto"><h6><b>Previous  Allergies: </b>{prevallergies}</h6></Col>
             </Row>
             <Row>
              <Col lg="auto"><h6><b>Systolic Pressure: </b>{systolicbp} mmHg</h6></Col>
              <Col lg="auto"><h6><b>Diastolic Pressure.: </b>{diastolicbp} mmHg</h6></Col>
            </Row>
            <Row>
              <Col lg="auto"><h6><b>Problems: </b></h6></Col>
            </Row>
             <Row>
              <Col lg="auto"><h6>{description}</h6></Col>
            </Row>
            <Row>
              <Col lg="auto"><h6><b>Medications: </b></h6></Col>
             </Row>
             <Row>
              <Col lg="auto"><h6>{medical_prescription}</h6></Col>
            </Row>
            <Row>
              <Col lg="auto"><h6><b>Allergies: </b>{specifyallergies}</h6></Col>
             </Row>
             <Row>
              <Col lg="auto"><h6><b>Referrals: </b>{referrals}</h6></Col>
            </Row>
            <Row>
              <Col lg="auto"><h6><b>Refered Doctor: </b>{referreddoctor}</h6></Col>
             </Row>
             <Row>
              <Col lg="auto"><h6><b>Next Visit Date: </b><Moment format="DD/MM/YYYY">{nextvisitdate}</Moment></h6></Col>
            </Row>
            {/*
              <h7>
                <b>Date:</b> <Moment format="DD/MM/YYYY">{report_date}</Moment>
              </h7>
              <h7>
                <b style={{ marginLeft: "25rem" }}>Report Type:</b> {reporttype}
              </h7>{" "}
              <br />
              <h7>
                <b>Body Weight:</b> {bodyweight}
              </h7>{" "}
              <h7>
                <b style={{ marginLeft: "23.7rem" }}>Body Temperature:</b> {bodytemperature}
              </h7>{" "}
              <br />
              <h7>
                <b>Heart Rate:</b> {heartrate}
              </h7>{" "}
              <h7>
              <b style={{ marginLeft: "26rem" }}>Previous allergies:</b> {prevallergies}
                
              </h7>{" "}
              <br />
              <h7>
                <b>Systolicbp:</b> {systolicbp}
              </h7>{" "}
              <h7>
                <b style={{ marginLeft: "25.7rem" }}>Diastolicbp:</b> {diastolicbp}
              </h7>{" "}
              <br />
              <h7>
                <b>Problems:</b> <br />
                {description}
              </h7>{" "}
              <br />
              <h7>
                <b>Medications:</b> <br /> {medical_prescription}
              </h7>{" "}
              <br />
              <h7>
              <b>Allergies:</b> {specifyallergies}
              </h7>{" "}
              <br />
              <h7>
                <b>Referrals:</b> {referrals}
              </h7>{" "}
              <br />
              <h7>
                <b>Refered Doctor:</b> {referreddoctor}
              </h7>{" "}
              <br />
              <h7>
                <b>Next Visit Date:</b> <Moment format="DD/MM/YYYY">{nextvisitdate}</Moment>
              </h7>{" "}
            */}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;