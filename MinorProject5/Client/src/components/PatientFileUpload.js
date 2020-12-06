import React, {Fragment,useState,useEffect} from 'react';
import axios from 'axios'; 
import {Form, Col, Button} from 'react-bootstrap';
import './FileUpload.css';
import {toast} from 'react-toastify';
import {Link} from "react-router-dom";
import { NavItem, Nav, FormControl, Navbar, NavDropdown, MenuItem, Card, CardGroup, CardDeck } from "react-bootstrap";
const PatientFileUpload = ({setAuth}) =>
{
    const [selectedFile, setFile]=useState(null);
    const [uploadedFile, setUploadedFile] = useState();
    const [FileLabel, setFileLabel] = useState('Choose or Drag and Drop Images (only .jpg, .jpeg and .png supported)');
    const [imageIcon, setImageIcon] = useState("https://icons-for-free.com/iconfiles/png/512/box+document+outline+share+top+upload+icon-1320195323221671611.png");
    const [statusFile, setStatusFile] = useState("Please upload your Government ID for verification");
    const [imgPreview, setImagePreview] = useState("Please upload your Government ID for verification");
    const [first_name, setName] = useState("");
    const onChangeHandler = event =>
    {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
        console.log(event.target.files[0].name);
        setUploadedFile(URL.createObjectURL(event.target.files[0]));
        setFileLabel(event.target.files[0].name)
    }
    const onSubmitForm = async (e) => 
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('token', localStorage.token)
        console.log('Token in uplaod = $1',localStorage.token)
        try
        {
            const res = await axios.post("http://localhost:5001/auth/patientupload", formData, { headers : {'token' : localStorage.token}})
            console.log('Img upload res = $1',[res]);
            if(res.status===200&&res.data.msg===undefined)
            {
                setUploadedFile(false);
                setImageIcon('data:image/png;base64,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');
                setFileLabel('Choose or Drag and Drop Images (only .jpg, .jpeg and .png supported)');
                setStatusFile("File uploaded successfully")
                setImagePreview('Your Government ID is successfully submitted for verification')
                toast.success('File Uploaded Sucessfully');
            }
            else if(res.data.msg)
            {
                toast.error(res.data.msg);
            } 
        }
        catch(err)
        {
            if(err.message==='Request failed with status code 502')
            {
                toast.error('Please upload a file with size less than 250kb')
            }
            if(err.message==='Request failed with status code 504'){
                toast.error('Only .png, .jpg and .jpeg format allowed!')
            }
            console.log(err);
        }
    }
    const onClickRemove = async (e) =>
    {
        setUploadedFile(null);
        setFileLabel('Choose File');
        setImageIcon('https://icons-for-free.com/iconfiles/png/512/box+document+outline+share+top+upload+icon-1320195323221671611.png')
        console.log(e);
    }
    async function getName() {
        try {
          console.log(`Dashboard token = ${localStorage.token}`);
            const response = await fetch("http://localhost:5001/dashboard/", {
                method:"GET",
                headers: { token: localStorage.token}
            });

            const parseRes = await response.json();
            console.log(`Dashboard res = ${parseRes.first_name}`);
            setName(parseRes.first_name);
            setAuth(true);
        } catch (err) {
            console.error(err.message);
        }
    };
    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out successfully");
    }
    useEffect(() => {
        
        getName();
    },[]);
    return(
        <Fragment>
            <Navbar width="auto" fixed="top" bg="primary" variant="light">
          <Navbar.Brand><Link className="text-white" to="#" style={{ textDecoration: 'none' }}>Hi! {first_name}</Link></Navbar.Brand>
          <Nav>
            <Nav.Link><Link className="text-white" to="#" style={{ textDecoration: 'none' }}>Home</Link></Nav.Link>
            <Nav.Link><Link className="text-white" to="#" style={{ textDecoration: 'none' }}>Profile</Link></Nav.Link>
            <Nav.Link
              className="border-left pl-2 ml-auto text-white"
              onClick={(e) => logout(e)}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar>
            <div className="divForm shadow">
            <h2 className="card-header bg-success  shadow text-center py-3">
    				<strong>Identity Verification</strong>
  			</h2>
            <h5 className="text-center mt-2">{statusFile}</h5>
            <Form onSubmit={onSubmitForm} className="paddingForm mw-100">
                <Form.Row>
			        <Form.Group as={Col} class>
                        <div className="custom-file">
                            <input type="file" className='custom-file-input' name="file" id="customFile" onChange={e=> onChangeHandler(e)}/>
                            <label class="custom-file-label" for="customFile">{FileLabel}</label>
                        </div>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
			        <Form.Group as={Col} >
			            <Button block bsSize="large" onClick={onClickRemove} className="bg-danger">
				        Remove
			            </Button>
		            </Form.Group>
		            <Form.Group as={Col}>
			            <Button  block bsSize="large" type="submit" className="bg-success">
				        Submit
				        </Button>	
			        </Form.Group>
                </Form.Row>
            </Form>
            <h6 className="mt-n1 ml-2">{imgPreview}</h6>
            {uploadedFile?( <div className="row mt-2 border border-dark uplImage bg-white mw-100 m-auto">
                                <div className="m-auto uplImage mh-100">
                                    <img src={uploadedFile} className="h-100 uplImage inline-block mw-100" alt=" "/>
                                </div>
                            </div>):
                            (<div className="row mt-5 border border-dark bg-white mw-100 m-auto uplImage">
                                <div className="m-auto uplImage">
                                    <img src={imageIcon} className="h-100 wImg" alt=""/>
                                </div>
                            </div>
                        )
            }
            </div>
        </Fragment>
    );
};
export default PatientFileUpload;