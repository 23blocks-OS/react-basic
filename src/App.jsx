import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import AppBar from './components/AppBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Countries from './pages/Countries';

import './App.css';

import { setApiKey } from './api/api';

setApiKey();

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/countries">
            <Countries />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
