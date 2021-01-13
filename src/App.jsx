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

import ProductsView from './pages/Products';
import store from './redux/store';
import { validateTokenAsync } from './redux/user/user.actions';
import CartView from './pages/Cart';

store.dispatch(validateTokenAsync());

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
            <Route path="/cart">
              <CartView />
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
