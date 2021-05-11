import { useContext } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';
import classes from './PublicLayout.module.css';
const PublicLayout = () => {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <>
      <div className={classes.container_public_layout}>
        <header className={classes.header}>
          <ul className={classes.menu}>
            <li className={classes.menu_item}>
              <Link to="/">Home</Link>
            </li>
            {!isLoggedIn && (
              <>
                <li className={classes.menu_item}>
                  <Link to="/acceso">Sign in</Link>
                </li>
                <li>
                  <Link to="/">Sign up</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className={classes.menu_item}>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className={classes.menu_item}>
                <button onClick={logoutHandler}>
                  Sign out
                </button>
              </li>
            )}
          </ul>
        </header>
        <section>
          <p>1. LANDING PAGE</p>
          <p>2. LISTA DE CATEGORÍAS</p>
          <p>3. LISTA DE PRODUCTOS MAS VENDIDOS</p>
          <p>4. CONTACTO</p>
          <p>5. FOOTER</p>
        </section>
      </div>
    </>
  )
};

export default PublicLayout;