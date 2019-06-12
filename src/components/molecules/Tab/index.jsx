import React, { Component } from "react";
import { MDBTabPane, MDBRow } from "mdbreact";

class Tab extends Component {
    render() {
        return (
            <MDBTabPane tabId={this.props.tabId}>
                <MDBRow className="text-center">
                    {this.props.children}
                </MDBRow>
            </MDBTabPane>
        );
    }
}

export default Tab;
