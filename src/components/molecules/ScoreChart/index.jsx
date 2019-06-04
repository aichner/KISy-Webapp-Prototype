import React, { Component } from "react";
import { Radar } from "react-chartjs-2";

class ScoreChart extends Component{
    render(){
        return (
                <Radar data={this.props.data} options={{responsive: true, scale: {ticks: {max: 100}}}} />
        );
    }
}

export default ScoreChart;
