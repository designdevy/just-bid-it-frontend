import React from 'react';
import {withRouter} from 'react-router-dom';
import Container from "reactstrap/es/Container";
import {Button, Card, Row ,Col, CardBody} from "reactstrap";
import {optioncontent} from "./MessageForm.module.css";
class MessageOption extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            username:''
        }
    }
    componentDidMount() {
        let urlparts = window.location.href.split("/");
        let username = urlparts[5];
        console.log(username);
        console.log(urlparts);
        this.setState({username:username})
    }

    render() {
        return(

            <div>
                <Container  fluid id={optioncontent} >
                    <Col>
                        <Row className="justify-content-center"> <h3> Buying was successful! Choose an action: </h3></Row>
                        <Row className="mb-3"/>
                        <Row className="justify-content-center">
                            <Col className="align-self-center p-0" xs="auto">
                                <Card id="login_form">
                                    <>  </>
                                    <CardBody style ={{width : '400px',height:'120px'}}>
                                        <Row className="d-flex justify-content-center"> <p> Would you like to send a message to {this.state.username}?</p> </Row>
                                        <br/>
                                        <Row className="d-flex justify-content-around">
                                        <Button type="button"color="muted" className="btn btn-outline-secondary" onClick={()=>this.props.history.push("/search")}>Back to search</Button>
                                        <Button type = "button" color="muted" className="btn btn-outline-secondary" onClick={()=>this.props.history.push("/messages/new/"+this.state.username)}>Send message</Button>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </Col>
                </Container>
            </div>
        )
    }
}

export default withRouter(MessageOption);