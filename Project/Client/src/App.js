import React, {Fragment, useState, useEffect} from 'react';
import './App.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//component
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import EMR from "./components/EMR";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Patientlogin from "./components/patientlogin";
import Patientregister from "./components/patientregister";
import Patientdashboard from "./components/patientdashboard";
import FileUpload from "./components/FileUpload";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
  async function isAuth() {
    try {
      console.log(localStorage.token)
      const response = await fetch("http://localhost:5001/auth/is-verify", {
        method: "GET",
        headers: {token: localStorage.token}
        
      });
      console.log(response);
      const parseRes = await response.json();
      console.log(`Parse Res  = ${parseRes.authorisation}`);
      parseRes.authorisation === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      parseRes.verification === true ? setIsVerified(true) : setIsVerified(false);
      console.log(`Iauth = ${isAuthenticated}`);
      console.log(`Iverify = ${isVerified}`);
    } catch (err) {
      console.error(err.message);
    }
  }
  
  useEffect(() => {
    console.log('Calling is Auth');
    isAuth();
  });
  
    return (
      <Fragment>
        <Router>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>COPE</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>Doctor Login</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to={"/Register"}>Doctor Registration</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to={"/Patientlogin"}>Patient Login</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to={"/Patientregister"}>Patient Registration</Link>
                  </li>
                </ul>
              </div>
          </div>
        </nav>
          <div className="container">
            <Switch>
           
              <Route
                exact
                path="/login"
                render={(props) =>
                  !isAuthenticated ? (
                    <Login {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                }
              />
              <Route
                exact
                path="/register"
                render={(props) =>
                  !isAuthenticated ? (
                    <Register {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard"
                render={(props) =>
                  isAuthenticated ? ( !isVerified? (
                    <FileUpload {...props} setAuth={setAuth} />
                  ) : <Dashboard {...props} setAuth={setAuth}/>): (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard"
                render={(props) =>
                  !isVerified ? (
                    <FileUpload {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard"
                render={(props) =>
                  isAuthenticated ? (
                    <Dashboard {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/emr"
                render={(props) =>
                  isAuthenticated ? (
                    <EMR {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/search"
                render={(props) =>
                  isAuthenticated ? (
                    <Search {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/Profile"
                render={(props) =>
                  isAuthenticated ? (
                    <Profile {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              
              <Route
                exact
                path="/Patientregister"
                render={(props) =>
                  !isAuthenticated ? (
                    <Patientregister {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/Patientlogin" />
                  )
                }
              />
              <Route
                exact
                path="/Patientlogin"
                render={(props) =>
                  !isAuthenticated ? (
                    <Patientlogin {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/Patientdashboard" />
                  )
                }
              />
              <Route
                exact
                path="/Patientdashboard"
                render={(props) =>
                  isAuthenticated ? (
                    <Patientdashboard {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/Patientlogin" />
                  )
                }
              />
            </Switch>
          </div>
        </Router>
      </Fragment>
    );
}

export default App;