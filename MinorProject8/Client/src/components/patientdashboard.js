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
        // window.location.href = "/viewemr";
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
            {/* <Nav.Link
              className="border-left pl-2 ml-auto text-white"
              
             // href="http://loprofilecalhost:3000/profile"
            ><Link to="/visualize" className="text-white" style={{ textDecoration: 'none' }}>
              Visualize
            </Link></Nav.Link> */}
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
                <Card border="primary">
                    <Card.Img variant="top" src="https://www.softwareadvice.com/resources/wp-content/uploads/5-Reasons-to-Replace-Your-EHR-Tile.png" />
                    <Card.Body>
                        <Card.Title>EMR</Card.Title>
                        <Card.Text>
                            An electronic health record is the systematized collection of patient and population electronically stored health information in a digital format.
                </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <Button variant="primary"><Link to="/viewemr" className="text-white" style={{ textDecoration: 'none' }}>
                 View
            </Link></Button>
            </Card.Footer>
                </Card>
                <Card border="primary">
                    <Card.Img variant="top" src="https://www.disruptivestatic.com/wp-content/uploads/2019/02/analytics-access.jpg" />
                    <Card.Body>
                        <Card.Title>Grant Access</Card.Title>
                        <Card.Text>
                            Grant Access of your profile
                </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <Button className="btn btn-primary addButton"><Link to="/Patientpermission" className="text-white" style={{ textDecoration: 'none' }}>Grant</Link></Button>
                    </Card.Footer>
                </Card>
            </CardDeck>
        </Fragment>
    );
};

export default PDashboard;