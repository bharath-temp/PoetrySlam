import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Users from './components/Users';
import Userform from './components/Userform';
import Login from './components/Login';
import Userpoemfeed from './components/Userpoemfeed';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/users/form" component={Userform} />
          <Route path="/login" component={Login} />
          <Route path="/me/poems" component={Userpoemfeed} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
);

export default App;
