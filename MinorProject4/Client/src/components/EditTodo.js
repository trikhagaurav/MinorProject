import React, { Fragment, useState, useEffect } from "react";
import { Nav, Navbar, Media, Modal, Table, Button } from "react-bootstrap";
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
              <h4>Hospital/Clinic Name</h4>
              <h7>
                <b>Doctor Name:</b>{" "}
              </h7>
              <h7>
                <b style={{ marginLeft: "25rem" }}>Speciality:</b>{" "}
              </h7>{" "}
              <br />
              <h7>
                <b>Mobile Number:</b>{" "}
              </h7>
              <h7>
                <b style={{ marginLeft: "23.8rem" }}>Phone Number:</b>{" "}
              </h7>{" "}
              <br /> <br />
              <h5>Patient Infromation</h5>
              <Table striped bordered hover borderless="true">
              {patients.map((patient) => (
                <tbody>
                  <tr>
                    <td>
                        <b>First Name: </b>{patient.first_name}
                    </td>
                    <td>
                      <b>Middle Name: </b>{patient.middle_name}
                    </td>
                    <td>
                      <b>Last Name: </b>{patient.last_name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Date Of Birth: </b>
                        <Moment format="DD/MM/YYYY">{patient.date_of_birth}</Moment>
                    </td>
                    <td>
                      <b>Gender: </b>{patient.gender}
                    </td>
                    <td>
                      <b>Blood Group: </b>{patient.blood_group}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <b>Address: </b>{patient.address}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Mobile Number: </b>{patient.mobile_number}
                    </td>
                    <td>
                      <b>Phone Number: </b>{patient.phone_number}
                    </td>
                  </tr>
                </tbody>
              ))}
              </Table>
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