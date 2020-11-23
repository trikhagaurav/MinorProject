import React from 'react';
import { Button, Form,Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css";

function Home() {
    function changeloginpage(){
        window.location.href="/login";
    }
    function changeregisterpage(){
        window.location.href="/register";
    }
    return (
    <div className="home" >
		<Form >
        <h1>Welcome to the Home Page!</h1>
        <Button  block bsSize="large" onClick={changeloginpage} >
		    Login
		</Button>	
		<Button block bsSize="large" onClick={changeregisterpage}>
			Register
		</Button>
        </Form>
    </div>
  );
}

export default Home;