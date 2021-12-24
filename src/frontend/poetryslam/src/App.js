/* eslint-disable import/no-cycle */
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Users from './components/Users';
import Userform from './components/Userform';
import Login from './components/Login';
import Userpoemfeed from './components/Userpoemfeed';
import Navbar from './components/Navbar';

export const AuthContext = React.createContext();

const initialState = {
  token: 'none',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.token);
      console.log('ooga');
      console.log(localStorage.getItem('token'));
      // console.log(action.token);
      console.log('booga');
      return {
        ...state,
        token: action.token,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/users" component={Users} />
            <Route path="/signup" component={Userform} />
            <Route path="/login" component={Login} />
            <Route path="/me/poems" component={Userpoemfeed} />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

const Home = () => (
  <div className="App">
    <Navbar />
    <h1>Home Page</h1>
  </div>
);

export default App;
