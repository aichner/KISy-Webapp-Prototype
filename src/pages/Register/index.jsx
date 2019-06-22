import React, { Component } from "react";
// Apollo
import { graphql } from 'react-apollo';
import { gql } from "apollo-boost";
// MDB
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBProgress, MDBRangeInput, MDBIcon, MDBCard, MDBCardUp, MDBCardBody, MDBBadge } from "mdbreact";
// Features
import ReactPasswordStrength from 'react-password-strength';
import Autosuggest from 'react-autosuggest';
// Components
import Confetti from '../../components/molecules/Confetti';

// Icons
// import { FaFacebook } from 'react-icons/fa';
// CSS
import "./register.scss";

const CREATE_USER_MUTATION = gql`
  mutation create(
    $username: String!
    $email: String!
    $password: String!
  ){
    createUser(
      username:$username
      email:$email
      password:$password
    ){
      user{
        username
        email
      }
    }
  }
`;

const companies = [
  {
    name: 'Schmalzl Inc.'
  },
  {
    name: 'Sobe GmbH'
  },
  {
    name: 'Hufsky & Co KG'
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
  const suggestions = companies.filter(language => regex.test(language.name));
  
  if (suggestions.length === 0) {
    return [
      { isAddNew: true }
    ];
  }
  
  return suggestions;
}

class RegisterPage extends Component {
  _isMounted = false;

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
      email: "",
      company: { isCompany: false, vatNumber: "", vatCountryCode:  "", vatAddress: "", hasVAT: false, name: "", suggestions: [] },
      passwordtemp: "",
      passwordrepeat: "",
      password: { valid: false, value: "", score: undefined },
      temp: { vat: "" },
      address: { country: "", zip: "", street: "", city: "" },
      validate: { email: undefined },
      vattemp: undefined, // True = Valid VAT, False = Invalid VAT, Undefined = No VAT
      personalisation: { informal: true, gdpr: false, newsletter: false, connection: 50, sex: "" },
      progress: { value: 25, text: "Gleich geschafft!", lastPoint: 1},
      first_time_balance: <MDBBadge pill color="success">30,- €</MDBBadge>,
      showConfetti: false,
      finished: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSexChange = this.handleSexChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePersonalisationCheckboxChange = this.handlePersonalisationCheckboxChange.bind(this);
    this.handlePersonalisationSliderChange1 = this.handlePersonalisationSliderChange1.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.validateVAT = this.validateVAT.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    if(this.props.location.state !== undefined){
      if(this.props.location.state.oAuth !== undefined && this.props.location.state.oAuth === true && this.props.location.state.fb_data !== undefined){
        console.log("FB");
        this.setState({
          email: this.props.location.state.fb_data.email,
          first_name: this.props.location.state.fb_data.first_name,
          last_name: this.props.location.state.fb_data.last_name
        });
      } else {
        console.log("No FB");
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handlePasswordChange = (event) => {
    this.setState({passwordtemp: event}, () => this.validatePassword());
    
  }

  handlePersonalisationCheckboxChange = (event) => {
    let field = event.target.name;
    let value = event.target.checked;

    this.setState(prevState => ({
      personalisation: {
        ...prevState.personalisation,
        [field]: value
      }
    }));
  }

  handlePersonalisationSliderChange1 = (event) => {
    let field = "connection";
    let value = parseInt(event, 10);

    this.setState(prevState => ({
      personalisation: {
        ...prevState.personalisation,
        [field]: value
      }
    }));
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

  handleSexChange(event) {
  let field = event.target.name;
  let value = event.target.value;

    this.setState(prevState => ({
      personalisation: {
        ...prevState.personalisation,
        [field]: value
      }
    }));
  }

  checkSwap = (param) => {
    //return true;

    switch(param){
      case 1:
        return true;
      case 2:
        if(this.state.email !== "" && this.state.email !== undefined && this.state.first_name !== "" && this.state.first_name !== undefined && this.state.last_name !== "" && this.state.last_name !== undefined && this.state.password.valid === true && this.state.personalisation.sex !== ""){
          return true;
        } else {
          return false;
        }
      case 3:
        if(this.state.company.isCompany === false){
          if(this.state.address.street !== "" && this.state.address.city !== "" && this.state.address.country !== "" && this.state.address.zip !== ""){
            return true;
          } else {
            return false;
          }
        } else if (this.state.company.isCompany === true){
          if(this.state.address.street !== "" && this.state.address.city !== "" && this.state.address.country !== "" && this.state.address.zip !== "" && this.state.company.name !== ""){
            if(this.state.company.hasVAT){
              if(this.state.company.vatAddress !== "" && this.state.company.vatNumber !== ""){
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      case 4:
        let status = false;
        if(this.state.personalisation.gdpr){
          status = true;
        }
        if(this.createUser()){
          status = true;
        }
        return status;
      default:
        return false;
    }
  }

  handleNextPrevClick = a => param => e => {
    if(this.checkSwap(param)){
      console.log("Yes");
      this.setState({
        ["formActivePanel" + a]: param,
        ["formActivePanel" + a + "Changed"]: true
      });
      if(param > this.state.progress.lastPoint){
        this.setState(prevState => ({
          progress: {
            ...prevState.progress,
            value: this.state.progress.value + 25,
            text: "Wir sind fast da!",
            lastPoint: param
          }
        }));
      }
      if(param === 4){
        this.setState({showConfetti: true});
      } else {
        this.setState({showConfetti: false});
      }
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
        if(value === ""){
          this.setState({vattemp: undefined});
        }
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
      if(validationInfo === undefined){
        if(this.state.temp.vat !== ""){
          this.setState({vattemp: false});
        } else {
          this.setState({vattemp: undefined});
        }
        
      }
      if(validationInfo !== undefined && validationInfo !== null){
        if(validationInfo.valid === true){
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
          this.setState({vattemp: true});
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
          this.setState({vattemp: false});
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
          [+] Neu erstellen: <strong>{this.state.company.name}</strong>
        </span>
      );
    }
    return suggestion.name;
  };

  startKIS = () => {
    this.props.history.push('/kis', { email: this.state.email, personalisation: this.state.personalisation, first_name: this.state.first_name, last_name: this.state.last_name });
  }

   // Call user login mutation
  createUser = async () => {
    this.setState({ finished: false }, () => {
      this.props.mutate({
        variables: {"username": this.state.email, "email": this.state.email, "password": this.state.password.value}
      })
      .then(({ loading, data }) => {
        this.setState({ finished: true });
        console.log(data);
      }).catch((error) => {
        this.setState({ finished: true });
        console.warn('there was an error sending the query', error);
      });
    });
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
      <div>
        {this.state.showConfetti ? (
          <Confetti />
        ) : (
          <div></div>
        )}
        <MDBContainer className="mt-5">
              <h2 className="text-center font-weight-bold pt-4 pb-5 mb-2">
                <strong>Nur noch wenige Schritte!</strong>
              </h2>
              <MDBProgress material value={this.state.progress.value}>
                {this.state.progress.text}
              </MDBProgress>
              <div>
                <input autoComplete="false" name="hidden" type="hidden" value="llama"/>
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
                            required
                          />
                          <small id="emailHelp" className="form-text text-muted">
                            Wir geben Ihre E-Mail-Adresse niemals an Dritte weiter.
                          </small>
                          <div style={{ top: "auto" }} className="invalid-tooltip">
                            Bitte geben Sie eine gültige E-Mail Adresse ein
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="form-row">
                            <div className="col-3">
                              <div>
                                <label htmlFor="formGroupExampleInput">Ansprache<span className="deep-orange-text pl-1">*</span></label>
                                <select value={this.state.personalisation.sex} name="sex" className="browser-default custom-select" onChange={ this.handleSexChange } required>
                                  <option value="">Auswählen</option>
                                  <option value="Herr">Herr</option>
                                  <option value="Frau">Frau</option>
                                </select>
                              </div>
                            </div>
                            <div className="col">
                              <div>
                                <label htmlFor="formGroupExampleInput">Vorname<span className="deep-orange-text pl-1">*</span></label>
                                <input
                                  value={ this.state.first_name }
                                  type="text"
                                  name="first_name"
                                  className="form-control"
                                  onChange={ this.handleChange }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col">
                              <label htmlFor="formGroupExampleInput">Nachname<span className="deep-orange-text pl-1">*</span></label>
                              <input
                                value={ this.state.last_name }
                                type="text"
                                name="last_name"
                                className="form-control"
                                onChange={ this.handleChange }
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <hr />
                        { this.state.progress.lastPoint === 1 ? (
                          <div>
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
                                required
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
                                required
                              />
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted"><MDBIcon icon="check" className="green-text pr-2"/>Das Passwort wurde erfolgreich gesetzt</p>
                        ) }
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
                              className= { this.state.vattemp === true ? 'form-control is-valid' : this.state.vattemp === false ? 'form-control is-invalid' : "form-control" }
                              onChange={ this.handleCompanyChange }
                            />
                            <small id="emailHelp" className="form-text text-muted">
                              Die UID-Nummer dient der Identifikation gegenüber anderen Unternehmen.
                            </small>
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
                            <label htmlFor="formGroupExampleInput">Adresse <span className="text-muted">(z.B. Musterstraße 7)</span><span className="deep-orange-text pl-1">*</span></label>
                            <input
                              value={ this.state.address.street }
                              type="text"
                              name="street"
                              className= "form-control"
                              onChange={ this.handleAddressChange }
                              required
                            />
                          </div>
                          <div className="form-group">
                            <div className="form-row">
                              <div className="col">
                                <div>
                                  <label htmlFor="formGroupExampleInput">Land<span className="deep-orange-text pl-1">*</span></label>
                                  <select value={this.state.address.country} name="country" className="browser-default custom-select" onChange={ this.handleAddressChange } required>
                                    <option value="">Auswählen</option>
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
                                  required
                                />
                              </div>
                              <div className="col-5">
                                <label htmlFor="formGroupExampleInput">Stadt<span className="deep-orange-text pl-1">*</span></label>
                                <input
                                  value= { this.state.address.city }
                                  type="text"
                                  name="city"
                                  className="form-control"
                                  onChange={ this.handleAddressChange }
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <MDBBtn
                            color="mdb-color"
                            rounded
                            className="float-left"
                            onClick={this.handleNextPrevClick(2)(1)}
                          >
                            Zurück
                          </MDBBtn>
                          <MDBBtn
                            color="mdb-color"
                            rounded
                            className="float-right"
                            disabled={!this.checkSwap(3)}
                            onClick={this.handleNextPrevClick(2)(3)}
                          >
                            Weiter
                        </MDBBtn>
                    </MDBCol>
                  )}
                  {this.state.formActivePanel2 === 3 && (
                    <MDBCol md="12">
                      <h3 className="font-weight-bold pl-0 my-4">
                        <strong>Personalisierung</strong>
                      </h3>
                      <div className="text-center">
                        <label htmlFor="formGroupExampleInput">Wie wichtig ist { this.state.personalisation.informal ? (
                            "Dir"
                          ) : (
                            "Ihnen"
                          ) } eine persönliche Verbindung zu { this.state.personalisation.informal ? (
                            "Deinem"
                          ) : (
                            "Ihrem"
                          ) } Geschäfts-Partner?</label>
                        <MDBRow center>
                            <span className="font-weight-bold purple-text mr-2">Nicht wichtig</span>
                            <MDBRangeInput
                              name="connection"
                              getValue={this.handlePersonalisationSliderChange1}
                              min={0}
                              max={100}
                              value={this.state.personalisation.connection}
                              formClassName="w-50"
                            />
                            <span className="font-weight-bold purple-text ml-2">Sehr wichtig</span>
                        </MDBRow>
                      </div>
                      <MDBInput
                        label='Ich möchte mit "Du" angesprochen werden'
                        type="checkbox"
                        id="checkbox"
                        name="informal"
                        checked={ this.state.personalisation.informal }
                        onChange={ this.handlePersonalisationCheckboxChange }
                        autoFocus={this.calculateAutofocus(2)}
                      />
                      <MDBInput
                        label="Ich habe die Datenschutzerklärung gelesen und akzeptiere diese"
                        type="checkbox"
                        id="checkbox5"
                        name="gdpr"
                        checked={ this.state.personalisation.gdpr }
                        onChange={ this.handlePersonalisationCheckboxChange }
                      />
                      <MDBInput
                        label="Ich möchte Newsletters erhalten und von Sonderangeboten profitieren"
                        type="checkbox"
                        id="checkbox10"
                        name="newsletter"
                        checked={ this.state.personalisation.newsletter }
                        onChange={ this.handlePersonalisationCheckboxChange }
                      />
                      <MDBBtn
                        color="mdb-color"
                        rounded
                        className="float-left"
                        onClick={this.handleNextPrevClick(2)(2)}
                      >
                        Zurück
                      </MDBBtn>
                      <MDBBtn
                        color="success"
                        rounded
                        className="float-right"
                        onClick={this.handleNextPrevClick(2)(4)}
                      >
                        Starten
                      </MDBBtn>
                    </MDBCol>
                  )}

                  {this.state.formActivePanel2 === 4 && (
                    <MDBCol md="6" className="m-auto step-finish my-3">
                      <MDBCard testimonial>
                        <MDBCardUp gradient="aqua">
                          <h2 className="text-center font-weight-bold my-4">
                            Registrierung abgeschlossen!
                          </h2>
                        </MDBCardUp> 
                        <MDBCardBody>
                          <img alt="trophy" src={`data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNjQgNjQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDY0IDY0IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyBpZD0icm93XzQiLz48ZyBpZD0icm93XzMiLz48ZyBpZD0icm93XzIiLz48ZyBpZD0icm93XzEiPjxnIGlkPSJxdWFsaXR5Ij48cGF0aCBkPSJNNDUuNCwyMi4zbDUuMy0xM2MwLjEtMC4zLDAuMS0wLjctMC4xLTFsLTAuNC0wLjVoLTAuNWwtMTMuNSwzLjZMMjUuOSwyLjNMMjUuNSwyaC0wLjQgICAgYy0wLjYsMC0xLjEsMC41LTEuMSwxbC0wLjgsMTRsLTExLjcsNy4zYy0wLjQsMC4yLTAuNSwwLjYtMC41LDFsMC4xLDAuN2wxMy40LDUuNEwzMSw1MS4yYzAuMSwwLjUsMC42LDAuOCwxLDAuOHMwLjktMC4zLDEtMC43ICAgIGw2LjMtMTdsMTIuNSwxLjVsMC4xLDBjMC40LDAsMC44LTAuMiwwLjktMC42bDAuMy0wLjZMNDUuNCwyMi4zeiIgZmlsbD0iI0ZGRDU0RiIvPjxnPjxwb2x5Z29uIGZpbGw9IiNGRkVDQjMiIHBvaW50cz0iMzgsMTMgMzUuNywxMy43IDMzLDExLjMgNDEuNSwzMi42IDQ2LDMzLjEgICAgIi8+PHBvbHlnb24gZmlsbD0iI0ZGRTA4MiIgcG9pbnRzPSIyOC4zLDcuMSAyNS45LDUgMjUuMiwxOC4yIDI0LjMsMTguNyAzNCw0MyAzOCwzMi4xIDM4LjMsMzIuMiAgICAiLz48L2c+PHBhdGggZD0iTTMyLjIsNDkuN2wtMS43LTUuMWwxLjEtMC40bDAuNywybDEuMy0zLjZsMS4xLDAuNEwzMi4yLDQ5Ljd6IE0zNS40LDQwLjlsLTEuMS0wLjRsMy41LTkuNGw0LjcsMC42ICAgIGwtMC4xLDEuMWwtMy44LTAuNUwzNS40LDQwLjl6IE00OS43LDMyLjhsLTEuMi0ybDEtMC42bDEuMiwyTDQ5LjcsMzIuOHogTTI2LjIsMzEuNEwyNS43LDMwbC0xMy01LjJsMS41LTAuOWwwLjMsMC40bDEyLjIsNC45ICAgIGwwLjYsMS45TDI2LjIsMzEuNHogTTE2LjgsMjMuNmwtMC42LTFsNy44LTQuOWwwLjYsMUwxNi44LDIzLjZ6IE00NS43LDE4LjdsLTEuMS0wLjRsMy41LTguNWwxLjEsMC40TDQ1LjcsMTguN3ogTTM1LjksMTMuNiAgICBsLTIuMS0xLjlsMC44LTAuOWwxLjcsMS41bDEwLjYtMi44bDAuMywxLjFMMzUuOSwxMy42eiBNMjYuOCw1LjZMMjYuMSw1bC0wLjYsMGwwLjEtMmwyLDEuOEwyNi44LDUuNnoiIGZpbGw9IiNGRkNBMjgiLz48Zz48cmVjdCBmaWxsPSIjRkY3MDQzIiBoZWlnaHQ9IjUiIHdpZHRoPSIyMiIgeD0iMjEiIHk9IjUwIi8+PHJlY3QgZmlsbD0iI0I3MUMxQyIgaGVpZ2h0PSI4IiB3aWR0aD0iMzAiIHg9IjE3IiB5PSI1MyIvPjxyZWN0IGZpbGw9IiMzRTI3MjMiIGhlaWdodD0iMiIgd2lkdGg9IjMyIiB4PSIxNiIgeT0iNjAiLz48cmVjdCBmaWxsPSIjRkZCMzAwIiBoZWlnaHQ9IjYiIHdpZHRoPSIxNCIgeD0iMjUiIHk9IjUzIi8+PHJlY3QgZmlsbD0iI0ZCRTlFNyIgaGVpZ2h0PSI0IiB3aWR0aD0iMTIiIHg9IjI2IiB5PSI1NCIvPjwvZz48Zz48cGF0aCBkPSJNMTYuOCw0OWwtNC4yLTUuN2MtMS0zLjEtMS02LjMsMC05LjNjMC4xLTAuMywwLjQtMC42LDAuOC0wLjdjMC40LTAuMSwwLjcsMC4xLDEsMC4zICAgICBDMTcuOCwzNy45LDE4LjgsNDMuOCwxNi44LDQ5eiIgZmlsbD0iI0ZGQ0EyOCIvPjxwYXRoIGQ9Ik0xMS40LDQxLjFjLTAuNC0wLjktMC43LTEuNi0wLjktMi4zYzEuNy01LjIsMC42LTEwLjktMi45LTE1Yy0wLjItMC4yLTAuNS0wLjMtMC43LTAuMyAgICAgYy0wLjUsMC0wLjgsMC4zLTEsMC43Yy0xLjYsNS4zLTAuMSwxMS4xLDMuNywxNS4xbDAsMGMwLjIsMC43LDAuNSwxLjQsMC45LDIuM0wxMS40LDQxLjF6IiBmaWxsPSIjRkZDQTI4Ii8+PHBhdGggZD0iTTE0LjUsNDRjLTAuOCwwLTEuNS0wLjktMS41LTJzMC43LTIsMS41LTJzMS41LDAuOSwxLjUsMlMxNS4zLDQ0LDE0LjUsNDR6IiBmaWxsPSIjRkZCMzAwIi8+PHBhdGggZD0iTTcuOCwzOS40Yy0wLjUsMC0xLjEtMC4zLTEuNi0wLjdjLTAuNC0wLjQtMC42LTAuOC0wLjctMS4yYy0wLjEtMC41LDAtMSwwLjMtMS4zICAgICBjMC42LTAuNiwxLjctMC40LDIuNSwwLjRjMC40LDAuNCwwLjYsMC44LDAuNywxLjJjMC4xLDAuNSwwLDEtMC4zLDEuM0M4LjUsMzkuMyw4LjEsMzkuNCw3LjgsMzkuNHoiIGZpbGw9IiNGRkIzMDAiLz48cGF0aCBkPSJNMTksNTAuNGMtMC43LTAuNS0xLjUtMS4xLTIuMy0xLjljLTEuNy01LjItNi05LjItMTEuNC0xMC4zYy0wLjQtMC4xLTAuOCwwLjEtMSwwLjQgICAgIGMtMC4yLDAuMy0wLjIsMC42LTAuMSwwLjljMS45LDUuMSw2LjUsOC45LDExLjksOS44YzAuOCwwLjcsMS42LDEuNCwyLjMsMS45TDE5LDUwLjR6IiBmaWxsPSIjRkZCMzAwIi8+PC9nPjxnPjxwYXRoIGQ9Ik00Ny4yLDQ5bDQuMi01LjdjMS0zLjEsMS02LjMsMC05LjNjLTAuMS0wLjMtMC40LTAuNi0wLjgtMC43Yy0wLjQtMC4xLTAuNywwLjEtMSwwLjMgICAgIEM0Ni4yLDM3LjksNDUuMiw0My44LDQ3LjIsNDl6IiBmaWxsPSIjRkZFMDgyIi8+PHBhdGggZD0iTTUyLjYsNDEuMWMwLjQtMC45LDAuNy0xLjYsMC45LTIuM2MtMS43LTUuMi0wLjYtMTAuOSwyLjktMTVjMC4yLTAuMiwwLjUtMC4zLDAuNy0wLjMgICAgIGMwLjUsMCwwLjgsMC4zLDEsMC43YzEuNiw1LjMsMC4xLDExLjEtMy43LDE1LjFsMCwwYy0wLjIsMC43LTAuNSwxLjQtMC45LDIuM0w1Mi42LDQxLjF6IiBmaWxsPSIjRkZENTRGIi8+PHBhdGggZD0iTTQ4LDQyYzAtMS4xLDAuNy0yLDEuNS0yczEuNSwwLjksMS41LDJzLTAuNywyLTEuNSwyUzQ4LDQzLjEsNDgsNDJ6IiBmaWxsPSIjRkZCMzAwIi8+PHBhdGggZD0iTTU1LjMsMzljLTAuMy0wLjMtMC40LTAuOC0wLjMtMS4zYzAuMS0wLjQsMC4zLTAuOSwwLjctMS4yYzAuOC0wLjgsMS45LTAuOSwyLjUtMC40ICAgICBjMC4zLDAuMywwLjQsMC44LDAuMywxLjNjLTAuMSwwLjQtMC4zLDAuOS0wLjcsMS4yYy0wLjUsMC41LTEsMC43LTEuNiwwLjdDNTUuOSwzOS40LDU1LjUsMzkuMyw1NS4zLDM5eiIgZmlsbD0iI0ZGQjMwMCIvPjxwYXRoIGQ9Ik00NSw1MC40YzAuNy0wLjUsMS41LTEuMSwyLjMtMS45YzEuNy01LjIsNi05LjIsMTEuNC0xMC4zYzAuNC0wLjEsMC44LDAuMSwxLDAuNCAgICAgYzAuMiwwLjMsMC4yLDAuNiwwLjEsMC45Yy0xLjksNS4xLTYuNSw4LjktMTEuOSw5LjhjLTAuOCwwLjctMS42LDEuNC0yLjMsMS45TDQ1LDUwLjR6IiBmaWxsPSIjRkZDQTI4Ii8+PC9nPjwvZz48L2c+PC9zdmc+`} />
                          {this.state.personalisation.informal ? (
                            <p className="lead">Hallo {this.state.first_name} starte gleich richtig durch und spare {this.state.first_time_balance} bei deinem ersten Auftrag!</p>
                          ) : (
                            <p className="lead">{this.state.personalisation.sex + " " + this.state.last_name}, starten Sie gleich richtig durch und sparen Sie {this.state.first_time_balance} bei Ihrem ersten Auftrag!"</p>
                          )}
                          <p>{ this.state.personalisation.informal ? ("Ziehe") : ("Ziehen Sie") } JETZT positiven Nutzen daraus.</p>
                          <MDBBtn
                            color="success"
                            rounded
                            className="text-center"
                            onClick={ this.startKIS }
                          >
                            Loslegen
                          </MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  )}
                </MDBRow>
              </div>
        </MDBContainer>
      </div>
    );
  }
}

export default graphql(CREATE_USER_MUTATION)(RegisterPage);
