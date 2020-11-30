import React,{Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import { Button, Form,Col,Navbar,Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
//import "../patientlogin.css";

const PLogin = ({setAuth}) => {

    const [inputs, setInputs] = useState({
            username:"",
            password:""
        });
        const {username, password} = inputs;
        const onChange = e => {
            setInputs({ ...inputs, [e.target.name]: e.target.value});
        };
    
        const onSubmitForm = async(e) => {
            e.preventDefault()
            try {
    
                const body = {username, password}
    
                const response = await fetch("http://localhost:5001/auth/patientlogin", {
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            console.log(parseRes);
    
            if(parseRes.token) {
                localStorage.setItem("token",parseRes.token);
                setAuth(true);
                toast.success("login successfully");
    
            } else{
                setAuth(false);
                toast.error(parseRes);
            }
            
    
            } catch (err) {
                console.log(err.message);
                
            }
        }
        function changepage(){
            window.location.href="/";
        }
        
        return (
            <div className="Login">
               <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
            <Form onSubmit={onSubmitForm}>
            <div class="auth-wrapper auth-inner">
              <Form.Label><h1>Patient's Sign In</h1></Form.Label>
              <Form.Group controlId="username" bsSize="large">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  autoFocus 
                  name="username"
                  type="text"
                  value={username}
                  onChange={e=>onChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="password" bsSize="large">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={e=>onChange(e)}
                  type="password"
                  name="password"
                />
              </Form.Group>
            <Form.Row>
                <Form.Group as={Col}>
                  <Button  block bsSize="large" type="submit">
                    Login
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
        );
    };
    export default PLogin;
