import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBStepper, MDBStep } from "mdbreact";
import ReactPasswordStrength from 'react-password-strength';
import Autosuggest from 'react-autosuggest';
// Icons
// import { FaFacebook } from 'react-icons/fa';
// CSS
import "./register.scss";

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  const suggestions = languages.filter(language => regex.test(language.name));
  
  if (suggestions.length === 0) {
    return [
      { isAddNew: true }
    ];
  }
  
  return suggestions;
}

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
      email: this.getEmail(),
      company: { isCompany: false, vatNumber: "", vatCountryCode:  "", vatAddress: "", hasVAT: false, name: "", suggestions: [] },
      passwordtemp: "",
      passwordrepeat: "",
      password: { valid: false, value: "", score: undefined },
      temp: { vat: "" },
      address: { country: "", zip: "", street: "", city: "" }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.validateVAT = this.validateVAT.bind(this);
  }

  handlePasswordChange = (event) => {
    this.setState({passwordtemp: event}, () => this.validatePassword());
    
  }

  repeatPassword = (event) => {
    this.setState({passwordrepeat: event.target.value}, () => this.validatePassword());
    
  } 

  validatePassword = () => {
    if(this.state.passwordtemp !== "" && this.state.passwordtemp !== undefined && this.state.passwordrepeat !== "" && this.state.passwordrepeat !== undefined){
      if(this.state.passwordtemp.password === this.state.passwordrepeat && this.state.passwordtemp.score > 0){
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

  handleAddressChange(event) {
    let field = event.target.name;
    let value = event.target.value;


    this.setState(prevState => ({
      address: {
        ...prevState.address,
        [field]: value
      }
    }));
  }

  swapFormActive = a => param => e => {
    if(this.checkSwap(param)){
      this.setState({
        ["formActivePanel" + a]: param,
        ["formActivePanel" + a + "Changed"]: true
      });
    } else {
      console.log("Action blocked.");
    }
  };

  checkSwap = (param) => {
    return true;
    switch(param){
      case 1:
        return true;
      case 2:
        if(this.state.email !== "" && this.state.email !== undefined && this.state.first_name !== "" && this.state.first_name !== undefined && this.state.last_name !== "" && this.state.last_name !== undefined && this.state.password.valid === true){
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  }

  handleNextPrevClick = a => param => e => {
    if(this.checkSwap(param)){
      this.setState({
        ["formActivePanel" + a]: param,
        ["formActivePanel" + a + "Changed"]: true
      });
    } else {
      console.log("Not enough information!");
    }
    
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
      if(this.props.location.state.email !== "" || this.props.location.state.email !== undefined || this.props.location.state.email !== null){
        return this.props.location.state.email;
      } else {
        return "";
      }
  }

  foo = () => {

  }

  // Company values
  handleCompanyChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    switch(field) {
      case 'company_name':
        this.setState(prevState => ({
          company: {
            ...prevState.company,
            name: value
          }
        }));
        break;
      case 'company_vat':
        this.setState(prevState => ({
          temp: {
            ...prevState.temp,
            vat: value
          }
        }));
        if(this.validateVAT(value)){

        }
        break;
      default:
        return 'foo';
    }
  }

  onClick = nr => () =>{
    let companystate = false;
    console.log(nr);
    if(nr === 2){
      companystate = true;
    }

    this.setState(prevState => ({
      company: {
        ...prevState.company,
        isCompany: companystate
      }
    }));
  }

  validateVAT = (raw) => {
    let validate = require('validate-vat');
    let input = raw.replace(/\s/g, '');
    let countrycode = input.substring(0,2);
    let vatnumber = input.substring(2);

    validate ( countrycode,  vatnumber, (err, validationInfo) => {
      console.log(err);
      console.log(validationInfo);
      if(validationInfo !== undefined && validationInfo !== null){
        console.log("Ready");
        if(validationInfo.valid === true){
          console.log("Yes");
          // Error is here - "this" is not recognized
          this.setState(prevState => ({
            company: {
              ...prevState.company,
              vatNumber: validationInfo.vatNumber,
              vatCountryCode: validationInfo.countryCode,
              vatAddress: validationInfo.address,
              hasVAT: true,
              name: validationInfo.name
            }
          }));
          let address_parts = validationInfo.address.split(',');
          this.setState(prevState => ({
            address: {
              ...prevState.address,
              country: validationInfo.countryCode.toUpperCase(),
              street: address_parts[0].trim()
            }
          }));
          return true;
        } else {
          this.setState(prevState => ({
            company: {
              ...prevState.company,
              vatNumber: "",
              vatCountryCode: "",
              vatAddress: "",
              hasVAT: false
            }
          }));
          return false;
        }
      } else {
        console.log("Still waiting");
      }
    });
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState(prevState => ({
      company: {
        ...prevState.company,
        suggestions: getSuggestions(value)
      }
    }));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState(prevState => ({
      company: {
        ...prevState.company,
        suggestions: []
      }
    }));
  };

  validateAddress = (event) => {
    
  }

  onCompanyNameChange = (event, { newValue }) => {
    this.setState(prevState => ({
      company: {
        ...prevState.company,
        name: newValue
      }
    }));
  };

  onSuggestionSelected = (event, { suggestion }) => {
    if (suggestion.isAddNew) {
      console.log('Add new:', this.state.company.name);
    }
  };

  getSuggestionValue = suggestion => {
    if (suggestion.isAddNew) {
      return this.state.name;
    }
    
    return suggestion.name;
  };

   renderSuggestion = suggestion => {
    if (suggestion.isAddNew) {
      return (
        <span>
          [+] Add new: <strong>{this.state.company.name}</strong>
        </span>
      );
    }

    return suggestion.name;
  };
  
  render() {
    let test = this.props.location.state
    console.log(test);
    console.log(this.state);

    const { suggestions } = this.state.company;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      value: this.state.company.name,
      onChange: this.onCompanyNameChange,
      className: "form-control"
    };

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
              <input
                type="hidden"
                value="llama"
              />
              <MDBRow>
                {this.state.formActivePanel2 === 1 && (
                  <MDBCol md="6" className="m-auto">
                  
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>Allgemeine Informationen</strong>
                    </h3>
                    
                      <div className="form-group">
                        <label htmlFor="formGroupExampleInput">E-Mail<span className="deep-orange-text pl-1">*</span></label>
                        
                        <input
                          value={ this.state.email }
                          type="email"
                          name="email"
                          className="form-control"
                          autoFocus={this.calculateAutofocus(2)}
                          onChange={ this.handleChange }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Vorname<span className="deep-orange-text pl-1">*</span></label>
                        <input
                          value={ this.state.first_name }
                          type="text"
                          name="first_name"
                          className="form-control"
                          onChange={ this.handleChange }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Nachname<span className="deep-orange-text pl-1">*</span></label>
                        <input
                          value={ this.state.last_name }
                          type="text"
                          name="last_name"
                          className="form-control"
                          onChange={ this.handleChange }
                        />
                      </div>
                      <hr />
                      <div className="form-group">
                        <label htmlFor="formGroupPasswordTemp">Passwort<span className="deep-orange-text pl-1">*</span></label>
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
                        <label htmlFor="formGroupPasswordRepeat">Passwort wiederholen<span className="deep-orange-text pl-1">*</span></label>
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
                        disabled={!this.checkSwap(2)}
                        onClick={this.handleNextPrevClick(2)(2)}
                      >
                        Weiter
                      </MDBBtn>
                 
                  </MDBCol>
                )}
                {this.state.formActivePanel2 === 2 && (
                  <MDBCol md="6" className="m-auto">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>Kontaktdaten</strong>
                    </h3>
                    <div className="form-inline">
                      <MDBInput onClick={this.onClick(1)} checked={this.state.company.isCompany===false ? true : false} label="Privatperson"
                        type="radio" id="radio1" />
                      <MDBInput onClick={this.onClick(2)} checked={this.state.company.isCompany===true ? true : false} label="Unternehmen"
                        type="radio" id="radio2" />
                    </div>
                    {this.state.company.isCompany ? (
                      <div>
                        <div className="form-group">
                          <label htmlFor="formGroupExampleInput">UID-Nummer <span className="text-muted">(VAT)</span></label>
                          <input
                            value={ this.state.temp.vat }
                            type="text"
                            name="company_vat"
                            className= { this.state.company.hasVAT ? 'form-control is-valid' : 'form-control' }
                            onChange={ this.handleCompanyChange }
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="formGroupExampleInput">Firmenwortlaut <span className="text-muted">(Firmenname)</span><span className="deep-orange-text pl-1">*</span></label>
                          <Autosuggest 
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            onSuggestionSelected={this.onSuggestionSelected}
                            inputProps={inputProps}
                          />
                        </div>
                      </div>
                    ) : (
                      <span></span>
                    )}
                    <div className="form-group">
                          <label htmlFor="formGroupExampleInput">Adresse <span className="text-muted">(Musterstraße 7)</span><span className="deep-orange-text pl-1">*</span></label>
                          <input
                            value={ this.state.address.street }
                            type="text"
                            name="street"
                            className= "form-control"
                            onChange={ this.handleAddressChange }
                          />
                        </div>
                        <div className="form-group">
                          <div className="form-row">
                            <div className="col">
                              <div>
                                <label htmlFor="formGroupExampleInput">Land<span className="deep-orange-text pl-1">*</span></label>
                                <select value={this.state.address.country} name="country" className="browser-default custom-select" onChange={ this.handleAddressChange }>
                                  <option value="">Bitte auswählen</option>
                                  <option value="AT">Österreich</option>
                                  <option value="DE">Deutschland</option>
                                  <option value="CH">Schweiz</option>
                                </select>
                              </div>
                            </div>
                             <div className="col">
                              <label htmlFor="formGroupExampleInput">Postleitzahl <span className="text-muted">(PLZ)</span><span className="deep-orange-text pl-1">*</span></label>
                              <input
                                value= { this.state.address.zip }
                                type="text"
                                name="zip"
                                className="form-control"
                                onChange={ this.handleAddressChange }
                              />
                            </div>
                            <div className="col">
                              <label htmlFor="formGroupExampleInput">Stadt<span className="deep-orange-text pl-1">*</span></label>
                              <input
                                value= { this.state.address.city }
                                type="text"
                                name="city"
                                className="form-control"
                                onChange={ this.handleAddressChange }
                              />
                            </div>
                          </div>
                        </div>
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
