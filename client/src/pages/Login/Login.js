import React, { Component } from 'react';
import { Button, Carousel } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from '../Dashboard';
import API from "../../utils/API";
import Navbar from "../../components/Navbar";
import "./Login.css"
//https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550&w=940
//https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550&w=940

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


                    <div className="main-container" >

                        <Carousel>
                            <Carousel.Item>
                                <img className="img-fluid" src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg" />
                                <Carousel.Caption>
                                    <h1 className="title">Welcome to theGigMaker!</h1>
                                    <p></p>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                         <br></br>
                                    <p className="subtitle"><b>theGigMaker</b> is a web-based application that allows
                        users to find short-term gigs based on their hobbies or specialities.
                        </p>
                        <p>
                        <br></br>
                                    
                                
                                        <Button><a href="http://localhost:3001/api/auth/google">Sign in with Google+</a></Button>
                                    </p>

                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img height={100} className="img-fluid" src="https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg" />
                                <Carousel.Caption>
                                    <div className="site-background" >
                                        <h1 className="title">Welcome to theGigMaker!</h1>
                                        <p></p>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                        <p className="subtitle"><b>Step One: </b> Create or join a gig.
                     <p></p>
                                            <Button><a href="http://localhost:3001/api/auth/google">Sign in with Google+</a></Button>
                                        </p>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item>
                                <img height={100} className="carousel-img" alt="office-img" src="https://images.pexels.com/photos/374016/pexels-photo-374016.jpeg" />
                                <Carousel.Caption>
                                    <div className="site-background" >
                                        <h1 className="title">Welcome to theGigMaker!</h1>
                                        <p></p>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                        <p className="subtitle"><b>Step Two: </b>Read or write the project description.
                                    <p></p>
                                            <Button><a href="http://localhost:3001/api/auth/google">Sign in with Google+</a></Button>
                                        </p>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item>
                                <img height={200} className="carousel-img" alt="office-img" src="https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg" />
                                <Carousel.Caption>
                                    <div className="site-background" >
                                        <h1 className="title">Welcome to theGigMaker!</h1>
                                        <p></p>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                        <p className="subtitle"><b>Step Three: </b> Start collaborating.
                                        <p></p>
                                            <Button><a href="http://localhost:3001/api/auth/google">Sign in with Google+</a></Button>
                                        </p>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>


                    </div>
                </div>
            </Router>
        )
    }

}

export default Login;