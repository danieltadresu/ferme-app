import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';

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
      console.log('responseData :>> ', responseData);
    })
  };

  const submitHandler = () => {
    const userData = {
      userId: 100,
      name: 'Daniel'
    };
    const response = new Promise((resolve) => {
      fetch('https://localhost:5001/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((responseData) => {
        resolve(responseData);
      })
    })
    response.then((data) => {
      console.log(data);
    })
  };


  return (
    <div className="App">
      <Button onClick={orderHandler}>
        Click me
      </Button>

      <Button onClick={submitHandler}>
        Click me
      </Button>
    </div>
  );
}

export default App;
