import React, { Component } from 'react';
import { Tabs, Tab, Thumbnail, Image, Grid, Row, Col, Modal, Button, ListGroup, ListGroupItem, Navbar, Nav, NavItem } from "react-bootstrap";
import "./Dashboard.css";
import Container from "../../components/Container";
import API from "../../utils/API";
import { FormBtn, TextArea } from "../../components/Form";
// import Navbar from "../../components/Navbar";
//import backimg from "../../images/dashboard-background.jpg";


class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.getUserObject = this.getUserObject.bind(this);
    this.collabproject = this.collabproject.bind(this);
    this.getAllSaved = this.getAllSaved.bind(this);
    this.handleShowUpdate = this.handleShowUpdate.bind(this);
    this.handleShowGigsters = this.handleShowGigsters.bind(this);
    this.handleGigHide = this.handleGigHide.bind(this);
    this.handleUpdateHide = this.handleUpdateHide.bind(this);

    this.state = {
      isAuthenticated: false,
      key: 1,
      show: false,
      showupdate: false,
      showgigsters: false,
      msg: '',
      myprojects: [],
      saved: [],
      showId: null,
      updateid: null,
      gigid: null,
      user: [],
      collaborojects: []
    };
  }

  componentWillMount() {
    this.getUserObject();

  }

  componentDidMount() {

    // this.getAllSaved();


  };

  getUserObject = () => {
    API.getUserObject()
      .then(res => {
        // console.log(res);
        if (localStorage === null) {
          localStorage.setItem('user', res);
        }

        var user = localStorage.getItem('user');
        this.setState({
          user: res.data
        })
        // userProfile = this.state.user_id;
        console.log(this.state.user._id)
      }).then(() => {
        let userId = this.state.user._id;
        API.getUserProjects(userId)
          .then(res => {
            console.log(res);
            this.setState({
              myprojects: res.data.populatedUser.map(projects => projects.projects.map(projects => projects))

            })
            console.log(this.state.myprojects);

          }).catch(err => console.log(err));
      }).then(() => {
        // console.log(this.state.user._id)
        this.getAllSaved(this.state.user._id);

      }).catch(err => console.log(err));
  };

  handleSelect(key) {
    this.setState({ key });
  }

  handleShow = (id) => {
    this.setState({ show: true, showId: id });
  }
  handleShowUpdate = (id) => {
    this.setState({ updateid: id, showupdate: true });
  }
  handleShowGigsters = (id) => {
    this.setState({ gigid: id, showgigsters: true });
  }

  handleHide = () => {
    this.setState({ show: false });
  }

  handleUpdateHide = () => {
    this.setState({ showupdate: false });
  }

  handleGigHide = () => {
    this.setState({ showgigsters: false });
  }

  // search all projects spits all the database projects  
  getAllSaved = (userId) => {
    console.log(userId)

    let id = userId.toString();

    console.log(id);
    API.getdbProjects()
      .then(res => {
        console.log(res.data.data);
        //  const response = res.filter(filteredObj =>  filteredObj);
        let response = res.data.data;

        console.log(response);


        let newArray = response.filter(obj => obj.userId !== id)

        console.log(newArray)

        this.setState({
          saved: newArray
        });
        //console.log(response);  
        console.log(this.state.user._id);
        //const response = res.data.search;


        console.log(res);
        console.log(this.state.saved);
      })
      .catch(err => console.log(err));
  };


  //collaboration projects
  collabproject = () => {
    console.log("response sent");
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
      })
      .catch(err => console.log(err));
  };

  dataChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const showItem = this.state.saved.find(item => item._id === this.state.showId);
    const showMyProject = this.state.myprojects.map(myprojects => myprojects.filter(myprojects => myprojects._id === this.state.updateid))
    //const showRequests = this.state.myprojects.map(myprojects => myprojects.find(myprojects => myprojects._id === this.state.showId))
    //console.log(this.state.updateid)

    
    
    
    
    this.state.myprojects.forEach(myprojects => {

      console.log(myprojects);

      myprojects.forEach(myproject => {

        console.log(myproject.title);
        

        if (myproject._id === this.state.updateid) {

         
          console.log("test " + myproject.title);

        }

        

        
      })

      
    
    }

    );

   
    // myprojects.find(myprojects => myprojects._id == this.state.updateid));


    console.log(showMyProject)

    console.log(showMyProject.map(project => project.map(project => project.title)));


    return (
      <div>
        {!this.state.isAuthenticated ?
          (<Navbar inverse collapseOnSelect className="navbar">
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/dashboard" style={{ color: "white", textDecoration: "none" }}>Welcome, {this.state.user.username}</a>
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
          </Navbar>) :
          (
            window.location.href("/")
          )}

        <div className="dashboard-style">
          <Container>
            <Tabs
              activeKey={this.state.key}
              onSelect={this.handleSelect}
              id="controlled-tab-example"
              className="tab-style"
            >
              <Tab eventKey={1} title="My Projects">
                <Grid>
                  <br></br>
                  <Row>
                    {this.state.myprojects.length ? (

                      <div className="flexContainer">
                        {this.state.myprojects.map(myprojects => myprojects.map(myprojects => (
                          <Thumbnail className="flexThumbnail">
                            <Image src={myprojects.imageUrl} thumbnail />
                            <h5>{myprojects.title}</h5>
                            <p>Location: {myprojects.location}</p>
                            <p>Description: {myprojects.description}</p>
                            <Button type="button" onClick={() => this.handleShowUpdate(myprojects._id)} style={{ float: "left" }}>Update</Button>
                            <Button type="button" style={{ float: "right" }}>Delete</Button>
                            <br></br>
                            <br></br>
                            <Button type="button" onClick={() => this.handleShowGigsters(myprojects._id)}>Requests From Collaborations</Button>
                          </Thumbnail>
                        )))}

                      </div>


                    ) : (<h3>No Projects</h3>)}
                  </Row>
                </Grid>
              </Tab>
              <Tab eventKey={2} title="My Collaborations">
                <Grid>
                  <Row>
                    <h3>No Projects</h3>
                  </Row>
                </Grid>
              </Tab>
              <Tab eventKey={3} title="Other Projects">
                <Grid>
                  <Row>
                    {this.state.saved.length ? (
                      <div className="flexContainer">

                        {this.state.saved.map((saved) => (
                          <Thumbnail className="flexThumbnail">
                            <Image src={saved.imageUrl} thumbnail />
                            <h5>{saved.title}</h5>
                            <p>Location: {saved.location}</p>
                            <p>Description: {saved.description}</p>
                            <Button onClick={() => this.handleShow(saved._id)}>Want to Collaborate?</Button>
                          </Thumbnail>
                        ))}
                      </div>
                    ) : (
                        <h3>No projects </h3>
                      )}
                  </Row>
                </Grid>
              </Tab>
            </Tabs>
            {/* all projects AKA MODEL 1 */}

            <Modal
              {...this.props}
              // this activates it to show based if show = true in the state
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
                    placeholder="Your Message Goes Here"
                    required
                  >
                  </TextArea>
                </label>}
                <FormBtn onClick={() => this.collabproject()}>Submit</FormBtn>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleHide}>Close</Button>
              </Modal.Footer>
            </Modal>

            {/* //render myproject to update */}

            <Modal
              {...this.props}
              show={this.state.showupdate}
              id={this.state.myprojects._id}
              onHide={this.handleUpdateHide}
              dialogClassName="custom-modal"
            >
              <Modal.Header closeButton>
                {showMyProject.map(project => project.map(project => 
                  <Modal.Title id="contained-modal-title-lg">

                    {showMyProject && <p key={project._id}>{project.title}</p>}
                  </Modal.Title>
                ))}
              </Modal.Header>
              <Modal.Body>
                {showMyProject && <label key={showMyProject._id}>
                  Send Message:
                <TextArea
                    value={this.state.msg}
                    onChange={this.dataChange.bind(this)}
                    name="msg"
                    placeholder="Your Message Goes Here"
                    required
                  >
                  </TextArea>
                </label>}
                <FormBtn>Submit</FormBtn>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleUpdateHide}>Close</Button>
              </Modal.Footer>
            </Modal> */}

            {/* check gigter request */}
            <Modal
              {...this.props}
              show={this.state.showgigsters}
              id={this.state.myprojects._id}
              onHide={this.handleGigHide}
              dialogClassName="custom-modal"
              className="model-2"
            >
              <Modal.Header closeButton>

                <Modal.Title id="contained-modal-title-lg">
                  {showMyProject && <p key={showMyProject._id}>{showMyProject.title}</p>}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {showMyProject && <label key={showMyProject._id}>

                  List of Gigster's
                <ListGroup>
                    <ListGroupItem>
                      Hi I am Jaspreet Kaur
                    <span><Button type="button">Approve</Button>
                        <Button type="button">Decline</Button></span>
                    </ListGroupItem>
                  </ListGroup>
                </label>
                }

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleGigHide}>Close</Button>
              </Modal.Footer>
            </Modal>

          </Container>
        </div>
      </div>
    );
  }
}

export default Dashboard;