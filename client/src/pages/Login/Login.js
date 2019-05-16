import React, { Component } from 'react';
import "./Login.css";
import BackgroundSlider from 'react-background-slider';

//import image1 from "../../images/001.jpg";
import image2 from "../../images/002.jpeg";
import image3 from "../../images/003.jpg";
import image4 from "../../images/004.jpeg";
import image5 from "../../images/005.jpeg";

class Login extends Component {
    render() {
        return (

            <div>
                <BackgroundSlider
                    images={[image2, image3, image4, image5]}
                    duration={4}
                    transition={2}
                    style={{width: "100%"}}
                   
                />
                <div className="main-container">
                    <h1 className="title">Welcome to theGigMaker!</h1>
                    <p className="subtitle"><b>theGigMaker</b> is a web-based application that allows
                users to find short-term gigs based on their hobbies or specialities.
                        </p>
                    <div className='g-sign-in-button'>

                        <a href="	http://localhost:3001/api/auth/google">

                            <div className="content-wrapper">
                                <div className='logo-wrapper'>
                                    <img src='https://developers.google.com/identity/images/g-logo.png' alt="Google Logo" />
                                </div>
                                <span className='text-container'>
                                    <span>Sign in with Google</span>
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;