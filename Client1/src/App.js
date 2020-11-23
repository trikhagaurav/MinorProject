// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, {Fragment, useState, useEffect} from 'react';
import './App.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import Home from "./components/Home";
import Newrecord from "./components/Newrecord";
import DoctorRegister from "./components/doctorRegister";
import DoctorLogin from "./components/doctorLogin";
import DoctorDashboard from "./components/doctorDashboard";

toast.configure();

function App() {

const [isAuthenticated, setIsAuthenticated] = useState(false);
const setAuth = boolean => {
  setIsAuthenticated(boolean);
};

async function isAuth() {
  try {
    const response = await fetch("http://localhost:5000/authentication/verify", {
      method: "GET",
      headers: {jwt_token: localStorage.token}
    });

    const parseRes = await response.json();
    //alert(parseRes);
    parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    //alert(`isAuthicated = ${isAuthenticated}`);
  } catch (err) {
    console.error(err.message);
  }
}

useEffect(() => {
  isAuth();
});

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
          <Route
              exact
              path="/"
              render={(props) =>
                <Home />
              }
            />
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
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/loginDoctor"
              render={(props) =>
                !isAuthenticated ? (
                  <DoctorLogin {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard/doctor" />
                )
              }
            />
            <Route
              exact
              path="/registerDoctor"
              render={(props) =>
                !isAuthenticated ? (
                  <DoctorRegister {...props} setAuth={setAuth} />
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
                  <DoctorDashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/newRecord"
              render={(props) =>
                isAuthenticated ? (
                  <Newrecord {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
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
