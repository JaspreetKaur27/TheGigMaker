import React, { Component } from 'react';
import { Tabs, Tab, Thumbnail, Image } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import Column from "../../components/Column";
import Container from "../../components/Container";
import Row from "../../components/Row";
import API from "../../utils/API";
import { FormBtn, TextArea } from "../../components/Form";
import Navbar from "../../components/Navbar";

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    // this.getUser = this.getUser.bind(this);
    this.getUserObject = this.getUserObject.bind(this);
    this.collabproject = this.collabproject.bind(this);
    // this.getUserProjects = this.getUserProjects.bind(this);

    this.state = {
      key: 1,
      show: false,
      msg: '',
      myprojects: [],
      saved: [],
      showId: null,
      user: []
    };
  }

  componentWillMount() {
    this.getUserObject();
  }

  componentDidMount() {
    this.getAllSaved();
    // this.getUserProjects();
    // this.getUser();
  };

  getUserObject = () => {
    API.getUserObject()
      .then(res => {
        // console.log(res);

        localStorage.setItem('user', res);

        //  let user =  localStorage.getItem('user');

        // console.log(Object.values(user));

        // var userObject = res.data;


        this.setState({
          user: res.data

        })
        // userProfile = this.state.user_id;
        console.log(this.state.user._id)
      }).then(() => {

        API.getUserProjects(this.state.user._id)
          .then(res => {
            console.log(res);
            this.setState({
              myprojects: res.data.populatedUser.map(projects => projects.projects.map(projects => projects))

            });
            console.log(this.state.myprojects);

          })
          .catch(err => console.log(err));
      })

      .catch(err => console.log(err));
  };

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
  //       })
  //   }).catch(err => console.log(err));
  // }



  // search all projects spits all the database projects  
  getAllSaved = () => {

    API.getdbProjects()
      .then(res => {
        console.log(res);
        this.setState({
          saved: res.data.search

        });
        console.log(this.state.saved);
        // console.log(this.state.saved._id);
      })
      .catch(err => console.log(err));
  };




  collabproject = () => {

    const gigster = {

      notifications: this.state.msg,
      userId: this.state.user,
      projectId: this.state.showId

    }

    console.log(gigster);


    API.collabProject(gigster)
      .then(res => {
        console.log(gigster);
        console.log(res);
        // window.location.href = "/dashboard";
      })
      .catch(err => console.log(err));
  };

  // gets you a users particular projects

  // getUserProjects = () => {

  //   // let user =  localStorage.getItem('user');

  //   console.log(this.state.user);

  //     API.getUserProjects(this.state.user._id)
  //       .then(res => {
  //         console.log(res);
  //         this.setState({
  //           myprojects: res.data.populatedUser.map(projects => projects.projects.map(projects => projects))

  //         });
  //         console.log(this.state.myprojects);

  //       })
  //       .catch(err => console.log(err));
  //   };

  dataChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const showItem = this.state.saved.find(item => item._id === this.state.showId);
    return (
      <div>
        <Navbar>
          <a className="navbar-brand">
            <h3>{this.state.user.username}</h3>
          </a>
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

                  {this.state.myprojects.length ? (
                    <Column>
                      {this.state.myprojects.map(myprojects => myprojects.map(projects => (
                        <Thumbnail>
                          <Image src={projects.imageUrl} thumbnail />
                          <h5>{projects.title}</h5>
                          <p>Location: {projects.location}</p>
                          <p>Description: {projects.description}</p>

                        </Thumbnail>
                      )))}
                    </Column>
                  )
                    : (<h3>No Projects</h3>)}

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
                          <Image src={saved.imageUrl} thumbnail />
                          <h5>{saved.title}</h5>
                          <p>Location: {saved.location}</p>
                          <p>Description: {saved.description}</p>
                          <Button onClick={() => this.handleShow(saved._id)}>Want to Collaborate?</Button>
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
          <Modal
            {...this.props}
            show={this.state.show}
            id={this.state.saved._id}
            onHide={this.handleHide}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">
                {showItem && <p key={showItem._id}>{showItem.title}</p>}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {showItem && <label key={showItem._id}>
                Send Message:
                <TextArea
                  value={this.state.msg}
                  onChange={this.dataChange.bind(this)}
                  name="msg"
                  placeholder="Description (Required 1000 Characters)"
                  required
                >
                </TextArea>
              </label>}
              <FormBtn onClick={() => this.collabproject()}>Submit</FormBtn>
              {/* {showItem && <div>
                <p key={showItem._id}>{showItem.description}</p>
                  {this.state.open ?
                    <label>
                      Send Message:
                      <TextArea
                      value={this.state.msg}
                      onChange={this.dataChange.bind(this)}
                      name="msg" 
                      placeholder="Description (Required 1000 Characters)" 
                      required
                      ></TextArea>
                    </label>
                    : null}
                <Button type="button" onClick={() => { this.collabproject() }}>Collaborate?</Button>
                {/* <Button type="button" onClick={() => this.handleShowRadioChange()}>Paid?</Button> {' '}
                <Button type="button" onClick={() => this.handleHideRadioChange()}>Not Paid?</Button> */}
              {/* <br></br>
                <br></br>

              </div>
              // } */}

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default Dashboard;