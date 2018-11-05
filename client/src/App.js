import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Dashboard from "./pages/Dashboard";
import AddProject from "./pages/AddProject";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => (
  <Router> 
<div>
    <Navbar />
    <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/addproject" component={AddProject} />
      
      </Switch>

  </div>
  </Router>
);

export default App;
