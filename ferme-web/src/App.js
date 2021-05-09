import React from 'react';
import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AuthContext from './store/auth-context';

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/acceso">
            <Auth />
          </Route>
        )}
        <Route path="/profile">
          {authCtx.isLoggedIn && <Profile />}
          {!authCtx.isLoggedIn && <Redirect to="/acceso" />}
        </Route>
        <Route path='*'>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
