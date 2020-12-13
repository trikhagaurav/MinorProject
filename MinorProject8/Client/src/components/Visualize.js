import React, { Fragment, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Card, CardDeck, Button } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import {Link, BrowserRouter as Router} from "react-router-dom";
import { Row, Col } from 'reactstrap';
const Visualize = ({ setAuth }) => 
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


    return (
        <Fragment>
            {/* <Navbar width="auto" fixed="top" bg="primary" variant="light">
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
              
             // href="http://loprofilecalhost:3000/profile"
            ><Link to="/visualize" className="text-white" style={{ textDecoration: 'none' }}>
              Visualize
            </Link></Nav.Link>
            <Nav.Link
              className="border-left pl-2 ml-auto text-white"
              onClick={(e) => logout(e)}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar> */}
        <br />
        <br />
        <br/>
        <Row>
            <Col>
            <CardDeck>
                <Card border="primary">
                    <Card.Img variant="top" src="data:image/png;base64,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" height="195px"/>
                    {/* <Card.Body>
                         <Card.Title>Plot</Card.Title>
                        <Card.Text>
                         Plotting Gender vs Count    
                        </Card.Text>
                    </Card.Body> */}
                    <Card.Footer>
                    <Card.Text>
                         View Gender vs Count    
                        </Card.Text>
                    < Router>
                    <Button variant="success"><Link className="text-white" style={{ textDecoration: 'none' }} target="_blank" to={"//localhost:4000/plotGvsC"} >View</Link></Button>
                  </ Router> 
                  </Card.Footer>
                </Card> 
                </CardDeck>  
            </Col>
            <Col>
            <CardDeck>
            <Card border="primary">
                    <Card.Img variant="top" src="https://cdn.lynda.com/course/802837/802837-637286267107357882-16x9.jpg" />
                    {/* <Card.Body>
                        <Card.Title>Plot</Card.Title>
                        <Card.Text>
                         Plot Careplan vs Count
                        </Card.Text>
                    </Card.Body> */}
                    <Card.Footer>
                    <Card.Text>
                      View Careplan vs Count
                        </Card.Text>
                    < Router>
                    <Button variant="success"><Link className="text-white" style={{ textDecoration: 'none' }} target="_blank" to={"//localhost:4000/plotCvsC"} >View</Link></Button>
                  </ Router> 
                  </Card.Footer>
                </Card> 
                </CardDeck>
            </Col>
            <Col>
            <CardDeck>
            <Card border="primary">
                    <Card.Img variant="top" src="https://www.greatschools.org/gk/wp-content/uploads/2016/04/Tables-charts-graphs.jpg" height="195px" />
                    {/* <Card.Body>
                        <Card.Title>Plot</Card.Title>
                        <Card.Text>
                         Plot Careplan vs Count
                        </Card.Text>
                    </Card.Body> */}
                    <Card.Footer>
                    <Card.Text>
                    View all the Graphs
                        </Card.Text>
                    < Router>
                    <Button variant="success"><Link className="text-white" style={{ textDecoration: 'none' }} target="_blank" to={"//localhost:4000/AllGraphs"} >View</Link></Button>
                  </ Router> 
                  </Card.Footer>
                </Card> 
                </CardDeck>
            </Col>
        </Row>
        <br />
        <Row>
        <Col>
            <CardDeck>
            <Card border="primary">
                    <Card.Img variant="top" src="https://cdn.lynda.com/course/169055/169055-637286160171938323-16x9.jpg"/>
                    {/* <Card.Body>
                        <Card.Title>Plot</Card.Title>
                        <Card.Text>
                         Plot Careplan vs Count
                        </Card.Text>
                    </Card.Body> */}
                    <Card.Footer>
                    <Card.Text>
                    View Medical Records vs Count
                        </Card.Text>
                    < Router>
                    <Button variant="success"><Link className="text-white" style={{ textDecoration: 'none' }} target="_blank" to={"//localhost:4000/plotMvsC"} >View</Link></Button>
                  </ Router> 
                  </Card.Footer>
                </Card> 
                </CardDeck>
            </Col>
            <Col>
            <CardDeck>
            <Card border="primary">
                    <Card.Img variant="top" src="https://d2mkcg26uvg1cz.cloudfront.net/wp-content/uploads/Charts-graphs.jpg" height="195px" />
                    {/* <Card.Body>
                        <Card.Title>Plot</Card.Title>
                        <Card.Text>
                         Plot Careplan vs Count
                        </Card.Text>
                    </Card.Body> */}
                    <Card.Footer>
                    <Card.Text>
                    View Country vs Count 
                        </Card.Text>
                    < Router>
                    <Button variant="success"><Link className="text-white" style={{ textDecoration: 'none' }} target="_blank" to={"//localhost:4000/plotCovsC"} >View</Link></Button>
                  </ Router> 
                  </Card.Footer>
                </Card> 
                </CardDeck>
            </Col>
            <Col>
            <CardDeck>
            <Card border="primary">
                    <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO5MPDdj5uW2L3pxVs6P6W3IzRtl2uh6pJZw&usqp=CAU" height="195px" />
                    {/* <Card.Body>
                        <Card.Title>Plot</Card.Title>
                        <Card.Text>
                         Plot Careplan vs Count
                        </Card.Text>
                    </Card.Body> */}
                    <Card.Footer>
                    <Card.Text>
                    View Date vs Count
                        </Card.Text>
                    < Router>
                    <Button variant="success"><Link className="text-white" style={{ textDecoration: 'none' }} target="_blank" to={"//localhost:4000/plotDvsC"} >View</Link></Button>
                  </ Router> 
                  </Card.Footer>
                </Card> 
                </CardDeck>
            </Col>
        </Row>
        
        </Fragment>
    );
};

export default Visualize;
