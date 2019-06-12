import React, { Component } from "react";
// MDB
import { MDBCol, MDBAlert, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBProgress, MDBBadge, MDBListGroup, MDBListGroupItem, MDBIcon, MDBTooltip } from "mdbreact";

// CSS
// import...

// const query = ...

// molecules
import ScoreChart from "../../../molecules/ScoreChart";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state={
            
        }
    }

    
    // Start: Generic functions
    calculateScore = () => {
        let sum = 0;
        for (var i = 0; i < this.props.c_perks.length; i++) {
        sum += this.props.c_perks[i]
        }
        return Math.round(sum / this.props.c_perks.length);
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
          this.setState({
            activeItem: tab
          });
        }
      }
    
      togglePills = tab => e => {
        if (this.state.activePills !== tab) {
          this.setState({
            activeItemPills: tab
          });
        }
      }
    
      toggleVerticalPills = tab => e => {
        if (this.state.activeItem3 !== tab) {
          this.setState({
            activeItemVerticalPills: tab
          });
        }
      }
      toggleClassicTabs1 = tab => e => {
        if (this.state.activeItemClassicTabs1 !== tab) {
          this.setState({
            activeItemClassicTabs1: tab
          });
        }
      }
    
      toggleClassicTabs2 = tab => e => {
        if (this.state.activeItemClassicTabs2 !== tab) {
          this.setState({
            activeItemClassicTabs2: tab
          });
        }
      }
    
      toggleOuterTabs = tab => e => {
        if (this.state.activeItemOuterTabs2 !== tab) {
          this.setState({
            activeItemOuterTabs: tab
          });
        }
      }
    
      toggleInnerPills = tab => e => {
        if (this.state.activeItemInnerPills !== tab) {
          this.setState({
            activeItemInnerPills: tab
          });
        }
      }
    
    // End: Generic functions

    render() {
        return (
            <div>
            <MDBCol md="6" className="score-board">
                    <ScoreChart perks={this.props.c_perks} compare={this.props.c_compare}/>
                    <h3 className="mt-3">Dein Score: {this.calculateScore()}</h3>
                    {this.calculateScore() > this.props.c_perks_average ? (
                      <div>
                        <p className="lead"><MDBBadge color="success">Besser als der Durchschnitt</MDBBadge></p>
                        <MDBProgress value={this.calculateScore()} color="success" />
                      </div>
                    ) : (
                      <div>
                        <p className="lead"><MDBBadge color="danger">Schlechter als der Durchschnitt</MDBBadge></p>
                        <MDBProgress value={this.calculateScore()} color="danger" />
                      </div>
                    )}
                    
                   
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBAlert color="success" dismiss onClose={()=> alert('This event fires immediately when the close instance method is called.')} onClosed={()=> alert('This event is fired when the alert has been closed (will wait for CSS transitions to complete).')}>
                      Eine neue Videovorschau ist verfügbar!
                    </MDBAlert>
                    <MDBAlert color="info" className="text-left">
                    <h4 className="alert-heading">Well done!</h4>
                      Achievement
                      <hr />
                      <p className="mb-0">Belohnung: 50€</p>
                      <MDBProgress material  color="info" value={70} />
                    </MDBAlert>
                  </MDBCol>
                  <MDBCol md="4" className="py-4">
                    <MDBCard>
                      <MDBCardBody>
                        <MDBCardTitle tag="h5">Panel title</MDBCardTitle>
                        <MDBCardText>
                          Some quick example text to build on the card title and make up
                          the bulk of the card's content.
                        </MDBCardText>
                        <MDBBtn color="blue" size="md">
                          read more
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol md="4" className="py-4">
                    <MDBCard>
                      <MDBCardBody>
                        <MDBCardTitle tag="h5">Panel title</MDBCardTitle>
                        <MDBCardText>
                          Some quick example text to build on the card title and make up
                          the bulk of the card's content.
                        </MDBCardText>
                        <MDBBtn color="blue" size="md">
                          read more
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol md="4" className="py-4">
                    <MDBCard>
                      <MDBCardBody className="orders">
                        <MDBCardTitle tag="h5">Ihre Aufträge</MDBCardTitle>
                          <MDBListGroup className="my-4">
                            <MDBListGroupItem hover className="d-flex justify-content-between align-items-center text-left">
                              <div>
                                <p className="my-0">Digital Day Videoproduktion</p>
                                <small className="text-muted">RE-2018-0016</small>
                              </div>
                              <span className="order-info">
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="eye" /></span>
                                  <span>Details anzeigen</span>
                                </MDBTooltip>
                                <div className="spacer"></div>
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="file-invoice-dollar" /></span>
                                  <span>Rechnung herunterladen (PDF)</span>
                                </MDBTooltip>
                                <div className="spacer"></div>
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="dollar-sign" color="red" /></span>
                                  <span>Rechnung bezahlen</span>
                                </MDBTooltip>
                              </span>
                            </MDBListGroupItem>
                            <MDBListGroupItem hover className="d-flex justify-content-between align-items-center text-left">
                              <div>
                                <p className="my-0">Kraftwerk Schütt Videoproduktion</p>
                                <small className="text-muted">RE-2018-0015</small>
                              </div>
                              <span className="order-info">
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="eye" /></span>
                                  <span>Details anzeigen</span>
                                </MDBTooltip>
                                <div className="spacer"></div>
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="file-invoice-dollar" /></span>
                                  <span>Rechnung herunterladen (PDF)</span>
                                </MDBTooltip>
                                <div className="spacer"></div>
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="dollar-sign" color="red" /></span>
                                  <span>Rechnung bezahlen</span>
                                </MDBTooltip>
                              </span>
                            </MDBListGroupItem>
                            <MDBListGroupItem hover className="d-flex justify-content-between align-items-center text-left">
                              <div>
                                <p className="my-0">Große KELAG Videoproduktion</p>
                                <small className="text-muted">RE-2018-0014</small>
                              </div>
                              <span className="order-info">
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="eye" /></span>
                                  <span>Details anzeigen</span>
                                </MDBTooltip>
                                <div className="spacer"></div>
                                <MDBTooltip domElement tag='span' style={{ display: 'inline' }} placement="top">
                                  <span><MDBIcon icon="file-invoice-dollar" /></span>
                                  <span>Rechnung herunterladen (PDF)</span>
                                </MDBTooltip>
                              </span>
                            </MDBListGroupItem>
                          </MDBListGroup>
                        <MDBBtn color="blue" size="md" onClick={this.toggleClassicTabs1("2")}>
                          Alle Aufträge anzeigen
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  </div>
        );
    }
}

export default Dashboard;
