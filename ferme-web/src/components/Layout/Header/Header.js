import React, { useEffect, useState, useContext } from "react";
import classes from './Header.module.css';
import windowSize from '../../../utils/hooks/useWindowSize';
import { Link } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';

const Header = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const { width } = windowSize();
  const [ mobileNavigation, setMobileNavigation ] = useState(false);

  useEffect(() => {
    setMobileNavigation(width <= 600);
  }, [width])


  return <React.Fragment>
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <div className={classes['logo-container']}>
          <h2 href="/" className={classes.item}>Ferme Store</h2>
        </div>
        {!mobileNavigation ? (
          <div className={classes['items-container']}>
            <ul className={classes['ul-items']}>
              {/* <li className={classes['li-item']}>
                <Link to="/" className={classes['item-list']}>
                  Productos
                </Link>
              </li>
              <li className={classes['li-item']}>
                <Link to="/" className={classes['item-list']}>
                  Ordenes de Compra
                </Link>
              </li>
              <li className={classes['li-item']}>
                <Link to="/" className={classes['item-list']}>
                  Carrito
                </Link>
              </li>
               */}
              <li className={classes['li-item']}>
                <Link to="/" className={classes['item-list']}>
                  Catalogo
                </Link>
              </li>
              {!isLoggedIn && (
                <>
                <li className={classes['li-item']}>
                  <Link to="/acceso" className={classes['item-list']}>
                    Acceso
                  </Link>
                </li>
                </>
              )}
              {isLoggedIn  && (
                <>
                  <li className={classes['li-item']}>
                    <Link to="/" className={classes['item-list']}>
                      Carrito
                    </Link>
                  </li>
                  <li className={classes['li-item']}>
                    <span className={classes.item}>
                      {authCtx.roleAccess} {authCtx.userName}
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        ) : (
          <div className={classes['items-container']}>
            <span className={classes.item}>Menu</span>
          </div>
        )}
      </nav>
    </header>
  </React.Fragment>
};

export default Header;