import React, { Component } from "react";
// Apollo
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
// MDB
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBFooter, MDBNavItem, MDBNavLink } from "mdbreact";
import logo from './assets/logo_h50.png';
// Router
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

import './style.scss';

export const APIHost = 'https://kys.erebos.xyz';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [], // no types provided - works
    },
  },
});

const cache = new InMemoryCache({ fragmentMatcher });

const APILink = APIHost+"/api/graphql";

// console.log(APILink);

// Apollo client setup
const client = new ApolloClient({
  cache,
  link: new HttpLink({ uri: APILink })
});


class App extends Component {

  state={
    collapseID: ""
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () =>
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });

  render() {

    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );

    const { collapseID } = this.state;

    return (
      <ApolloProvider client={client}>
      <Router>
        <div className="flyout">
          <MDBNavbar color="white" light expand="md" fixed="top" scrolling>
            
            <MDBNavbarToggler onClick={this.toggleCollapse("mainNavbarCollapse")} />
            <MDBCollapse
              id="mainNavbarCollapse"
              isOpen={this.state.collapseID}
              navbar
            >
            
              <MDBNavbarNav center>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/test"
                  >
                    Test Link
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavbarBrand className="ml-2 mr-2" href="/">
                    <img src={logo} alt="Company logo" className="img-fluid"/>
                  </MDBNavbarBrand>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/test"
                  >
                    Test Link
                  </MDBNavLink>
                </MDBNavItem>
                {/*<MDBNavItem>
                  <MDBNavLink
                    exact
                    to="/"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    Home
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/css"
                  >
                    CSS
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/components"
                  >
                    Components
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/advanced"
                  >
                    Advanced
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/navigation"
                  >
                    Navigation
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/forms"
                  >
                    Forms
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/tables"
                  >
                    Tables
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/modals"
                  >
                    Modals
                  </MDBNavLink>
                </MDBNavItem>*/}
                {/* PRO-START 
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/sections"
                  >
                    Sections
                  </MDBNavLink>
                </MDBNavItem>
                {/* PRO-END */}
              </MDBNavbarNav>
            </MDBCollapse>
            
          </MDBNavbar>
          {collapseID && overlay}
          <main style={{ marginTop: "4rem" }}>
            <Routes />
          </main>
          <MDBFooter color="blue">
            <p className="footer-copyright mb-0 py-3 text-center">
              &copy; 2017 - {new Date().getFullYear()} Copyright: Christian Aichner
            </p>
          </MDBFooter>
        </div>
      </Router>
      </ApolloProvider>
    );
  }
}

export default App;
