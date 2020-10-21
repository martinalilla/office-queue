import React from "react";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import api from "../api.js";

class ManagerReqtypeConfig extends React.Component {
    constructor() {
        super();
        this.state = {
            requestTypeList: [],
            selectedRequestType: {
                isNew: true,
                reqTypeId: '',
                tagName: '',
                serviceTime: '',
            }
        }
    }

    componentDidMount() {
        api.getAllRequestTypes().then((reqTypeList) => {
            this.setState({ requestTypeList: reqTypeList });
        })
    }

    deleteRequestType = (reqTypeId) => {
        const currentRequestTypes = this.state.requestTypeList;

        // Optimistic update
        this.setState({
            requestTypeList: currentRequestTypes.filter(rt => rt.reqTypeId !== reqTypeId)
        })

        // In case the server do not delete the request type, rollback the state
        api.deleteRequestType(reqTypeId).then(response => {
            // TODO: refactor
            // if(response) {
                // this.setState({
                //     requestTypeList: currentRequestTypes
                // })
            // }

            api.getAllRequestTypes().then((reqTypeList) => {
                this.setState({ requestTypeList: reqTypeList });
            })
        })
    }

    loadNewForm() {
        this.setState(prevState => {
            return {
                requestTypeList: prevState.requestTypeList,
                selectedRequestType: {
                    isNew: true,
                    reqTypeId: '',
                    tagName: '',
                    serviceTime: '',
                }
            }
        })
    }

    loadEditForm = (reqTypeId, tagName, serviceTime) => {
        this.setState(prevState => {
            return {
                requestTypeList: prevState.requestTypeList,
                selectedRequestType: {
                    isNew: false,
                    reqTypeId: reqTypeId,
                    tagName: tagName,
                    serviceTime: serviceTime,
                }
            }
        })
    }

    submitForm = (reqTypeId, tagName, serviceTime, isNew) => {
        // New Request Type
        if(isNew) {
            var reqType = {tag_name: tagName, service_time: serviceTime}

            api.newRequestType(reqType).then(response => {
                // TODO: refactor
                // if(true) {
                    api.getAllRequestTypes().then((reqTypeList) => {
                        this.setState({ requestTypeList: reqTypeList });
                    })
                // }
            })
        
        // Update Request Type
        } else {
            reqType = {reqTypeId: reqTypeId, tag_name: tagName, service_time: serviceTime}

            api.updateRequestType(reqType).then(response => {
                // TODO: refactor
                // if(true) {
                    api.getAllRequestTypes().then((reqTypeList) => {
                        this.setState({ requestTypeList: reqTypeList });
                    })
                // }
            })
        }
    }

    render() {
        return (
            <Container>
                <h1 className="mb-4">REQUEST TYPE CONFIGURATION</h1>
                <Row>
                    <Col>
                        <h4 className="mb-3">Request type list</h4>
                        <ul className="list-group mb-3">
                            {
                                this.state.requestTypeList.map((requestType) =>
                                    <RequestType key={requestType.tag_name} reqTypeId={requestType.tag_name} tagName={requestType.tag_name}
                                        serviceTime={requestType.service_time} deleteRequestType={this.deleteRequestType} editRequestType={this.loadEditForm} />
                                )
                            }
                        </ul>
                        <Col className="text-center">
                            <Button onClick={() => this.loadNewForm()} variant="success" size="lg">Add new</Button>
                        </Col>
                    </Col>
                    <Col xs={8}>
                        <RequestTypeForm selectedRequestType={this.state.selectedRequestType} submitForm={this.submitForm}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

class RequestType extends React.Component {
    render() {
        return (
            <li className="list-group-item">
                <h5 className="mb-1">{this.props.tagName}</h5>
                <p>
                    <span className="font-weight-bold">Service time: </span>
                    <span>{this.props.serviceTime} minutes</span>
                </p>
                <div className="d-flex justify-content-between">
                    <Button variant="outline-danger" onClick={() => this.props.deleteRequestType(this.props.reqTypeId)}>Delete</Button>
                    <Button variant="primary" onClick={() => this.props.editRequestType(this.props.reqTypeId, this.props.tagName, this.props.serviceTime)}>Edit</Button>
                </div>
            </li>
        );
    }
}

class RequestTypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reqTypeId: '',
            tagName: '',
            serviceTime: '',
        }
    }

    componentDidMount() {
        this.setState({ 
            reqTypeId: this.props.selectedRequestType.reqTypeId,
            tagName: this.props.selectedRequestType.tagName,
            serviceTime: this.props.selectedRequestType.serviceTime,
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedRequestType.reqTypeId !== prevProps.selectedRequestType.reqTypeId) {
            this.setState({ 
                reqTypeId: this.props.selectedRequestType.reqTypeId,
                tagName: this.props.selectedRequestType.tagName,
                serviceTime: this.props.selectedRequestType.serviceTime,
            });
        }
      }

    updateTagName = (event) => {
        this.setState({
            tagName: event.target.value
        });
    }

    updateServiceTime = (event) => {
        this.setState({
            serviceTime: event.target.value
        });
    }

    render() {
        return (
            <Form>
                <h4 className="mb-3">{this.props.selectedRequestType.isNew ? 'Add new Request Type' : 'Edit Request Type: ' + this.props.selectedRequestType.tagName}</h4>
                <Form.Group controlId="formTagName">
                    <Form.Label>Tag name</Form.Label>
                    <Form.Control type="text" placeholder="Enter the tagname" onChange={this.updateTagName} value={this.state.tagName}/>
                    <Form.Text className="text-muted">
                        The tag name identifies the request type.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formServiceTime">
                    <Form.Label>Service Time</Form.Label>
                    <Form.Control type="number" placeholder="Enter the service time" min="1" onChange={this.updateServiceTime} value={this.state.serviceTime}/>
                    <Form.Text className="text-muted">
                        The service time is an estimation of the average time needed to process this request type.
                    </Form.Text>
                </Form.Group>
                <Col className="text-center">
                    <Button variant="success" size="lg" onClick={() => this.props.submitForm(this.state.reqTypeId, this.state.tagName, this.state.serviceTime, this.props.selectedRequestType.isNew)}>Submit</Button>
                </Col>
            </Form>
        );
    }
}

export default ManagerReqtypeConfig;