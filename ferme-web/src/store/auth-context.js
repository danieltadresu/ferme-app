import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer; 

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  roleAccess: '',
  personId: undefined,
  userName: '',
  userCart: [],
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
  const storedPersonId = localStorage.getItem('personId');
  const storedUserName = localStorage.getItem('userName');
  const storedUserCart = localStorage.getItem('userCart');

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('roleAccess');
    localStorage.removeItem('personId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userCart');
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
    roleAccess: storedRoleAccess,
    personId: storedPersonId,
    userName: storedUserName,
    userCart: storedUserCart,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  let initialRoleAccess;
  let initialPersonId;
  let initialUserName;
  let initialUserCart;
  if (tokenData) {
    initialToken = tokenData.token;
    initialRoleAccess = tokenData.roleAccess;
    initialPersonId = tokenData.personId;
    initialUserName = tokenData.userName;
    initialUserCart = tokenData.userCart;
  }
  const [token, setToken] = useState(initialToken);
  const [roleAccess, setRoleAccess] = useState(initialRoleAccess);
  const [personId, setPersonId] = useState(initialPersonId);
  const [userName, setUserName] = useState(initialUserName);
  const [userCart, setUserCart] = useState(initialUserCart);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setRoleAccess(null);
    setPersonId(undefined);
    setUserName(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('roleAccess');
    localStorage.removeItem('personId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userCart');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, roleAccess, personId, userName, userCart) => {
    setToken(token);
    setRoleAccess(roleAccess);
    setPersonId(personId);
    setUserName(userName);
    setUserCart(userCart);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('roleAccess', roleAccess);
    localStorage.setItem('personId', personId);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userCart', userCart);
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
    personId,
    userName,
    userCart,
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