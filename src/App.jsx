import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import AppBar from './components/AppBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Countries from './pages/Countries';
import Profile from './pages/Profile';

import { LoginContext } from './context';

import './App.css';

import { setApiKey } from './api/api';
import ProductsView from './pages/Products';

// Call function to add APPID header into axios requests to API
setApiKey();

function App() {
  const [loginData, setLoginData] = useState(null);
  return (
    <Router>
      <LoginContext.Provider value={[loginData, setLoginData]}>
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
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/products">
              <ProductsView />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
