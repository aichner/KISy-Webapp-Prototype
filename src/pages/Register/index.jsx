import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import ReactPasswordStrength from 'react-password-strength';
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

  foo = () => {

  }
  
  render() {
    let test = this.props.location.state
    console.log(test);
    return (
      <MDBContainer className="mt-5">
        <MDBRow>
          <MDBCol md="6" className="m-auto text-center">
            <p>E-Mail: {test.email}<br />oAuth: { test.oAuth.toString() }</p>
            <ReactPasswordStrength
              className="customClass"
              style={{ display: 'none' }}
              minLength={5}
              minScore={2}
              scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
              changeCallback={this.foo}
              inputProps={{ name: "password_input", autoComplete: "off", className: "" }}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default RegisterPage;
