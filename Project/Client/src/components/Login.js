import React,{Fragment, useState } from "react";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import { Row, Col } from 'reactstrap';

const Login = ({setAuth}) => {

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

            const response = await fetch("http://localhost:5001/auth/login", {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        const parseRes = await response.json();

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
    return (
      <Fragment>
        <br/>
        <br/>
        <br/>
        <br/>
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
          <form className="auth-wrapper auth-inner"onSubmit={onSubmitForm}>
            <Row>
              <Col>
                <h3> Doctor's Sign In</h3>
              </Col>
            </Row>
            <Row>
              <Col>
              <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  className="form-control my-3"
                  value={username}
                  onChange={(e) => onChange(e)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
              <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="form-control my-3"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
              <button type="submit" className="btn btn-primary btn-block">Submit</button>
              </Col>
              <Col>
              <a href="http://localhost:3000/login">
                <input type="button" className="btn btn-primary btn-block" value="Cancel"/>
              </a>
              </Col>
            </Row>
            <Row>
              <Col>
              <p className="forgot-password text-right">
                    Not registered <a href="/register">sign up?</a>
              </p>
              </Col>
            </Row>
          </form>
        </div>
      </Fragment>
    );
};
export default Login;