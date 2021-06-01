import React, { useEffect, useState, useContext } from "react";
import classes from './Header.module.css';
import windowSize from '../../../utils/hooks/useWindowSize';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';
import { Badge, Menu, Dropdown, Avatar } from 'antd';
import { DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const Header = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const { width } = windowSize();
  const [ mobileNavigation, setMobileNavigation ] = useState(false);

  console.log('authCtx. :>> ', authCtx.roleAccess);
  console.log('authCtx.personId :>> ', authCtx.personId);

  const logoutHandler = () => {
    authCtx.logout();
  };

  useEffect(() => {
    setMobileNavigation(width <= 1070);
  }, [width]);

  const menu = (
    <Menu>
      <Menu.Item>
        <span target="_blank" rel="noopener noreferrer">
          Perfil
        </span>
      </Menu.Item>
      <Menu.Item>
        <span target="_blank" rel="noopener noreferrer">
          Cambiar contraseña
        </span>
      </Menu.Item>
      <Menu.Item>
        <span
          target="_blank"
          rel="noopener noreferrer"
          onClick={logoutHandler}
        >
          Cerrar sesión
        </span>
      </Menu.Item>
    </Menu>
  );

  
  return <React.Fragment>
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <div className={classes['logo-container']}>
          <a href="/" className={classes.item} style={{margin: '0', fontSize: '1rem'}}>Ferme Store</a>
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
                <NavLink activeStyle={{ fontWeight: 'bold', color: '#1890FF' }} to="/" className={classes['item-list']} exact>
                  Catalogo
                </NavLink>
              </li>
              {!isLoggedIn && (
                <>
                <li className={classes['li-item']}>
                  <NavLink activeStyle={{ fontWeight: 'bold', color: '#1890FF' }} to="/acceso" className={classes['item-list']} exact>
                    Acceso
                  </NavLink>
                </li>
                </>
              )}
              {isLoggedIn && (
                <>
                  <li className={classes['li-item']}>
                    <NavLink
                      to="/orders"
                      className={classes['item-list']}
                      activeStyle={{ fontWeight: 'bold', color: '#1890FF' }}
                    >
                      Ordenes
                    </NavLink>
                  </li>
                  {(authCtx.roleAccess === 'ADMIN' || authCtx.roleAccess === 'PROVIDER') && (
                    <li className={classes['li-item']}>
                      <NavLink
                        activeStyle={{ fontWeight: 'bold', color: '#1890FF' }}
                        to="/operations"
                        className={classes['item-list']}
                        exact
                      >
                        Operaciones
                      </NavLink>
                    </li>
                  )}
                  <li className={classes['li-item']}>
                    <NavLink
                      activeStyle={{ fontWeight: 'bold', color: '#1890FF' }}
                      to="/cart"
                      className={classes['item-list']}
                      exact
                    >
                      {/* <Badge count={1000} dot>
                        <ShoppingCartOutlined style={{color: 'white'}} />
                      </Badge> */}
                      <Badge count={5} size="large" offset={[15, 9]}>
                        <ShoppingCartOutlined style={{color: 'white', fontSize: '1.2rem'}} />
                      </Badge>
                    </NavLink>
                  </li>
                  <li className={classes['li-item-user']}>
                    <Dropdown overlay={menu}>
                      <span className={classes.item}>
                        <Avatar
                          style={{
                            color: 'white',
                            backgroundColor: '#1890FF',
                            marginRight: '5px'
                          }}
                        >
                          {authCtx.roleAccess?.charAt(0)}
                        </Avatar>
                        {authCtx.userName}
                      </span>
                    </Dropdown>
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