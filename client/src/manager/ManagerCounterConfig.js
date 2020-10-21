import React from "react";
import api from "../api";
import { Container, Row, Col, Button, Form, InputGroup, FormControl, FormLabel } from 'react-bootstrap';

class ManagerCounterConfig extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            countersList: undefined,
            allRequestTypes: undefined,
            unassignedReqTypes: undefined,
            requestTypes: undefined,
            selectedCounter: undefined,
            mode: 'new',
            input: {add: undefined, del: undefined, id: undefined, req: undefined}
        }
    }

    componentDidMount(){
        this.getCountersList();
        this.getAllRequestTypes();
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

    getRequestTypes = (id) => {
        api.getRequestTypes(id)
        .then((list) => {
            this.setState({requestTypes: list});
            this.getAllRequestTypes();

        }).catch((err) => {
            console.log('Database error', err);
        });
    }

    getAllRequestTypes = () => {
        api.getAllRequestTypes()
        .then((list) => {
            this.setState({allRequestTypes: list});
            //filter result for a list which counter doesn't serve
            let arr=[];
            list.forEach((req) => {
                        if(this.state.requestTypes !== undefined){
                            const c = this.state.requestTypes.find((a)=>{return (req.tag_name === a.request_type)})
                            if(!c) arr.push(req);
                        }
                        
                    });
            this.setState({unassignedReqTypes: arr});

        }).catch((err) => {
            console.log('Database error', err);
        });
    }

    onInputChange = (e)=>{
        if(e.target.name === 'add'){
            this.setState({input: {add: e.target.value, del: this.state.input.del}});
        }
        if(e.target.name === 'delete'){
            this.setState({input: {add: this.state.input.add, del: e.target.value}});
        }
        if(e.target.name === 'id'){
            this.setState({input: {id: e.target.value, req: this.state.input.req}});
        }

        if(e.target.name === 'req'){
            let value = e.target.value.slice(0, e.target.value.indexOf(' -'));
            this.setState({input: {id: this.state.input.id, req: value}});
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        switch(e.target.name){
            case 'addSubmit': 
                    // functionality of newCounter api is also relevant to add req type 
                    api.newCounter({id: this.state.selectedCounter, request_type: this.state.input.add})
                    .then((ok) => {
                        this.getRequestTypes(this.state.selectedCounter);
            
                    }).catch((err) => {
                        console.log('Database error', err);
                    });
                break;

            case 'del': 
                    api.deleteRequestTypeFromCounter(this.state.selectedCounter, this.state.input.del)
                    .then((ok) => {
                        this.getRequestTypes(this.state.selectedCounter);
            
                    }).catch((err) => {
                        console.log('Database error', err);
                    });
                break;

            case 'new': 
                    api.newCounter({id: this.state.input.id, request_type: this.state.input.req})
                    .then((ok) => {
                        this.setState({selectedCounter: undefined});
                        this.getCountersList();
            
                    }).catch((err) => {
                        console.log('Database error', err);
                    });
                break;

            case 'delC': 
                    api.deleteCounter(this.state.selectedCounter)
                    .then((ok) => {
                        this.setState({mode: 'new'});
                        this.getCountersList();
            
                    }).catch((err) => {
                        console.log('Database error', err);
                    });
                break;
                default: console.log('nothing to do');
        }
    }

    render(){
        return (<> 
        
            <Container>
                <h1 className="mb-4"><center>Counter Configuration</center></h1>
                <Row>
                    <Col>
                        <h4 className="mb-3">Counter list</h4>
                        <ul className="list-group mb-3">
                            {
                                this.state.countersList &&
                                this.state.countersList.map((c)=>{
<<<<<<< HEAD
                                    return <li key={c} className={this.state.selectedCounter === c ? "list-group-item cursor-h selected" : "list-group-item cursor-h"}
                                                onClick={()=>{
                                                                this.getRequestTypes(c); 
                                                                this.setState({selectedCounter: c, mode: 'modify'});
                                                                }}>
                                                <h5 className="mb-1">Counter: {c}</h5>
                                            </li>
=======
                                    return <>
                                        <li key={this.state.selectedCounter} className={this.state.selectedCounter === c ? "list-group-item cursor-h selected" : "list-group-item cursor-h"}
                                            onClick={()=>{
                                                            this.getRequestTypes(c); 
                                                            this.setState({selectedCounter: c, mode: 'modify'});
                                                            }}>
                                            <h5 className="mb-1">Counter: {c}</h5>
                                        </li>
                                    </>
>>>>>>> 8e653eaaa1f3ee45b64502e66156d322cd7ff26e
                                })
                            }
                        </ul>
                        <Col className="text-center">
                            <Button variant="success" size="lg" name="new" onClick={() => this.setState({mode: 'new', selectedCounter: undefined})}>New Counter</Button>
                        </Col>
                    </Col>
                    <Col xs={8}>
                        { 
                            this.state.mode === 'new' &&
                            <CreateCounter allRequestTypes={this.state.allRequestTypes} handleSubmit={this.handleSubmit} onInputChange={this.onInputChange} input={this.state.input}/>
                        }

                        { 
                            this.state.mode === 'modify' &&
                            <ModifyCounter requestTypes={this.state.requestTypes} onInputChange={this.onInputChange} unassignedReqTypes={this.state.unassignedReqTypes} handleSubmit={this.handleSubmit}  input={this.state.input}/>
                        }
                    </Col>
                </Row>
            </Container>
        </>);
    }
}

function CreateCounter (props) {
   
    return (<>
        <h4 className="mb-3">Create New Counter</h4>
            <Form>
                
                <Form.Group >
                    <FormLabel>Counter number</FormLabel> 
                    <FormControl type="number" name="id" defaultValue={props.input.id} onChange={e=>props.onInputChange(e)}></FormControl>
                </Form.Group>
            
                <Form.Group >
                    <FormLabel>Request type</FormLabel> 
                    <FormControl as="select" name="req" onChange={e=>props.onInputChange(e)}>
                        <option >Choose</option>
                        {
                            props.allRequestTypes && 
                            props.allRequestTypes.map(r => {
                                return <option key={r.tag_name}>{r.tag_name + ' - ' + r.service_time}</option>
                            })
                        }
                    </FormControl>      
                </Form.Group>

                <Button type="submit" variant="success" name="new" onClick={e => props.handleSubmit(e)}>Create Counter</Button>
        </Form>
    </>);
    
}

function ModifyCounter (props) {
   
    return (<>
        <h4 className="mb-3">Assigned Request types</h4>
        <ul >
            {
                props.requestTypes &&
                props.requestTypes.map((r)=>{
<<<<<<< HEAD
                    return <li key={r.request_type}>{r.request_type}</li>
=======
                    return <>
                        <li key={r.request_type}>{r.request_type}</li>
                    </>
>>>>>>> 8e653eaaa1f3ee45b64502e66156d322cd7ff26e
                })
            }
        </ul>
        <Form inline>

            <Form.Group as={Col}>
                <FormLabel><i>Modify the counter</i></FormLabel> 
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} >
                    <InputGroup className="mb-2 mr-sm-2">
                        <FormControl id="add" as="select" name="add" defaultValue={props.input.add} onChange={e=>props.onInputChange(e)}>
                            <option>Choose</option>
                            {
                                props.unassignedReqTypes && 
                                props.unassignedReqTypes.map(r => {
                                    return <option key={r.tag_name}>{r.tag_name}</option>
                                })
                            }
                        </FormControl>
                        <InputGroup.Append>
                                <Button type="submit" variant="success" name="addSubmit" onClick={e => props.handleSubmit(e)}>Add</Button>
                        </InputGroup.Append>
                    </InputGroup>

                    <InputGroup className="mb-2 mr-sm-2">
                        <FormControl id="del" as="select" name="delete" defaultValue={props.input.del} onChange={e=>props.onInputChange(e)}>
                            <option>Choose</option>
                            {
                                props.requestTypes && 
                                props.requestTypes.map(r => {
                                    return <option key={r.request_type}>{r.request_type}</option>
                                })
                            }
                        </FormControl>
                        <InputGroup.Append>
                                <Button type="submit" disabled={props.requestTypes && props.requestTypes.length === 1 ? true : false} variant="success" name="del" onClick={e => props.handleSubmit(e)}>Delete</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    
                </Form.Group>
                
            </Form.Row>
        </Form>

        <Button variant="success" size="sm" name="delC" onClick={e => props.handleSubmit(e)}>Delete Counter</Button>

    </>);
    
}



export default ManagerCounterConfig;