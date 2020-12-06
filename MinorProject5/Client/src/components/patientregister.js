import React,{Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import { Form, Col, Row, Button,Navbar,Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../patientregister.css';

const PRegister = ({setAuth}) => {
    const [inputs, setInputs] = useState({
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            middle_name: "",
            mobile_number:"",
            phone_number:"",
            date_of_birth:"",
            blood_group:"A+",
            house_number:"",
            street:"",
            city:"",
            pincode:"",
            state:"",
            gender:"M",  
        })
        const {username, password, first_name, last_name, middle_name, mobile_number, phone_number, date_of_birth, blood_group, house_number, street, city, pincode, state, gender} = inputs;
    
        const onChange = (e) => {
            setInputs({...inputs, [e.target.name]: e.target.value});
        };
    
        const onSubmitForm = async (e) => {
            e.preventDefault()
            try {
    
                const body = {username, password, first_name, last_name, middle_name, mobile_number, phone_number, date_of_birth, blood_group, house_number, street, city, pincode, state, gender}
    
                const response = await fetch(
                  "http://localhost:5001/auth/patientregister",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                  }
                );
                const parseRes = await response.json()
                console.log(parseRes)
                if(parseRes.token){
                  localStorage.setItem("token", parseRes.token);
                  setAuth(true);
                  toast.success("Registered successfully");
                }else{
                  setAuth(false);
                  toast.error(parseRes);
                }
             
            } catch (err) {
                console.log(err.message)
            }
        };
        function changepage(){
            window.location.href="/";
        }
    
        return (
            <div>
              <br/>
            <br/>
            <br/>
            <div class="pat" style={{borderRadius: "15px"}}>
            
            <Form onSubmit={onSubmitForm}>
                <div class="formreg">
             <Form.Group>
               <Form.Label>
                 <h3>User Registration Form</h3>
              </Form.Label>
            </Form.Group> 
          <Form.Row>
          <Form.Group  as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" value={first_name} name="first_name" onChange={e => onChange(e)} placeholder="First Name" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridMiddleName">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control type="text" value={middle_name} name="middle_name" onChange={e => onChange(e)} placeholder="Middle Name" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" value={last_name} name="last_name" onChange={e => onChange(e)} placeholder="Last Name" />
          </Form.Group>
      
          </Form.Row>
          
        <Form.Row>
        <Form.Group as={Col} controlId="formGridDOB">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control value={date_of_birth} name="date_of_birth" onChange={e => onChange(e)} placeholder="DD/MM/YYYY" />
        </Form.Group>
          
        <Form.Group as={Col} controlId="formGridBloodgroup" class="bloodgroup">
            <Form.Label  class="bloodgroup">Blood Group</Form.Label>
            <Form.Control as="select" value={blood_group} name="blood_group" onChange={e => onChange(e)} defaultValue="Choose">
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridgender">
            <Form.Label class="bloodgroup">Gender</Form.Label>
            <Form.Control as="select" value={gender} name="gender" onChange={e => onChange(e)} defaultValue="Choose">
              <option>M</option>
              <option>F</option>
              <option>O</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group  as={Col} controlId="formGridShousenumber">
          <Form.Label>House number</Form.Label>
          <Form.Control value={house_number} name="house_number" onChange={e => onChange(e)} placeholder="343" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridStreet">
          <Form.Label>Street</Form.Label>
          <Form.Control value={street} name="street" onChange={e => onChange(e)} placeholder="1234 Main St" />
        </Form.Group>
        </Form.Row>
      
        <Form.Row>
        <Form.Group  as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control value={city} name="city" onChange={e => onChange(e)} placeholder="New Delhi" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Control value={state} name="state" onChange={e => onChange(e)} placeholder="Delhi" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPincode">
          <Form.Label>Pincode</Form.Label>
          <Form.Control value={pincode} name="pincode" onChange={e => onChange(e)} placeholder="110045" />
        </Form.Group>
        </Form.Row>
        
        <Form.Row>
        <Form.Group as={Col} controlId="formGridMobilePhone">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Row>
            <Form.Group as={Col} controlId="formGridMobilecode">
            <Form.Control placeholder="+91"/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridMobilenumber">
            <Form.Control value={mobile_number} name="mobile_number" type="text" onChange={e => onChange(e)} placeholder="1234567890"/>
            </Form.Group>
            </Form.Row>

          </Form.Group>
          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Row>
            <Form.Group as={Col} controlId="formGridPhonecode">
                <Form.Control placeholder="011"/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPhonenumber">
                <Form.Control value={phone_number} name="phone_number" type="text" onChange={e => onChange(e)} placeholder="01121345678"/>
            </Form.Group>
            </Form.Row>
          </Form.Group>
         
      
        </Form.Row>
      
        <Form.Row>
        <Form.Group as={Col} controlId="formGridUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} name="username" onChange={e => onChange(e)} />
        </Form.Group>
          
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} name="password" onChange={e => onChange(e)}  />
        </Form.Group>
      
        </Form.Row>
      
        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Everything mentioned by me is correct" />
        </Form.Group>
      
        <Form.Row>
            <Form.Group as={Col}>
              <Button  block bsSize="large" type="submit">
                Register
                </Button>   
            </Form.Group>
            <Form.Group as={Col}>
            <Button block bsSize="large" onClick={changepage}>
                Cancel
            </Button>
          </Form.Group>
        </Form.Row>
        </div>
      </Form>
          </div>
        </div>
        );
    };
    export default PRegister;
