import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
// Apollo
import { graphql } from 'react-apollo';
import { gql } from "apollo-boost";
// MDB
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from "mdbreact";

class PaymentModal extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
    console.log("submit");
  }

    toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }


  render() {
    return (
      <div className="checkout">
      
        <MDBModal
          backdrop={false}
          isOpen={this.props.show}
          toggle={this.toggle(1)}
        >
          <MDBModalHeader toggle={this.toggle(1)}>Modal title</MDBModalHeader>
          <MDBModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(1)}>
              Close
            </MDBBtn>
            <button onClick={this.submit}>Send</button>
          </MDBModalFooter>
        </MDBModal>
    </div>
    );
  }
}

export default PaymentModal;
