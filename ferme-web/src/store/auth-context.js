import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer; 

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  roleAccess: '',
  userName: '',
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
}

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');
  const storedRoleAccess = localStorage.getItem('roleAccess');
  const storedUserName = localStorage.getItem('userName');

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('roleAccess');
    localStorage.removeItem('userName');
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
    roleAccess: storedRoleAccess,
    userName: storedUserName,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  let initialRoleAccess;
  let initialUserName;
  if (tokenData) {
    initialToken = tokenData.token;
    initialRoleAccess = tokenData.roleAccess;
    initialUserName = tokenData.userName;
  }
  const [token, setToken] = useState(initialToken);
  const [roleAccess, setRoleAccess] = useState(initialRoleAccess);
  const [userName, setUserName] = useState(initialUserName);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setRoleAccess(null);
    setUserName(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('roleAccess');
    localStorage.removeItem('userName');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, roleAccess, userName) => {
    setToken(token);
    setRoleAccess(roleAccess);
    setUserName(userName);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('roleAccess', roleAccess);
    localStorage.setItem('userName', userName);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    roleAccess,
    userName,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;