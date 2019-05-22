import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import FacebookLogin from 'react-facebook-login';
// Icons
import { FaFacebook } from 'react-icons/fa';
// CSS
import "./login.scss";

class LoginPage extends Component {
  state = {
    email: undefined,
    password: undefined
  }
 
responseFacebook = (response) => {
  console.log(response);
}
  render() {
    return (
      <MDBContainer className="mt-5">
        <MDBRow>
          <MDBCol md="6" className="m-auto text-center">
            <form>
              <p className="h4 text-center mb-4">Login</p>
              <div className="oAuth">
                <FacebookLogin
                  appId="2526621870704174"
                  autoLoad={false}
                  icon={<FaFacebook/>}
                  cssClass="btn-facebook kep-login-facebook kep-login-facebook-medium"
                  fields="name,first_name,last_name,email,picture"
                  textButton="Weiter mit Facebook"
                  callback={this.responseFacebook} />
              </div>
              <div className="w-100">
                  <div className="splitter my-4"><span className="or"><span className="or-text">oder</span></span></div>
              </div>
              <div className="text-left">
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="defaultFormLoginEmailEx"
                  className="form-control"
                />
                <br />
                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                  Passwort
                </label>
                <input
                  type="password"
                  id="defaultFormLoginPasswordEx"
                  className="form-control"
                />
              </div>
              <div className="text-center mt-4">
                <MDBBtn
                  color="grey"
                  rounded
                  type="button"
                  className="z-depth-1a"
                >
                  Log in
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
        <hr className="my-5" />
      </MDBContainer>
    );
  }
}

export default LoginPage;
