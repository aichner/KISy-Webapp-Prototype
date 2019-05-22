import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import FacebookLogin from 'react-facebook-login';
// Icons
import { FaFacebook } from 'react-icons/fa';
// CSS
import "./login.scss";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
 
  responseFacebook = (response) => {
    console.log(response);

    let name = response.name;
    let first_name = response.first_name;
    let last_name = response.last_name;
    let email = response.email;
    let accessToken = response.accessToken;
    let picture = response.picture.data.url;

    let facebook_data = {
      name, first_name, last_name, email, accessToken, picture
    }
    console.log(facebook_data);
    // Save all data to DB and continue
  }

  handleChange(event) {
    // Get the name of the input field
    let field = event.target.name;
    // Save the current value into the desired state
    this.setState({[field]: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
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
                  name="email"
                  id="defaultFormLoginEmailEx"
                  className="form-control"
                  onChange={ this.handleChange }
                  value={ this.state.email }
                />
                <br />
                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                  Passwort
                </label>
                <input
                  type="password"
                  name="password"
                  id="defaultFormLoginPasswordEx"
                  className="form-control"
                  onChange={ this.handleChange }
                  value={ this.state.password }
                />
              </div>
              <div className="text-center mt-4">
                <MDBBtn
                  color="grey"
                  rounded
                  type="button"
                  className="z-depth-1a"
                  onClick={ this.handleSubmit }
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
