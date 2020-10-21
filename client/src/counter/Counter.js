import React from 'react';
import api from "../api";
import { Container, Row, Col, Button } from 'react-bootstrap';

class Counter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            countersList: undefined,
            selectedCounter: undefined,
        }
    }

    componentDidMount(){
        this.getCountersList();
    }

    getCountersList = () => {
        api.getAllCountersList()
        .then((list) => {
            //filter result for unique list
            let arr=[];
            list.forEach((counter) => {
                const c = arr.find((a)=>{return (counter.id === a)})
                if(!c) arr.push(counter.id);
            });
            this.setState({countersList: arr.sort()});

        }).catch((err) => {
            console.log('Database error', err);
        });
        
    }

    render(){
        return<>
            <Container>
                <h1 className="mb-4"><center>Counter page</center></h1>
                <Row>
                    <Col>
                        <h4 className="mb-3">Counter list</h4>
                        <ul className="list-group mb-3">
                            {
                                this.state.countersList &&
                                this.state.countersList.map((c)=>{
                                    return <li key={c} className={this.state.selectedCounter === c ? "list-group-item cursor-h selected" : "list-group-item cursor-h"}
                                                onClick={()=>{this.setState({selectedCounter: c});}} >
                                                <h5 className="mb-1">Counter: {c}</h5>
                                            </li>
                                })
                            }
                        </ul>
                    </Col>
                    <Col xs={8}>
                        <h2><i>Counter: {this.state.selectedCounter}</i></h2>
                        <h3>Ticket in process:</h3>
                        <h2>No:</h2>
                       <Button variant="success" size="lg">Next Customer</Button>
                    </Col>
                </Row>
            </Container>
        </>;
    }
}

export default Counter;