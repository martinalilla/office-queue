import React from 'react';
import {Navbar, Nav, Button, Container, Col, Row} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ManagerCounterConfig from "./ManagerCounterConfig";
import ManagerReqtypeConfig from "./ManagerReqtypeConfig";

class Manager extends React.Component {
    render(){
        return<>
            <ManagerNavbar/>
            <Router>
                <Switch>

                    <Route path={"/manager/counterconfig"}>
                        <ManagerCounterConfig/>
                    </Route>

                    <Route path={"/manager/reqtypeconfig"}>
                        <ManagerReqtypeConfig/>
                    </Route>

                    <Route path={"/manager"}>
                        <ManagerMain/>
                    </Route>

                </Switch>
            </Router>
        </>;
    }
}

class ManagerNavbar extends React.Component{
    render(){
        return<Navbar bg="dark" variant="dark">
            <Navbar.Brand className="navbar_brand" href="/manager">OQ - Manager</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/manager/counterconfig">Counter configuration</Nav.Link>
                <Nav.Link href="/manager/reqtypeconfig">Request type configuration</Nav.Link>
            </Nav>
        </Navbar>;
    }
}

class ManagerMain extends React.Component{
    render(){
        return<>
            <h1 className="central_h1">Manager dashboard</h1>
            <p className="central_p">Here you can configure your office queue and see statistics about previous days</p>
            <Container fluid={true} className="large_button_container">
                <Row>
                    <Col>
                        <Button className="large_button" href="/manager/counterconfig" variant="success" size="lg" block>Configure your counters</Button>
                    </Col>
                    <Col>
                        <Button className="large_button" href="/manager/reqtypeconfig" variant="success" size="lg" block>Configure your request types</Button>
                    </Col>
                </Row>
            </Container>
        </>;
    }
}

export default Manager;