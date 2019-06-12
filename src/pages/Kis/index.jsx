import React, { Component } from "react";
import { MDBContainer, MDBNavLink, MDBNavItem, MDBTabContent, MDBNav, MDBIcon } from "mdbreact";
// Components
// import Confetti from '../../components/molecules/Confetti';

// molecules
import Tab from "../../components/molecules/Tab"

// organisms
import { Dashboard, Orders, Statistics, Data } from "../../components/organisms/Tabs"

// CSS
import "./kis.scss";
import "./images.scss";

// Perks
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

  toggleClassicTabs1 = tab => e => {
    if (this.state.activeItemClassicTabs1 !== tab) {
      this.setState({
        activeItemClassicTabs1: tab
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
                <Tab tabId="1">
                    <Dashboard c_perks_average={c_perks_average} c_perks={c_perks} c_compare={c_compare} />
                </Tab>
              <Tab tabId="2">
                <Orders/>
              </Tab>
              <Tab tabId="3">
                <Statistics c_perks={c_perks} c_compare={c_compare} />
              </Tab>
              <Tab tabId="4">
                <Data/>
              </Tab>
            </MDBTabContent>
          </div>
        </MDBContainer>
      </div>
    );
  }
}

export default KISPage;
