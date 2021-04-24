import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const orderHandler = (value) => {
    setIsVisible(value);
    const fetchUsers = new Promise((resolve) => {
      fetch('https://localhost:5001/api/user/all')
        .then(response => response.json())
        .then((data) => {
          resolve(data)
        });
    });

    fetchUsers.then((responseData) => {
      setAllUsers(responseData);
    })
    
  };

  return (
    <div className="App">
      {!isVisible && 
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            React <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            rel="noopener noreferrer"
            onClick={() => orderHandler(true)}
          >
            Haz click acá para enviar solicitudes HTTP al servidor
          </a>
        </header>}
        {isVisible && 
        <header className="App-users">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-users-link"
            rel="noopener noreferrer"
            style={{margin: '1rem 0'}}
            onClick={() => orderHandler(false)}
          >
            Volver atrás
          </a>
          {allUsers.length > 0 && allUsers.map((item) => (
            <div
              style={
                {maxWidth: '900px', 
                margin: '2rem 0',
              }}
            >
              <p style={{margin: '0px', padding: '0px'}}>
                {item.userId} {item.name}
              </p>
            </div>
          ))}
        </header>}
    </div>
  );
}

export default App;
