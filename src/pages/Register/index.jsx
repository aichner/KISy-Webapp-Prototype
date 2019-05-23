import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import FacebookLogin from 'react-facebook-login';
// Icons
// import { FaFacebook } from 'react-icons/fa';
// CSS
import "./login.scss";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  
  render() {
    let test = this.props.location.state
    console.log(test);
    return (
      <MDBContainer className="mt-5">
        <p>E-Mail: {test.email}<br />oAuth: { test.oAuth.toString() }</p>
      </MDBContainer>
    );
  }
}

export default RegisterPage;
