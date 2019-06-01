import React, { Component } from "react";

class Image extends Component{
    render(){
        return (
            <img src={this.props.src} alt={this.props.alt} height={this.props.height} width={this.props.width} className={this.props.className} href={this.props.href} />
        );
    }
}

export default Image;
