import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBAlert, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBNavLink, MDBNavItem, MDBTabContent, MDBTabPane, MDBNav, MDBProgress, MDBBadge, MDBListGroup, MDBListGroupItem, MDBIcon, MDBTooltip } from "mdbreact";
// Score Radar chart
import ScoreChart from "../../components/molecules/ScoreChart"
// Components
// import Confetti from '../../components/Confetti';

// CSS
import "./kis.scss";
import "./images.scss";

const c_perks_average = 80;
const c_perks = [87, 50, 65, 78, 30, 15];
const c_compare = [
  [20,20,20,20,20,20],
  [10,10,10,10,10,10]
]

class KISPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      personalisation: this.getPersonalisationState(),
      first_name: this.getFirstNameState(),
      last_name: this.getLastNameState(),
      greeting: this.getGreeting(),
      activeItem: "1",
      activeItemPills: "1",
      activeItemVerticalPills: "1",
      activeItemOuterTabs: "1",
      activeItemInnerPills: "1",
      activeItemClassicTabs1: "1",
      activeItemClassicTabs2: "1",
    }
  }

  // Start: Generic functions
  calculateScore = () => {
    let sum = 0;
    for (var i = 0; i < c_perks.length; i++) {
      sum += c_perks[i]
    }
    return Math.round(sum / c_perks.length);
  }
  
  // End: Generic functions

  getPersonalisationState = () => {
    if(this.props.location.state !== undefined){
      if(this.props.location.state.personalisation !== undefined){
        return this.props.location.state.personalisation
      }
    }
  }

  getFirstNameState = () => {
    if(this.props.location.state !== undefined){
      if(this.props.location.state.first_name !== undefined){
        return this.props.location.state.first_name
      }
    }
  }

  getLastNameState = () => {
    if(this.props.location.state !== undefined){
      if(this.props.location.state.last_name !== undefined){
        return this.props.location.state.last_name
      }
    }
  }

  getGreeting = () => {
    // Get date
    const date = new Date();
    const hour = date.getHours()

    // Set default values
    let greeting = "Guten Tag";
    let name = undefined;
    let message = "";
    let image = "";
    let random = Math.floor(Math.random() * 3) + 1;

    // Check for time and set greeting accordingly
    switch(true){
      case (hour >= 0 && hour < 4):
        greeting = "Geh schlafen";
        image = "img-night"+random;
        break;
      case (hour >= 4 && hour < 9):
        greeting = "Guten Morgen";
        image = "img-morning"+random;
        break;
      case (hour >= 9 && hour < 12):
        greeting = "Schönen Vormittag";
        image = "img-midmorning"+random;
        break;
      case (hour >= 12 && hour < 13):
        greeting = "Mahlzeit";
        image = "img-midday"+random;
        break;
      case (hour >= 13 && hour < 17):
        greeting = "Schönen Nachmittag"
        image = "img-afternoon"+random;
        break;
      case (hour >= 17 && hour < 23):
        greeting = "Guten Abend";
        image = "img-evening"+random;
        break;
      default:
        greeting = "Hallo";
        image = "img-night"+random;;
    }

    // Check if the person wants an informal greeting
    if(this.props.location.state.personalisation.informal){
      name = this.props.location.state.first_name;
    } else {
      name = this.props.location.state.personalisation.sex + " " + this.props.location.state.last_name;
    }

    // Check if values are set
    if(greeting !== "" && name !== undefined){
      // ... build message in the form "<greeting>, <Herr>/<Frau> <Vorname>/<Nachname>!"
      message = greeting + ", " + name + "!";
    } else {
      // ... if not, display a default message
      message = "Hallo!";
    }
    // Sets greeting state
    return {msg: message, img: "banner "+image};
  }

   toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  }

  togglePills = tab => e => {
    if (this.state.activePills !== tab) {
      this.setState({
        activeItemPills: tab
      });
    }
  }

  toggleVerticalPills = tab => e => {
    if (this.state.activeItem3 !== tab) {
      this.setState({
        activeItemVerticalPills: tab
      });
    }
  }
  toggleClassicTabs1 = tab => e => {
    if (this.state.activeItemClassicTabs1 !== tab) {
      this.setState({
        activeItemClassicTabs1: tab
      });
    }
  }

  toggleClassicTabs2 = tab => e => {
    if (this.state.activeItemClassicTabs2 !== tab) {
      this.setState({
        activeItemClassicTabs2: tab
      });
    }
  }

  toggleOuterTabs = tab => e => {
    if (this.state.activeItemOuterTabs2 !== tab) {
      this.setState({
        activeItemOuterTabs: tab
      });
    }
  }

  toggleInnerPills = tab => e => {
    if (this.state.activeItemInnerPills !== tab) {
      this.setState({
        activeItemInnerPills: tab
      });
    }
  }
  
  render() {
    return (
      <div className="kis">
        <div className={this.state.greeting.img} ></div>
          <div className="greeting text-center py-3">
            <h2>{this.state.greeting.msg}</h2>
          </div>
          <MDBContainer>
          <div className="classic-tabs">
            <MDBNav classicTabs color="white">
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  className={this.state.activeItemClassicTabs1 === "1" ? "font-weight-bold active blue-text" : "font-weight-bold"}
                  onClick={this.toggleClassicTabs1("1")}
                >
                  <MDBIcon icon="columns" className="pr-2" />Übersicht
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  className={this.state.activeItemClassicTabs1 === "2" ? "font-weight-bold active blue-text" : "font-weight-bold"}
                  onClick={this.toggleClassicTabs1("2")}
                >
                  <MDBIcon icon="list-ul" className="pr-2" />Aufträge
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  className={this.state.activeItemClassicTabs1 === "3" ? "font-weight-bold active blue-text" : "font-weight-bold"}
                  onClick={this.toggleClassicTabs1("3")}
                >
                  <MDBIcon icon="chart-line" className="pr-2" />Statistik
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  className={this.state.activeItemClassicTabs1 === "4" ? "font-weight-bold active blue-text" : "font-weight-bold"}
                  onClick={this.toggleClassicTabs1("4")}
                >
                  <MDBIcon far icon="user" className="pr-2" />Meine Daten
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBTabContent
              activeItem={this.state.activeItemClassicTabs1}
              className="pt-3"
            >
              <MDBTabPane tabId="1">
                <MDBRow className="text-center">
                  <MDBCol md="6" className="score-board">
                    <ScoreChart perks={c_perks} compare={c_compare}/>
                    <h3 className="mt-3">Dein Score: {this.calculateScore()}</h3>
                    {this.calculateScore() > c_perks_average ? (
                      <div>
                        <p className="lead"><MDBBadge color="success">Besser als der Durchschnitt</MDBBadge></p>
                        <MDBProgress value={this.calculateScore()} color="success" />
                      </div>
                    ) : (
                      <div>
                        <p className="lead"><MDBBadge color="danger">Schlechter als der Durchschnitt</MDBBadge></p>
                        <MDBProgress value={this.calculateScore()} color="danger" />
                      </div>
                    )}
                    
                   
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBAlert color="success" dismiss onClose={()=> alert('This event fires immediately when the close instance method is called.')} onClosed={()=> alert('This event is fired when the alert has been closed (will wait for CSS transitions to complete).')}>
                      Eine neue Videovorschau ist verfügbar!
                    </MDBAlert>
                    <MDBAlert color="info" className="text-left">
                    <h4 className="alert-heading">Well done!</h4>
                      Achievement
                      <hr />
                      <p className="mb-0">Belohnung: 50€</p>
                      <MDBProgress material  color="info" value={70} />
                    </MDBAlert>
                  </MDBCol>
                  <MDBCol md="4" className="py-4">
                    <MDBCard>
                      <MDBCardBody>
                        <MDBCardTitle tag="h5">Panel title</MDBCardTitle>
                        <MDBCardText>
                          Some quick example text to build on the card title and make up
                          the bulk of the card's content.
                        </MDBCardText>
                        <MDBBtn color="blue" size="md">
                          read more
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol md="4" className="py-4">
                    <MDBCard>
                      <MDBCardBody>
                        <MDBCardTitle tag="h5">Panel title</MDBCardTitle>
                        <MDBCardText>
                          Some quick example text to build on the card title and make up
                          the bulk of the card's content.
                        </MDBCardText>
                        <MDBBtn color="blue" size="md">
                          read more
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol md="4" className="py-4">
                    <MDBCard>
                      <MDBCardBody className="orders">
                        <MDBCardTitle tag="h5">Ihre Aufträge</MDBCardTitle>
                          <MDBListGroup className="my-4">
                            <MDBListGroupItem hover className="d-flex justify-content-between align-items-center text-left">
                              <div>
                                <p className="my-0">Digital Day Videoproduktion</p>
                                <small className="text-muted">RE-2018-0016</small>
                              </div>
                              <span className="order-info">
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="eye" /></span>
                                  <span>Details anzeigen</span>
                                </MDBTooltip>
                                <div className="spacer"></div>
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="file-invoice-dollar" /></span>
                                  <span>Rechnung herunterladen (PDF)</span>
                                </MDBTooltip>
                                <div className="spacer"></div>
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="dollar-sign" color="red" /></span>
                                  <span>Rechnung bezahlen</span>
                                </MDBTooltip>
                              </span>
                            </MDBListGroupItem>
                            <MDBListGroupItem hover className="d-flex justify-content-between align-items-center text-left">
                              <div>
                                <p className="my-0">Kraftwerk Schütt Videoproduktion</p>
                                <small className="text-muted">RE-2018-0015</small>
                              </div>
                              <span className="order-info">
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="eye" /></span>
                                  <span>Details anzeigen</span>
                                </MDBTooltip>
                                <div className="spacer"></div>
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="file-invoice-dollar" /></span>
                                  <span>Rechnung herunterladen (PDF)</span>
                                </MDBTooltip>
                                <div className="spacer"></div>
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="dollar-sign" color="red" /></span>
                                  <span>Rechnung bezahlen</span>
                                </MDBTooltip>
                              </span>
                            </MDBListGroupItem>
                            <MDBListGroupItem hover className="d-flex justify-content-between align-items-center text-left">
                              <div>
                                <p className="my-0">Große KELAG Videoproduktion</p>
                                <small className="text-muted">RE-2018-0014</small>
                              </div>
                              <span className="order-info">
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="eye" /></span>
                                  <span>Details anzeigen</span>
                                </MDBTooltip>
                                <div className="spacer"></div>
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="file-invoice-dollar" /></span>
                                  <span>Rechnung herunterladen (PDF)</span>
                                </MDBTooltip>
                              </span>
                            </MDBListGroupItem>
                          </MDBListGroup>
                        <MDBBtn color="blue" size="md" onClick={this.toggleClassicTabs1("2")}>
                          Alle Aufträge anzeigen
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBTabPane>
              <MDBTabPane tabId="2">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Nihil odit magnam minima, soluta doloribus
                  reiciendis molestiae placeat unde eos molestias.
                  Quisquam aperiam, pariatur. Tempora, placeat ratione
                  porro voluptate odit minima.
                </p>
              </MDBTabPane>
              <MDBTabPane tabId="3">
                <p>
                  <ScoreChart perks={c_perks} compare={c_compare}/>
                </p>
              </MDBTabPane>
              <MDBTabPane tabId="4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Nihil odit magnam minima, soluta doloribus
                  reiciendis molestiae placeat unde eos molestias.
                  Quisquam aperiam, pariatur. Tempora, placeat ratione
                  porro voluptate odit minima.
                </p>
              </MDBTabPane>
            </MDBTabContent>
          </div>
        </MDBContainer>
      </div>
    );
  }
}

export default KISPage;
