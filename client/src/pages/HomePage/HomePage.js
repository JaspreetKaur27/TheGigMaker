import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard";
import AddProject from "../AddProject";
import Navbar from "../../components/Navbar";

class HomePage extends Component {
    render() {
        return (
            <Router>
            <div>
                <Navbar>
                    <a className="navbar-brand" href="/">
                        Dashboard
                     </a>
                    <a className="navbar-brand" href="/AddProject">
                        Create New Gig
                     </a>
                    <a className="navbar-brand" href="/logout">
                        Logout
                     </a>
                </Navbar>
                
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/addproject" component={AddProject} />
                    </Switch>
            
            </div>
            </Router>
        )
    }
}

export default HomePage;