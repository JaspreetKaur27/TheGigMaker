import React, { Component } from "react";
import { TextArea, Input, FormBtn } from "../../components/Form";
import  { Navbar, Nav, NavItem } from "react-bootstrap";
import Container from "../../components/Container";
import Button from "../../components/Button";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import API from "../../utils/API";
import { userObject } from "../Dashboard";
import Particles from "react-particles-js";

class AddProject extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      title: "",
      description: "",
      location: "",
      startDate: null,
      endDate: null,
      imageUrl: "",
      message: "",
      loading: false,
      amount: Number,
      user: []
    }
  }


  componentWillMount() {
    this.getUserObject();
  }


  getUserObject = () => {
    API.getUserObject()
      .then(res => {
        console.log(res);

        localStorage.setItem('user', res);

        var user = localStorage.getItem('user');

        // console.log(Object.values(user));
        this.setState({
          user: res.data

        })


        console.log(this.state.user._id);
      }).catch(err => console.log(err));
  };

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate
    endDate = endDate || this.state.endDate
    if (startDate.isAfter(endDate)) {
      endDate = startDate
    }

    this.setState({ startDate, endDate })
  }

  handleStart = (startDate) => {
    this.handleChange({ startDate })
  }

  handleEnd = (endDate) => {
    this.handleChange({ endDate })
  }

  dataChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createProject = (e) => {

    e.preventDefault();


    const title = this.state.title
    const description = this.state.description
    const location = this.state.location
    const startDate = this.state.startDate
    const endDate = this.state.endDate
    const imageUrl = this.state.imageUrl
    const amount = this.state.amount
    const userId = this.state.user._id

    const userInput = {
      title,
      description,
      location,
      startDate,
      endDate,
      imageUrl,
      amount,
      userId
    }
    console.log(userInput);
    console.log(userId);
    API.createProject(userInput

    )
      .then(res => {
        console.log(res);
        window.location.href = "/dashboard";
      })
      .catch(err => {
        this.setState({
          loading: false
        })
      })
  }

  handleShowRadioChange = () => {
    this.setState({
      show: true
    });
  }

  handleHideRadioChange = () => {
    this.setState({
      show: false
    })
  }

  loadOrShowMsg = () => {
    if (this.state.loading) {
      return <p> Loading... </p>
    }
    else {
      return <p>{this.state.message}</p>
    }
  }

  render() {

    return (
      <div>

      <Navbar inverse collapseOnSelect className="navbar">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/dashboard" style={{color: "white", textDecoration: "none"}}>Welcome, {this.state.user.username}</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem href="/dashboard">
                Dashboard
              </NavItem>
              <NavItem href="/AddProject">
                AddProject
              </NavItem>
              <NavItem href="/">
                Logout
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>


        
        <Container>
          <div className="col-md-6 col-md-offset-3">
            <form onSubmit={this.createProject.bind(this)} >
              <h3 style={{fontWeight: "bold"}}>Enter Project Information</h3>
              <label>
                Title:
                    <Input
                  value={this.state.title}
                  name="title"
                  placeholder="Title (Required)"
                  onChange={this.dataChange.bind(this)}
                  type="text"
                  size="100"
                  required
                />
              </label>
              <br></br>
              <label>
                Description:
                    <TextArea
                  value={this.state.description}
                  onChange={this.dataChange.bind(this)}
                  name="description"
                  placeholder="Description (Required, maximum 2000 Characters)"
                  rows="8"
                  cols="120"
                  type="text"
                  maxLength="1000"
                  required
                />
              </label>
              <br></br>
              <label>
                Location:
                    <Input
                  value={this.state.location}
                  onChange={this.dataChange.bind(this)}
                  name="location"
                  placeholder="Address or Postal Code (Required)"
                  required
                  size="100"
                />
              </label>
              <br></br>
              <label>
                Start Date:
                <br></br>
                  <DatePicker
                  className="rounded p-1"
                  selected={this.state.startDate}
                  selectsStart
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleStart}
                  placeholderText="MM/DD/YYYY"
                  required
                />
              </label>
              <br></br>
              <label>
                End Date:
                <br></br>
                  <DatePicker
                  className="rounded p-1"
                  selected={this.state.endDate}
                  selectsEnd
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleEnd}
                  placeholderText="MM/DD/YYYY"
                  required
                />
              </label>
              <br></br>
              <label>
                Image:
                    <Input
                  name="imageUrl"
                  onChange={this.dataChange.bind(this)}
                  value={this.state.imageUrl}
                  type="text" placeholder="Enter Image URL" required
                  size="100"
                />
              </label>
              <br></br>
              <div>
                <label>
                  <h4>Compensation: </h4>
                  {
                    this.state.show ?
                      <label>
                        Budget per Gigster:
                          <Input
                          value={this.state.amount}
                          onChange={this.dataChange.bind(this)}
                          type="number" name="amount"
                          min="1"
                          size="100"
                        />
                      </label>
                      : null
                  }
                  <Button type="button" onClick={() => this.handleShowRadioChange()}>Paid?</Button> {' '}
                  <Button type="button" onClick={() => this.handleHideRadioChange()}>Not Paid?</Button>
                </label>
              </div>
              <br></br>
              <FormBtn>
                Post
                  </FormBtn>
            </form>

            {this.loadOrShowMsg()}
          </div>
        </Container>
      </div>
    )
  }
}

export default AddProject;