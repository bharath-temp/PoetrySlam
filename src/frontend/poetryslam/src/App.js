import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [Name, setName] = useState(0);

  useEffect(() => {
    fetch('name/?first_name=priyank&last_name=b').then((res) => res.json()).then((data) => {
      setName(data.first_name);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Welcome
          {' '}
          {Name}
        </a>
      </header>
    </div>
  );
}

export default App;
