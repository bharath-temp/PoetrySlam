import React, { Component } from 'react';
import {
  BrowserRouter as Switch, Route,
} from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgotpassword" component={ForgotPassword} />
        </Switch>
      </div>
    );
  }
}

export default App;
