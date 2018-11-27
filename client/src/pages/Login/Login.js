import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from '../Dashboard';
import API from "../../utils/API";
import Navbar from "../../components/Navbar";
import "./Login.css"

class Login extends Component {

    constructor(props) {
        super(props);
        this.getUser = this.getUser.bind(this);
        this.state = {
            isLoggedIn: false,
            user: []
        }

    }

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        API.getProfile()
            .then(res => {
                console.log(res);
                this.setState({
                    user: res.data
                })
            }).catch(err => console.log(err));
    }


    render() {
        return (
            <Router>
                <div>
                    <Navbar>
                        {!this.state.isLoggedIn ?
                            <a className="navbar-brand" href="/">
                                Login
                            </a>
                            :
                            [<a className="navbar-brand" href="/dashboard">
                                Dashboard
                            </a>,
                            <a className="navbar-brand" href="/AddProject">
                                Create New Gig
                            </a>,
                            <a className="navbar-brand" href="/">
                                Logout
                            </a>]}
                    </Navbar>
                    <Switch>
                        <Route exact path="/dashboard" component={Dashboard} />
                    </Switch>
                    

                    <div className="site-background">
                        <h1 className="title">Welcome to theGigMaker!</h1>
                        <p className="subtitle"><b>theGigMaker</b> is a web-based application that allows users to find short-term gigs based on their hobbies or specialities.
                        
                    </p>
                    <Button><a href="http://localhost:3001/api/auth/google">Sign in with Google+</a></Button>
                    {/* <img src="https://clip2art.com/images/sky-clipart-background-8.jpg" alt="office-background"/> */}
                    <video id="background-video" loop autoPlay>
                        <source src="https://vimeo.com/92688656" type="video"/>
                    </video>
                      </div>
                      
                    {/**/}
                </div>
            </Router>
        )
    }

}

export default Login;