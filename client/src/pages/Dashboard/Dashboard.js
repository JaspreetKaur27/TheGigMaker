import React, { Component } from 'react';
import { Tabs, Tab, Thumbnail, Image } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import Column from "../../components/Column";
import Container from "../../components/Container";
import Row from "../../components/Row";
import API from "../../utils/API";
import { FormBtn } from "../../components/Form";
import  Navbar  from "../../components/Navbar";

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    //this.getUser = this.getUser.bind(this);
    this.getAllSaved = this.getAllSaved.bind(this);

    this.state = {
      key: 1,
      show: false,
      saved: [],
      showId: null,
      user: []
      };
  }

  componentDidMount() {
    this.getAllSaved();
    //this.getUser();
  }

  handleSelect(key) {
    this.setState({ key });
  }

  handleShow = (id) => {
    this.setState({ show: true, showId: id });
  }

  handleHide = () => {
    this.setState({ show: false });
  }

  // getUser = () => {
  //   API.getProfile()
  //   .then(res => {
  //       console.log(res);
  //       this.setState({
  //         user: res.data
  //       });
  //       console.log(this.state.user);
  //   }).catch(err => console.log(err));
  // }
  
  
  getAllSaved = () => {
    API.getdbProjects()
      .then(res => {
        console.log(res);
        this.setState({
          saved: res.data
        });
        console.log(this.state.saved.length);
      })
      .catch(err => console.log(err));
  };

  collabproject = () => {
    API.collabProject()
      .then(res => {
        console.log(res);
        window.location.href = "/dashboard";
      })
      .catch(err => console.log(err));
  };

  render() {
    //const showItem = this.state.saved.find(item => item._id === this.state.showId);
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
          <Tabs
            activeKey={this.state.key}
            onSelect={this.handleSelect}
            id="controlled-tab-example"
          >
            <Tab eventKey={1} title="My Projects">
              <Container>
                <Row>
                  <h3>No Projects</h3>
                  {/* {this.state.user.length ? (
                    <p>{this.state.user.map((user) => (
                    <h3>{user.data.populatedUser['0']._id}</h3>
                    ))}</p>
                  ) : (
                    <h3>No User</h3>
                  )} */}
                  
                </Row>
              </Container>
            </Tab>
            <Tab eventKey={2} title="My Collaborations">
              <Container>
                <Row>
                  <h3>No Projects</h3>
                </Row>
              </Container>
            </Tab>
            <Tab eventKey={3} title="Other Projects">
              <Container>
                <Row>
                  {this.state.saved.length ? (
                    <Column>
                      {this.state.saved.map((saved) => (
                        <Thumbnail>
                          <Image src={saved.userInput.imageUrl} thumbnail />
                          <h5>{saved.userInput.title}</h5>
                          <p>Location: {saved.userInput.location}</p>
                          <Button onClick={() => this.handleShow(saved._id)}>Read More</Button>
                        </Thumbnail>
                      ))}
                    </Column>
                  ) : (
                      <h3>No projects </h3>
                    )}

                </Row>
              </Container>
            </Tab>
          </Tabs>
          {/* <Modal
            {...this.props}
            show={this.state.show}
            id={this.state.saved._id}
            onHide={this.handleHide}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">
                {showItem && <p key={showItem._id}>{showItem.userInput.title}</p>}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {showItem && <div>
                <p key={showItem._id}>{showItem.userInput.description}</p>

                <FormBtn onClick={() => { this.collabproject.bind(this) }}>Collaborate?</FormBtn>
                <br></br>
                <br></br>

              </div>
              }

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>Close</Button>
            </Modal.Footer>
          </Modal> */}
        </Container>
      </div>
    );
  }
}

export default Dashboard;