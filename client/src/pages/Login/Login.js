import React, { Component } from 'react';
import { Button, Carousel } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from '../Dashboard';
import API from "../../utils/API";
import Navbar from "../../components/Navbar";
import "./Login.css"
{/*npm install React Bootstrap Library use this command $ npm install react-bootstrap*/ }
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
                    <h1 className="title">Welcome to theGigMaker!</h1>
                        <p className="subtitle"><b>theGigMaker</b> is a web-based application that allows
                        <p>users to find short-term gigs based on their hobbies or specialities.</p>
                            <Button><a href="http://localhost:3001/api/auth/google">Sign in with Google+</a></Button>
                        </p>
                        <Carousel>
                        
                            <Carousel.Item>
                                <img width={10000} height={100} alt="office-img" src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"/>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={10000} height={200} alt="office-img" src="https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />

                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={10000} height={200} alt="office-img" src="https://images.pexels.com/photos/374016/pexels-photo-374016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />

                            </Carousel.Item>

                            <Carousel.Item>
                                <img width={10000} height={200} alt="office-img" src="https://images.pexels.com/photos/1181646/pexels-photo-1181646.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                            </Carousel.Item>
                        </Carousel>


                        {/* <img src="https://clip2art.com/images/sky-clipart-background-8.jpg" alt="office-background"/> */}
                        <video id="background-video" loop autoPlay>
                            <source src="https://vimeo.com/92688656" type="video" />
                        </video>
                    </div>

                    {/**/}
                </div>
            </Router>
        )
    }

}

export default Login;