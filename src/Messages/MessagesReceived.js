import React from 'react';
import {Card, Col, Container, Row} from "reactstrap";
import { withRouter } from 'react-router-dom';
// import styles from "../MyAuctions/OwnerAuctionItem.module.css";
import {received} from "./MessageForm.module.css";
import $ from "jquery";
//import {divIcon} from "leaflet/dist/leaflet-src.esm";
import {getUserInfoField} from "../Utility/Utility";
import produce from 'immer';

class MessagesReceived extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            messages:[]
        }
    }
    componentDidMount(){
        this.showreceived();
    }

    showreceived(){

        $.ajax({
            url: "http://localhost:8765/app/api/messages/received",
            dataType : 'json',
            type: 'GET',
            data: {userId:getUserInfoField("id")}

        })
            .then(json => {
                console.log(json)
                console.log(json.results);
                this.setState({messages:json.messages},
                    ()=>this.props.counterHandler())
                // this.props.messages(json.messages);
            })
            .fail(err=>{
                console.log(err);
            })
    }

    deleteHandler = (id) =>{
        if(!window.confirm(`Are you sure you want to delete this message?`)) return;
        console.log(id);
        $.ajax({
            url: "http://localhost:8765/app/api/messages/"+id+"/delete" ,
            dataType : 'json',
            type: 'DELETE'
        })
            .then(json => {
                console.log(json)
                this.setState(
                    produce(draft=>{
                        draft.messages = this.state.messages.filter((elem, index)=>
                        {if(elem.id !== id) return elem}
                        )
                    })
                )
            })
            .fail(err=>{
                console.log(err);
            })
    }

    render()
    {
        return(
                <Container fluid id={received} >
                    {this.state.messages.length === 0 &&<Row className="d-flex justify-content-center"> <p>No messages.</p></Row>}
                    {this.state.messages.map((message,index) =>{
                        return(
                        <Row  key={index} className="d-flex justify-content-center">
                            <Card style ={{width : '600px' , marginTop:'30px' , marginBottom:'30px'}} >
                                <Col>
                                    <br/>
                                    <Row className="d-flex justify-content-around">
                                        <Col className="d-flex justify-content-start" >
                                            <h4>From: {message.sender} </h4>
                                        </Col>
                                        <Col className="d-flex justify-content-end" >
                                            <button type="button" color="muted" className="btn btn-outline-secondary" onClick={()=> this.deleteHandler(message.id)}> Delete</button>
                                            <button type="button" color="muted" className="btn btn-outline-secondary" onClick={()=>this.props.history.push("/messages/new/"+message.sender)}> Reply </button>
                                        </Col>

                                    </Row>
                                    <Row className="d-flex justify-content-around">
                                        <Col className="d-flex justify-content-start" >
                                            <p>Sent: Dec-10-01 22:56{message.date}</p>

                                        </Col>
                                    </Row>
                                    <hr/>
                                    <br/>
                                    <Row className="d-flex justify-content-between">
                                        <Col className="d-flex justify-content-start" >
                                        " <h5>{message.text}</h5> ."
                                        </Col>
                                    </Row>
                                    <br/>
                                </Col>
                            </Card>
                        </Row>
                        )
                        }
                    )}
                </Container>

        );
    }
}


export default withRouter(MessagesReceived);