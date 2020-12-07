import React, { Fragment, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Card, CardDeck, Button } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from "react-router-dom";
const PDashboard = ({ setAuth }) => 
{
    const [first_name, setName] = useState("");
    async function getName() 
    {
        try 
        {
            const response = await fetch("http://localhost:5001/patientdash/", {
                method: "GET",
                headers: { token: localStorage.token }
        });

            const parseRes = await response.json();
            setName(parseRes.first_name);

        }
        catch (err) 
        {
            console.error(err.message);
        }
    };

    const logout = (e) => 
    {
        e.preventDefault()
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out successfully");
    }

    useEffect(() => 
    {
        getName();
    }, []);

    function changepage() 
    {
        window.location.href = "/Patientprofile";
    }

    return (
        <Fragment>
            <Navbar width="auto" fixed="top" bg="primary" variant="light">
          <Navbar.Brand href="#home" className="text-white">Hi! {first_name}</Navbar.Brand>
          <Nav>
            <Nav.Link href="" className="text-white">Home</Nav.Link>
            <Nav.Link
              className="border-left pl-2 ml-auto text-white"
              
             // href="http://loprofilecalhost:3000/profile"
            ><Link to="/Patientprofile" className="text-white" style={{ textDecoration: 'none' }}>
              Profile
            </Link></Nav.Link>
            <Nav.Link
              className="border-left pl-2 ml-auto text-white"
              onClick={(e) => logout(e)}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
            <CardDeck>
                <Card>
                    <Card.Img variant="top" src="https://d2908q01vomqb2.cloudfront.net/b6692ea5df920cad691c20319a6fffd7a4a766b8/2019/06/25/ClusterEMRReconfig1.jpg" />
                    <Card.Body>
                        <Card.Title>EMR</Card.Title>
                        <Card.Text>
                            An electronic health record is the systematized collection of patient and population electronically stored health information in a digital format.
                </Card.Text>
                    </Card.Body>
                    <Button variant="primary">Search</Button>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://archer-soft.com/sites/default/files/image/2020/04/04/archerblogdata-emr.jpeg" />
                    <Card.Body>
                        <Card.Title>Edit Info</Card.Title>
                        <Card.Text>
                            Here you can edit your profile
                </Card.Text>
                    </Card.Body>
                    <Button variant="primary" onClick={changepage}>Edit</Button>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://archer-soft.com/sites/default/files/image/2020/04/04/archerblogdata-emr.jpeg" />
                    <Card.Body>
                        <Card.Title>Doctor Permissions</Card.Title>
                        <Card.Text>
                            Allow a doctor to view/add medical record
                </Card.Text>
                    </Card.Body>
                    <Button variant="primary"><Link to="/Patientpermission">Give Permission</Link></Button>
                
                </Card>
            </CardDeck>
        </Fragment>
    );
};

export default PDashboard;