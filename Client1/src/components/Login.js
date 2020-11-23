// import React, { Fragment, useState } from "react";
// import { Link, Redirect } from "react-router-dom";

// import { toast } from "react-toastify";

// const Login = ({ setAuth }) => {
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: ""
//   });

//   const { email, password } = inputs;

//   const onChange = e =>
//     setInputs({ ...inputs, [e.target.name]: e.target.value });

//   const onSubmitForm = async e => {
//     e.preventDefault();
//     try {
//       const body = { email, password };
//       const response = await fetch(
//         "http://localhost:5000/authentication/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json"
//           },
//           body: JSON.stringify(body)
//         }
//       );

//       const parseRes = await response.json();

//       if (parseRes.jwtToken) {
//         localStorage.setItem("token", parseRes.jwtToken);
//         setAuth(true);
//         toast.success("Logged in Successfully");
//       } else {
//         setAuth(false);
//         toast.error(parseRes);
//       }
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   return (
//     <Fragment>
//       <h1 className="mt-5 text-center">Login</h1>
//       <form onSubmit={onSubmitForm}>
//         <input
//           type="text"
//           name="email"
//           value={email}
//           onChange={e => onChange(e)}
//           className="form-control my-3"
//         />
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={e => onChange(e)}
//           className="form-control my-3"
//         />
//         <button class="btn btn-success btn-block">Submit</button>
//       </form>
//       <Link to="/register">register</Link>
//     </Fragment>
//   );
// };

// export default Login;
	import React,{Fragment, useState} from "react";
	import {Link} from "react-router-dom";
	import {toast} from 'react-toastify';
	import { Button, Form,Col } from "react-bootstrap";
	import 'bootstrap/dist/css/bootstrap.min.css';
	import "./Login.css";

const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState({
		username: "",
		password: ""
	    });
	    const {username, password} = inputs;
	    const onChange = e => {
	        setInputs({ ...inputs, [e.target.name]: e.target.value});
	    };
	
	    const onSubmitForm = async(e) => {
	        e.preventDefault()
	        try {
	
	            const body = {username, password}
	
	            const response = await fetch("http://localhost:5000/authentication/loginPatient", {
	            method:"POST",
	            headers: {"Content-Type": "application/json"},
	            body: JSON.stringify(body)
	        });
	        const parseRes = await response.json();
			console.log(parseRes);
	        if(parseRes.jwtToken) {
	            localStorage.setItem("token",parseRes.jwtToken);
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
			<Form onSubmit={onSubmitForm}>
			  <Form.Label><h1>Login</h1></Form.Label>
			  <Form.Group controlId="email" bsSize="large">
				<Form.Label>Username</Form.Label>
				<Form.Control
				  autoFocus
				  type="text"  
	              name="username"
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
			</Form>
		  </div>
	  
		//   <Fragment>
	    //     <h1>Login</h1>
	    //     <form onSubmit={onSubmitForm}>
	    //       <input
	    //         type="email"
	    //         name="email"
	    //         placeholder="email"
	    //         className="form-control my-3"
	    //         value={email}
	    //         onChange={e=>onChange(e)}
	    //       />
	    //       <input
	    //         type="password"
	    //         name="password"
	    //         placeholder="password"
	    //         className="form-control my-3"
	    //         value={password}
	    //         onChange={e=>onChange(e)}
	    //       />
	    //       <button className="btn btn-success btn-block">Submit</button>
	    //     </form>
		// 	<br></br>
	    //     <Link to="/register">Register</Link>
	    //   </Fragment>
	    );
	};
	
	export default Login;
