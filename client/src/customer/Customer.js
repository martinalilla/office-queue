import React from 'react';
import {Button, Alert, Badge} from 'react-bootstrap';

import api from "../api.js";

class Customer extends React.Component {
    constructor() {
        super();
        this.state = {
            // Array of strings (the name of the request type)
            // with its id as relative index
            requestTypeArray : [],

            // List of objects, each with
            // the integer that identifies the ticket ("ticketNum")
            // and the integer that identifies the request type ("reqTypeId")
            ticketList : []
        }
    }

    componentDidMount() {
        api.getAllRequestTypes().then((reqTypeList)=>{
            let reqTypeArray = [];

            for(let reqType of reqTypeList) {
                reqTypeArray[reqType.reqTypeId] = reqType.reqTypeName;
            }

            this.setState({requestTypeArray: reqTypeArray});
        })
    }

    addTicket = (reqTypeId) => {
        api.getTicket(reqTypeId).then((ticketId)=>{
            this.setState((state)=>{
               let newTicketList = [...state.ticketList] ;

               newTicketList.push({ticketNum: ticketId, reqTypeId: reqTypeId});

                return {ticketList: newTicketList};
            })
        })
    };

    render(){
        return<div  className="large_container">
            <h1 className="central_h1">OFFICE QUEUE</h1>

            <p className="central_p">Current tickets</p>
            <div>
                {
                    this.state.ticketList.map((e)=>
                        <Ticket key={e} ticketNum={e.ticketNum} reqTypeId={e.reqTypeId} reqTypeName={this.state.requestTypeArray[e.reqTypeId]}/>
                    )
                }
            </div>

            <p className="central_p">Select new ticket</p>
            <NewTicket requestTypeArray={this.state.requestTypeArray} addTicket={this.addTicket}/>
        </div>;
    }
}

class Ticket extends React.Component{
    render(){
        return <Alert variant="success">
            <p className="central_p">
                {this.props.ticketNum}
                <Badge className="ticket_badge"
                       variant="secondary">{this.props.reqTypeName}</Badge>
            </p>
        </Alert>;
    }
}

class NewTicket extends React.Component{
    render(){
        return <>
            <div id="newTicket_container">
                {
                    this.props.requestTypeArray.map((reqTypeName, reqTypeId)=>
                        <Button key={reqTypeId} className="large_button" variant="success" size="lg" block
                                onClick={()=>this.props.addTicket(reqTypeId)}>{reqTypeName}</Button>
                    )
                }
            </div>
        </>;
    }
}

export default Customer;