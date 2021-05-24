import React from 'react';
import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Operations from './pages/Operations';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import AuthContext from './store/auth-context';

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Switch>

        {/* HOME */}
        <Route path="/" exact>
          <Home />
        </Route>

        {/* AUTHENTICATION */}
        {!authCtx.isLoggedIn && (
          <Route path="/acceso">
            <Auth />
          </Route>
        )}

        {/* PROFILE */}
        <Route path="/profile">
          {authCtx.isLoggedIn && <Profile />}
          {!authCtx.isLoggedIn && <Redirect to="/acceso" />}
        </Route>

        {/* OPERATIONS */}
        <Route path="/operations">
          {authCtx.isLoggedIn && <Operations />}
          {!authCtx.isLoggedIn && <Redirect to="/acceso" />}
        </Route>

        {/* ORDERS */}
        <Route path="/orders">
          {authCtx.isLoggedIn && <Orders />}
          {!authCtx.isLoggedIn && <Redirect to="/acceso" />}
        </Route>

        {/* 
          PURCHASE. 
          TO DO: Validar que en localStorage existan productos 
          seleccionados, si no existen, renderizar hacia otra
          Pagina la cual muestre un determinado mensaje
        */}
        
        <Route path="/checkout/:id">
          {authCtx.isLoggedIn && <Checkout />}
          {!authCtx.isLoggedIn && <Redirect to="/acceso" />}
        </Route>

        {/* NOT FOUND */}
        <Route path='*'>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
