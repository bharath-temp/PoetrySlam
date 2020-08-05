import React, { useState, useEffect } from 'react';
import './App.css';
import { Users } from './components/Users';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('users').then((res) => res.json()).then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div className="App">
      <Users users={users} />
    </div>
  );
}

export default App;
