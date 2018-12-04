import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard';
import AddProject from './pages/AddProject';
import { Button } from "react-bootstrap";


class App extends Component {

 
  render() {
    return (
      <Router>
        <div>
          
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addproject" component={AddProject} />
            
          </Switch>

        </div>
      </Router>
    )
  }

};

export default App;
