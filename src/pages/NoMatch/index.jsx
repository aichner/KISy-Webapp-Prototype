import React, { Component } from "react";
import { Link } from "react-router-dom";
// MDB
import { MDBContainer } from "mdbreact";

// CSS
import "./nomatch.scss";
import "./images.scss";

class NoMatch extends Component {
  getImage = () => {
      let random = Math.floor(Math.random() * 4) + 1;
      let image = "banner nomatch-"+random;
      return image;
  }

   render() {
    return (
        <MDBContainer className="h-100">

        <div className="flex-center flex-column text-center">
             <div className="nomatch">
                <div className="text-center py-3">
                    <div className={this.getImage()}></div>
                    <h2 className="pb-2">Diese Seite konnte leider nicht gefunden werden.</h2>
                    <h4><Link to={`/`}>Zurück zur Startseite</Link></h4>
                </div>
            </div>
        </div>
        </MDBContainer>
    );
  }
}

export default NoMatch;
