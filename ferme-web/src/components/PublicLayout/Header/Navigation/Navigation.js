import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../../../store/auth-context';
import classes from './Navigation.module.css';

const Navigation = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [isMobileNav, setIsMobileNav] = useState(false);

  const mobileNavigationHandler = () => {
    setIsMobileNav(!isMobileNav);
  };

  useEffect(() => {
    props.mobileNavigationHeader(isMobileNav);
  }, [isMobileNav]);

  return (
    <>
      <div classes={classes.Navigation}>
        <ul className={classes.Menu}>
          <li className={classes.MenuItem}>
            <Link to="/">
              Home
            </Link>
          </li>
          <li className={classes.MenuItem}>
            <Link to="/">
              Shop
            </Link>
          </li>
          {!isLoggedIn && (
            <>
              <li className={classes.MenuItem}>
                <Link to="/acceso">
                  Sign in
                </Link>
              </li>
              <li className={classes.MenuItem}>
                <Link to="/">
                  Sign up
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className={classes.MenuItem}>
                <button>
                  Sign out
                </button>
              </li>
            </>
          )}
          <li className={classes.MenuItemToggle}>
            <span onClick={mobileNavigationHandler}>
              Menu
            </span>
          </li>
          {/* <li className={classes.MenuItem}>
            <Link to="/">
              Orders
            </Link>
          </li>
          <li className={classes.MenuItem}>
            <Link to="/">
              Admin Product
            </Link>
          </li>
          <li className={classes.MenuItem}>
            <Link to="/">
              Add Produts
            </Link>
          </li>
          <li className={classes.MenuItem}>
            <Link to="/">
              Cart
            </Link>
          </li>
          <li className={classes.MenuItem}>
            <Link to="/">
              Profile
            </Link>
          </li>
          <li className={classes.MenuItem}>
            <Link to="/">
              Sign in
            </Link>
          </li>
          <li className={classes.MenuItem}>
            <Link to="/">
              Sign up
            </Link>
          </li>
          <li className={classes.MenuItem}>
            <Link to="/">
              Sign out
            </Link>
          </li> */}
        </ul>
      </div>
    </>
  )
};

Navigation.propTypes = {
  size: PropTypes.number,
  mobileNavigationHeader: PropTypes.func,
};

export default Navigation;