import React, { Component } from "react";
import { TextArea, Input, FormBtn} from "../../components/Form";
import Column from "../../components/Column";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Button from "../../components/Button";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import API from "../../utils/API";
import Navbar from "../../components/Navbar";

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
        amount: null
      }
    }

    handleChange = ({startDate, endDate}) => {
      startDate = startDate || this.state.startDate
      endDate = endDate || this.state.endDate
      if (startDate.isAfter(endDate))
      {
          endDate = startDate
      }

      this.setState({ startDate, endDate})
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
   
      const userInput = {
        title,
        description,
        location,
        startDate,
        endDate,
        imageUrl,
        amount
      }

      API.createProject({
        userInput
      })
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
      if(this.state.loading)
      {
        return <p> Loading... </p>
      }
      else
      {
        return <p>{this.state.message}</p>
      }
    }
  
    render() {
      return (
        <div>
        <Navbar>
          <a className="navbar-brand" href="/dashboard">
            Dashboard
          </a>
          <a className="navbar-brand" href="/AddProject">
            Create New Gig
          </a>
          <a className="navbar-brand" href="/">
            Logout
          </a>
        </Navbar>
          <Container>
            <Row>
              <Column>
                <form onSubmit={this.createProject.bind(this)}>
                  <label>
                    Title:
                    <Input
                    value={this.state.title} 
                    name="title" 
                    placeholder="Title (Required)"
                    onChange={this.dataChange.bind(this)} 
                    required
                    />
                  </label>
                  <label>
                    Description:
                    <TextArea 
                    value={this.state.description}
                    onChange={this.dataChange.bind(this)}
                    name="description" 
                    placeholder="Description (Required 1000 Characters)" 
                    required
                    />
                  </label>
                  <label>
                    Location:
                    <Input 
                    value={this.state.location}
                    onChange={this.dataChange.bind(this)}
                    name="location" 
                    placeholder="Address or Postal Code (Required)" 
                    required
                    />
                  </label>
                  <label>
                    Start Date:
                  <DatePicker
                            className="rounded p-1" 
                            selected={this.state.startDate}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleStart}
                            placeholderText="Start Date"
                            required
                          />
                  </label>
                  <label>
                    End Date:
                  <DatePicker
                            className="rounded p-1" 
                            selected={this.state.endDate}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleEnd}
                            placeholderText="End Date"
                            required
                          />
                  </label>
                  <label>
                    Image:
                    <Input 
                    name="imageUrl"
                    onChange={this.dataChange.bind(this)}
                    value={this.state.imageUrl}
                    type="text" placeholder="Enter Image URL" required />
                  </label>
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
                          min="1"/>
                        </label>
                        : null
                    }
                    <Button type="button" onClick={() => this.handleShowRadioChange()}>Paid?</Button> {' '}
                    <Button type="button" onClick={() => this.handleHideRadioChange()}>Not Paid?</Button>
                  </label>
                  </div>
                  <FormBtn>
                    Post
                  </FormBtn>
                </form>

                {this.loadOrShowMsg()}
              </Column>
            </Row>
          </Container>
        </div>
      )
    }
  }
  
  export default AddProject;