import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBStepper, MDBStep } from "mdbreact";
import ReactPasswordStrength from 'react-password-strength';
// Icons
// import { FaFacebook } from 'react-icons/fa';
// CSS
import "./register.scss";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      formActivePanel1: 1,
      formActivePanel1Changed: false,
      formActivePanel2: 1,
      formActivePanel2Changed: false,
      formActivePanel3: 1,
      formActivePanel3Changed: false,
      first_name: "",
      last_name: "",
      email: undefined,
      company: { isCompany: false, vatNumber: "", vatCountryCode:  "",  },
      passwordtemp: "",
      passwordrepeat: "",
      password: { valid: false, value: "", score: undefined }

    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  handlePasswordChange = (event) => {
    this.setState({passwordtemp: event}, () => this.validatePassword());
    
  }

  repeatPassword = (event) => {
    this.setState({passwordrepeat: event.target.value}, () => this.validatePassword());
    
  } 

  validatePassword = () => {
    if(this.state.passwordtemp != "" && this.state.passwordtemp != undefined && this.state.passwordrepeat != "" && this.state.passwordrepeat != undefined){
      if(this.state.passwordtemp.password === this.state.passwordrepeat){
        this.setState(prevState => ({
          password: {
            ...prevState.password,
            value: this.state.passwordtemp.password,
            valid: true,
            score: this.state.passwordtemp.score
          },
        }));
        // Show success
        //event.target.className += " is-valid";
      } else {
        this.setState(prevState => ({
          password: {
            ...prevState.password,
            value: "",
            valid: false,
            score: undefined
          },
        }));
      }
    }
  }

  handleChange(event) {
    // Get the name of the input field
    let field = event.target.name;
    // Save the current value into the desired state
    this.setState({[field]: event.target.value});
  }

  swapFormActive = a => param => e => {
    this.setState({
      ["formActivePanel" + a]: param,
      ["formActivePanel" + a + "Changed"]: true
    });
  };

  handleNextPrevClick = a => param => e => {
    this.setState({
      ["formActivePanel" + a]: param,
      ["formActivePanel" + a + "Changed"]: true
    });
  };

  handleSubmission = () => {
    alert("Form submitted!");
  };

  calculateAutofocus = a => {
    if (this.state["formActivePanel" + a + "Changed"]) {
      return true;
    }
  };

  // Get values from login
  getEmail = () => {
    if(this.state.email === undefined){
        if(this.props.location.state.email !== "" || this.props.location.state.email !== undefined || this.props.location.state.email !== null){
        return this.props.location.state.email;
      } else {
        return "";
      }
    } else {
      return this.state.email;
    }
    
  }


  foo = () => {

  }

  validateVAT = (input) => {
    let validate = require('validate-vat');

    let countrycode = input.substring(0,2);
    let vatnumber = input.substring(2);

    validate( countrycode,  vatnumber,  function(err, validationInfo) {
        console.log(err);
        console.log(validationInfo);
    });
  }
  
  render() {
    let test = this.props.location.state
    console.log(test);
    console.log(this.state);
    return (
      <MDBContainer className="mt-5">
            <h2 className="text-center font-weight-bold pt-4 pb-5 mb-2">
              <strong>Nur noch wenige Schritte!</strong>
            </h2>
            <MDBStepper icon>
              <MDBStep
                icon="folder-open"
                stepName="Basic Information"
                onClick={this.swapFormActive(2)(1)}
              />
              <MDBStep
                icon="pencil-alt"
                stepName="Personal Data"
                onClick={this.swapFormActive(2)(2)}
              />
              <MDBStep
                icon="image"
                stepName="Terms and Conditions"
                onClick={this.swapFormActive(2)(3)}
              />
              <MDBStep
                icon="check"
                stepName="Finish"
                onClick={this.swapFormActive(2)(4)}
              />
            </MDBStepper>

            <form action="" method="post">
              <MDBRow>
                {this.state.formActivePanel2 === 1 && (
                  <MDBCol md="6" className="m-auto">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>Allgemeine Informationen</strong>
                    </h3>
                      <div className="form-group">
                        <label htmlFor="formGroupExampleInput">E-Mail</label>
                        <input
                          value={ this.getEmail() }
                          type="email"
                          name="email"
                          className="form-control"
                          autoFocus={this.calculateAutofocus(2)}
                          onChange={ this.handleChange }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Vorname</label>
                        <input
                          value={ this.state.first_name }
                          type="text"
                          name="first_name"
                          className="form-control"
                          onChange={ this.handleChange }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Nachname</label>
                        <input
                          value={ this.state.last_name }
                          type="text"
                          name="last_name"
                          className="form-control"
                          onChange={ this.handleChange }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="formGroupPasswordTemp">Passwort</label>
                        <ReactPasswordStrength
                          minLength={5}
                          minScore={2}
                          scoreWords={['schwach', 'okay', 'gut', 'stark', 'sehr stark']}
                          tooShortWord="zu schwach"
                          changeCallback={ this.handlePasswordChange }
                          value = { this.state.password_temp }
                          inputProps={{ name: "password_temp", autoComplete: "off", className: "" }}
                        />
                      </div>
                       <div className="form-group">
                        <label htmlFor="formGroupPasswordRepeat">Passwort wiederholen</label>
                        <input
                          value={ this.state.password_repeat }
                          type="password"
                          name="password_repeat"
                          className= { this.state.password.valid ? 'form-control is-valid' : 'form-control' }
                          onChange={ this.repeatPassword }
                        />
                      </div>

                      <MDBBtn
                        color="mdb-color"
                        rounded
                        className="float-right"
                        onClick={this.handleNextPrevClick(2)(2)}
                      >
                        next
                      </MDBBtn>
                 
                  </MDBCol>
                )}
                {this.state.formActivePanel2 === 2 && (
                  <MDBCol md="12">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>Personal Data</strong>
                    </h3>
                    <MDBInput
                      label="First Name"
                      className="mt-3"
                      autoFocus={this.calculateAutofocus(2)}
                    />
                    <MDBInput label="Second Name" className="mt-3" />
                    <MDBInput label="Surname" className="mt-3" />
                    <MDBInput label="Address" type="textarea" rows="2" />
                    <MDBBtn
                      color="mdb-color"
                      rounded
                      className="float-left"
                      onClick={this.handleNextPrevClick(2)(1)}
                    >
                      previous
                    </MDBBtn>
                    <MDBBtn
                      color="mdb-color"
                      rounded
                      className="float-right"
                      onClick={this.handleNextPrevClick(2)(3)}
                    >
                      next
                    </MDBBtn>
                  </MDBCol>
                )}
                {this.state.formActivePanel2 === 3 && (
                  <MDBCol md="12">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>Terms and conditions</strong>
                    </h3>
                    <MDBInput
                      label="I agreee to the terms and conditions"
                      type="checkbox"
                      id="checkbox"
                      autoFocus={this.calculateAutofocus(2)}
                    />
                    <MDBInput
                      label="I want to receive newsletter"
                      type="checkbox"
                      id="checkbox2"
                    />
                    <MDBBtn
                      color="mdb-color"
                      rounded
                      className="float-left"
                      onClick={this.handleNextPrevClick(2)(2)}
                    >
                      previous
                    </MDBBtn>
                    <MDBBtn
                      color="mdb-color"
                      rounded
                      className="float-right"
                      onClick={this.handleNextPrevClick(2)(4)}
                    >
                      next
                    </MDBBtn>
                  </MDBCol>
                )}

                {this.state.formActivePanel2 === 4 && (
                  <MDBCol md="12">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>Finish</strong>
                    </h3>
                    <h2 className="text-center font-weight-bold my-4">
                      Registration completed!
                    </h2>
                    <MDBBtn
                      color="mdb-color"
                      rounded
                      className="float-left"
                      onClick={this.handleNextPrevClick(2)(3)}
                    >
                      previous
                    </MDBBtn>
                    <MDBBtn
                      color="success"
                      rounded
                      className="float-right"
                      onClick={this.handleSubmission}
                    >
                      submit
                    </MDBBtn>
                  </MDBCol>
                )}
              </MDBRow>
            </form>
      </MDBContainer>
    );
  }
}

export default RegisterPage;
