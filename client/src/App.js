import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

import './App.css';

import Counter from "./counter/Counter.js";
import Customer from "./customer/Customer.js";
import Manager from "./manager/Manager.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

            <Route path={"/manager"}>
                <Manager/>
            </Route>

            <Route path={"/counter"}>
                <Counter/>
            </Route>

            <Route path={"/"}>
                <Customer/>
            </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
