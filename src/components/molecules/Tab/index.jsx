import React, { Component } from "react";
import { MDBTabPane } from "mdbreact";

class Tab extends Component {
    render() {
        return (
            <MDBTabPane tabId={this.props.tabId}>
                {this.props.children}
            </MDBTabPane>
        );
    }
}

export default Tab;
