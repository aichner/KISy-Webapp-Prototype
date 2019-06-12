import React, { Component } from "react";
// MDB
// import...

// CSS
// import...

// const query = ...

import ScoreChart from "../../../molecules/ScoreChart";

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state={
            
        }
    }

    render() {
        return (
            <ScoreChart perks={this.props.c_perks} compare={this.props.c_compare}/>
        );
    }
}

export default Statistics;
