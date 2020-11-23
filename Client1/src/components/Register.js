// import React, { Fragment, useState } from "react";
// import { Link, Redirect } from "react-router-dom";
// import { toast } from "react-toastify";

// const Register = ({ setAuth }) => {
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//     name: ""
//   });

//   const { email, password, name } = inputs;

//   const onChange = e =>
//     setInputs({ ...inputs, [e.target.name]: e.target.value });

//   const onSubmitForm = async e => {
//     e.preventDefault();
//     try {
//       const body = { email, password, name };
//       const response = await fetch(
//         "http://localhost:5000/authentication/register",
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
//         toast.success("Register Successfully");
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
//       <h1 className="mt-5 text-center">Register</h1>
//       <form onSubmit={onSubmitForm}>
//         <input
//           type="text"
//           name="email"
//           value={email}
//           placeholder="email"
//           onChange={e => onChange(e)}
//           className="form-control my-3"
//         />
//         <input
//           type="password"
//           name="password"
//           value={password}
//           placeholder="password"
//           onChange={e => onChange(e)}
//           className="form-control my-3"
//         />
//         <input
//           type="text"
//           name="name"
//           value={name}
//           placeholder="name"
//           onChange={e => onChange(e)}
//           className="form-control my-3"
//         />
//         <button className="btn btn-success btn-block">Submit</button>
//       </form>
//       <Link to="/login">login</Link>
//     </Fragment>
//   );
// };

// export default Register;
import React,{Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import axios from 'axios';
import { Form, Col, Row, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';

const Register = ({setAuth}) => {

	/*constructor(props){
		super(props);
		  this.state = {
			selectedFile: null
		  }
	   
	  };*/
	  
		  
	const [selectedFile, setFile]=useState(null);

	const [loaded, setLoaded]=useState(0);

    const [inputs, setInputs] = useState({
		first_name: "", 
		middle_name: "", 
		last_name: "", 
		mobile_number: "", 
		phone_number: "",
		date_of_birth: "", 
		blood_group: "A+", 
		house_number: "", 
		street: "", 
		city: "", 
		pincode: "", 
		state: "", 
		gender: "M", 
		username: "",
		password: ""
	    });
	    const {first_name, middle_name, last_name, mobile_number, phone_number, date_of_birth, blood_group, house_number, street, city, pincode, state, gender, username, password} = inputs;
	
		//const {selectedFile, loaded} = selec;

		const onChange = (e) => {
	        setInputs({...inputs, [e.target.name]: e.target.value});
	    };
		
		
		const onChangeHandler=event=>{

			//console.log(event.target.files[0])
			/*this.setState({
				selectedFile: event.target.files[0],
				loaded: 0,
			  })*/
			  console.log(event.target.files[0]);
			setFile(event.target.files[0]);
			setLoaded(0);
			  console.log(selectedFile);
			  console.log(event.target);
		}

	    const onSubmitForm = async (e) => {
			e.preventDefault();
			const formData = new FormData();
			formData.append('file', selectedFile);

	        try {
	
	            const body = { first_name, middle_name, last_name, mobile_number, phone_number, date_of_birth, blood_group, house_number, street, city, pincode, state, gender, username, password };
	
	            const response = await fetch(
	              "http://localhost:5000/authentication/registerPatient",
	              {
	                method: "POST",
	                headers: { "Content-Type": "application/json" },
	                body: JSON.stringify(body),
	              }
				);
				//const res = ;
				axios.post("http://localhost:5000/authentication/upload", formData, { // receive two parameter endpoint url ,form data 
      			})
      			.then(res => { // then print response status
        		console.log(res.statusText)
	  			})
	  
	            const parseRes = await response.json()
	            if(parseRes.jwtToken){
	              localStorage.setItem("token", parseRes.jwtToken);
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
		/*function onChangeHandler(event){

			console.log(event.target.files[0])
		
		}*/
	
	    return (
			
			<div class="pat">
			<Form onSubmit={onSubmitForm}>
			 <Form.Group>
			   <Form.Label>
				 <h1>User Registration Form</h1>
			  </Form.Label>
			</Form.Group> 
		  <Form.Row>
		  <Form.Group  as={Col} controlId="formGridFirstName">
			<Form.Label>First Name</Form.Label>
			<Form.Control type="text" placeholder="First Name" name="first_name" value={first_name} onChange={e => onChange(e)}/>
		  </Form.Group>
		  <Form.Group as={Col} controlId="formGridMiddleName">
			<Form.Label>Middle Name</Form.Label>
			<Form.Control type="text" placeholder="Middle Name" name="middle_name" value={middle_name} onChange={e => onChange(e)}/>
		  </Form.Group>
		  <Form.Group as={Col} controlId="formGridLastName">
			<Form.Label>Last Name</Form.Label>
			<Form.Control type="text" placeholder="Last Name" name="last_name" value={last_name} onChange={e => onChange(e)}/>
		  </Form.Group>
	  
		  </Form.Row>
		  
		<Form.Row>
		<Form.Group as={Col} controlId="formGridDOB">
		  <Form.Label>Date of birth</Form.Label>
		  <Form.Control placeholder="DD/MM/YYYY" name="date_of_birth" value={date_of_birth} onChange={e => onChange(e)}/>
		</Form.Group>
		  
		<Form.Group as={Col} controlId="formGridBloodgroup">
			<Form.Label>Blood Group</Form.Label>
			<Form.Control as="select" defaultValue="A+" name="blood_group" value={blood_group} onChange={e => onChange(e)}>
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
			<Form.Label>Gender</Form.Label>
			<Form.Control as="select" defaultValue="M" name="gender" value={gender} onChange={e => onChange(e)}>
			  <option>M</option>
			  <option>F</option>
			  <option>O</option>
			</Form.Control>
		  </Form.Group>
		</Form.Row>
		<Form.Row>
		<Form.Group  as={Col} controlId="formGridShousenumber">
		  <Form.Label>House number</Form.Label>
		  <Form.Control placeholder="343" name="house_number" value={house_number} onChange={e => onChange(e)}/>
		</Form.Group>
		<Form.Group as={Col} controlId="formGridStreet">
		  <Form.Label>Street</Form.Label>
		  <Form.Control placeholder="1234 Main St" name="street" value={street} onChange={e => onChange(e)}/>
		</Form.Group>
		</Form.Row>
	  
		<Form.Row>
		<Form.Group  as={Col} controlId="formGridCity">
		  <Form.Label>City</Form.Label>
		  <Form.Control placeholder="New Delhi" name="city" value={city} onChange={e => onChange(e)} />
		</Form.Group>
		<Form.Group as={Col} controlId="formGridState">
		  <Form.Label>State</Form.Label>
		  <Form.Control placeholder="Delhi" name="state" value={state} onChange={e => onChange(e)}/>
		</Form.Group>
		<Form.Group as={Col} controlId="formGridPincode">
		  <Form.Label>Pincode</Form.Label>
		  <Form.Control placeholder="110045" name="pincode" value={pincode} onChange={e => onChange(e)}/>
		</Form.Group>
		</Form.Row>
		
		<Form.Row>
		<Form.Group as={Col} controlId="formGridMobilePhone">
			<Form.Label>Mobile Number</Form.Label>
			<Form.Control type="text" name="mobile_number" value={mobile_number} onChange={e => onChange(e)}/>
		  </Form.Group>
		  <Form.Group as={Col} controlId="formGridPhone">
			<Form.Label>Phone Number</Form.Label>
			<Form.Control type="text" name="phone_number" value={phone_number} onChange={e => onChange(e)}/>
		  </Form.Group>
		 
	  
		</Form.Row>
	  
		<Form.Row>
		<Form.Group as={Col} controlId="formGridUsername">
		  <Form.Label>Username</Form.Label>
		  <Form.Control value={username} name="username" onChange={e => onChange(e)} placeholder="rashbari12" />
		</Form.Group>
		  
		<Form.Group as={Col} controlId="formGridPassword">
		  <Form.Label>Password</Form.Label>
		  <Form.Control type="password" value={password} name="password" onChange={e => onChange(e)} placeholder="mo@ba@la*la(la)" />
		</Form.Group>
	  
		</Form.Row>

		<Form.Row>
	  		<input type="file" name="file" onChange={e=> onChangeHandler(e)}/>
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
	  </Form>
	  
	  
	  
		  </div>
		  
			
	    );
	};

	//   <Fragment>
	    //     <h1 className="text-center my-5">Register</h1>
	    //     <form onSubmit={onSubmitForm}>
	    //       <input
	    //         type="email"
	    //         name="email"
	    //         placeholder="email"
	    //         className="form-control my-3"
	    //         value={email}
	    //         onChange={e => onChange(e)}
	    //       />
	    //       <input
	    //         type="password"
	    //         name="password"
	    //         placeholder="password"
	    //         className="form-control my-3"
	    //         value={password}
	    //         onChange={e => onChange(e)}
	    //       />
	    //       <input
	    //         type="text"
	    //         name="name"
	    //         placeholder="name"
	    //         className="form-control my-3"
	    //         value={name}
	    //         onChange={e => onChange(e)}
	    //       />
	    //       <button className="btn btn-success btn-block">Submit</button>
	    //     </form>
	    //     <Link to="/login">Login</Link>
	    //   </Fragment>
	
	export default Register;

