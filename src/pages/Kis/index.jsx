import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBAlert, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBNavLink, MDBNavItem, MDBTabContent, MDBTabPane, MDBNav, MDBProgress } from "mdbreact";
import { Radar } from "react-chartjs-2";
// Components
// import Confetti from '../../components/Confetti';
import Image from '../../components/atoms/Image';

// CSS
import "./kis.scss";

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
      dataRadar: {
        labels: ["Website", "Social Media", "Branding", "Filme", "Logo", "Public Relations"],
        datasets: [
          {
            label: "Dein Unternehmen",
            backgroundColor: "rgba(60, 130, 255, 0.5)",
            boderColor: "rgb(60, 130, 255)",
            data: [32, 10, 50, 30, 40, 20]
          },
          {
            label: "KELAG",
            backgroundColor: "rgba(0, 200, 0, 0.2)",
            boderColor: "rgb(0, 200, 0)",
            data: [90, 100, 90, 90, 80, 95]
          }
        ]
      }
    }
  }

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

    // Check for time and set greeting accordingly
    switch(true){
      case (hour >= 0 && hour < 4):
        greeting = "Geh schlafen";
        break;
      case (hour >= 4 && hour < 9):
        greeting = "Guten Morgen";
        break;
      case (hour >= 9 && hour < 12):
        greeting = "Schönen Vormittag";
        break;
      case (hour >= 12 && hour < 13):
        greeting = "Mahlzeit";
        break;
      case (hour >= 13 && hour < 17):
        greeting = "Schönen Nachmittag"
        break;
      case (hour >= 17 && hour < 23):
        greeting = "Guten Abend";
        break;
      default:
        greeting = "Hallo";
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
    return message;
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
        <Image className="banner" />
          <div className="greeting text-center py-3">
            <h2>{this.state.greeting}</h2>
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
                  Übersicht
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  className={this.state.activeItemClassicTabs1 === "2" ? "font-weight-bold active blue-text" : "font-weight-bold"}
                  onClick={this.toggleClassicTabs1("2")}
                >
                  Aufträge
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  className={this.state.activeItemClassicTabs1 === "3" ? "font-weight-bold active blue-text" : "font-weight-bold"}
                  onClick={this.toggleClassicTabs1("3")}
                >
                  Statistik
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  className={this.state.activeItemClassicTabs1 === "4" ? "font-weight-bold active blue-text" : "font-weight-bold"}
                  onClick={this.toggleClassicTabs1("4")}
                >
                  Meine Daten
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBTabContent
              activeItem={this.state.activeItemClassicTabs1}
              className="pt-3"
            >
              <MDBTabPane tabId="1">
                <MDBRow className="text-center">
                  <MDBCol md="6">
                    <Radar data={this.state.dataRadar} options={{ responsive: true }} />
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
                        <MDBBtn color="primary" size="md">
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
                        <MDBBtn color="primary" size="md">
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
                        <MDBBtn color="primary" size="md">
                          read more
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
                  Quisquam aperiam, pariatur. Tempora, placeat ratione
                  porro voluptate odit minima. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Nihil odit magnam minima,
                  soluta doloribus reiciendis molestiae placeat unde eos
                  molestias.
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
