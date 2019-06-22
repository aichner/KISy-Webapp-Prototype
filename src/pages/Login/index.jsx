import React, { Component } from "react";
import { Link } from "react-router-dom";
// Apollo
import { graphql } from 'react-apollo';
import { gql } from "apollo-boost";
// MDB
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import FacebookLogin from 'react-facebook-login';
// Icons
// import { FaFacebook } from 'react-icons/fa';
// CSS
import "./login.scss";

const LOGIN_USER_MUTATION = gql`
  mutation gettoken(
    $username: String!
    $password: String!
  ) {
    tokenAuth(
      username: $username
      password: $password
    ){
      token
    }
  }
`;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      oAuth: false,
      fb_data: undefined,
      status: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  responseFacebook = (response) => {
    let name = response.name;
    let first_name = response.first_name;
    let last_name = response.last_name;
    let email = response.email;
    let accessToken = response.accessToken;
    let picture = response.picture.data.url;

    let facebook_data = {
      name, first_name, last_name, email, accessToken, picture
    }

    this.setState(
      { oAuth: true, fb_data: facebook_data },
      () => {this.gotoRegistration(true)
    });

    // Missing: Check if user exists
    // If not: Save all data to DB and continue to registration process
    // If yes: Proceed to KIS user area
  }

  handleChange(event) {
    // Get the name of the input field
    let field = event.target.name;
    // Save the current value into the desired state
    this.setState({[field]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    event.target.className += " was-validated";
    
    this.checkInputs();
  }

  checkInputs = () => {
    console.log(this.state);

    let error = false;
    let u = this.state.username;
    let p = this.state.password;

    if (!error) {
      this.sendForm(u, p);
    }
  }

  sendForm = (u, p) => {
    this.setState({oAuth: false});
    console.log("Username: "+u+" Password: "+p);

    // Send data to server

    // Check if user exists
    // If not: Show dialog that asks if the user wants to create a new user using the provided username and password
    // this.gotoRegistration();
    // If yes: Proceed to KIS user area
    // this.gotoKIS();
    this.sendData();
  }

  gotoKIS = (id) => {
    this.props.history.push('/kis', { customerID: id });
  }

  gotoRegistration = (oAuth) => {
    if(this.state.oAuth){
      this.props.history.push('/register', { username: this.state.username, oAuth: true, fb_data: this.state.fb_data });
    } else {
      this.props.history.push('/register', { username: this.state.username, oAuth: false });
    }
  }

  forgotPassword = () => {
    if(this.state.username !== undefined && this.state.username !== ""){
      this.props.history.push('/forgot', { username: this.state.username });
    } else {
      this.props.history.push('/forgot');
    }
  }

  sendData = async () => {
    this.props.mutate({
      variables: {"username": this.state.username, "password": this.state.password}
    })
    .then(({ loading, data }) => {

      if(data.tokenAuth.__typename === "ObtainJSONWebToken" && data.tokenAuth.token !== ""){
        this.gotoKIS(data.tokenAuth.token);
      } else {
        console.log("Nope");
      }
    }).catch((loading, error) => {
      
      console.warn('there was an error sending the query', error);
    });
  };

  render() {
    return (
      <MDBContainer className="mt-5">
        <MDBRow>
          <MDBCol md="6" className="m-auto text-center">
            
              <p className="h4 text-center mb-4">Login</p>
              <div className="oAuth">
                <FacebookLogin
                  appId="2526621870704174"
                  autoLoad={false}
                  //icon={<FaFacebook/>}
                  cssClass="btn-facebook kep-login-facebook kep-login-facebook-medium"
                  fields="name, first_name,last_name,email,picture"
                  textButton="Weiter mit Facebook"
                  callback={this.responseFacebook} />
              </div>
              <div className="w-100">
                  <div className="splitter my-4"><span className="or"><span className="or-text">oder</span></span></div>
              </div>
              <form
                className="needs-validation"
                onSubmit={this.handleSubmit}
                noValidate
              >
              <div className="text-left">
                <div>
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="defaultFormLoginEmailEx"
                    className="form-control"
                    onChange={ this.handleChange }
                    value={ this.state.username }
                    required
                  />
                  <div style={{ top: "auto" }} className="invalid-tooltip">
                    Bitte geben Sie einen gültigen Username ein
                  </div>
                </div>
                <br />
                <div>
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
                    required
                  />
                  <div style={{ top: "auto" }} className="invalid-tooltip">
                    Bitte geben Sie Ihr Passwort ein
                  </div>
                  <div className="text-right text-muted">
                    <span onClick={ this.forgotPassword }>Passwort vergessen?</span>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <MDBBtn
                  type="submit"
                  color="primary"
                  rounded
                  icon="lock"
                  className="z-depth-1a"
                >
                  Log in
                </MDBBtn>
              </div>
            </form>
            <div className="text-muted mt-4">
              <p>Noch keinen Benutzer? <Link to={`/register`}>Registrieren</Link> Sie sich jetzt!</p>
            </div>

          </MDBCol>
        </MDBRow>
        <hr className="my-5" />
      </MDBContainer>
    );
  }
}

export default graphql(LOGIN_USER_MUTATION)(LoginPage);
