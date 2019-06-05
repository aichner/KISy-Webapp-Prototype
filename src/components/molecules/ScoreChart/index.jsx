import React, { Component } from "react";
import { Radar } from "react-chartjs-2";

class ScoreChart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataRadar: {
                labels: ["Website", "Social Media", "Branding", "Filme", "Logo", "Public Relations"],
                datasets: [
                {
                    label: "Dein Unternehmen",
                    backgroundColor: "rgba(60, 130, 255, 0.5)",
                    boderColor: "rgb(60, 130, 255)",
                    data: this.props.perks
                },
                /*{
                    label: "KELAG",
                    backgroundColor: "rgba(0, 200, 0, 0.2)",
                    boderColor: "rgb(0, 200, 0)",
                    data: [90, 100, 90, 90, 80, 95]
                }*/
                ]
            }
        }
    }
    render(){
        return (
                <Radar data={this.state.dataRadar} options={{responsive: true, scale: {ticks: {max: 100}}}} />
        );
    }
}

export default ScoreChart;
