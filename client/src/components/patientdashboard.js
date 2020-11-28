import React, { Fragment, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Card, CardDeck, Button } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

const PDashboard = ({ setAuth }) => 
{
    const [name, setName] = useState("");
    async function getName() 
    {
        try 
        {
            const response = await fetch("http://localhost:5001/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
        });

            const parseRes = await response.json();
            setName(parseRes.name);

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
        window.location.href = "/profile";
    }

    return (
        <Fragment>
            <Navbar width="auto" fixed="top" bg="light" variant="light">
          <Navbar.Brand href="#home">Hi!</Navbar.Brand>
          <Nav>
            <Nav.Link href="/Patientdashboard">Home</Nav.Link>
            <Nav.Link
              className="border-left pl-2 ml-auto"
            //   href="/Patientprofile"
             // href="http://localhost:3000/patientprofile"
            >
              Profile
            </Nav.Link>
            <Nav.Link
              className="border-left pl-2 ml-auto"
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
					<Card.Img variant="top" src="https://www.softwareadvice.com/resources/wp-content/uploads/5-Reasons-to-Replace-Your-EHR-Tile.png" />
					<Card.Body>
						<Card.Title>EMR</Card.Title>
						<Card.Text>
							An electronic health record is the systematized collection of patient and population electronically stored health information in a digital format.
				</Card.Text>
					</Card.Body>
					<Button variant="primary">View</Button>
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
			</CardDeck>
		</Fragment>
	);
};

export default PDashboard;
