import { useContext } from 'react';
import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';
const PublicLayout = () => {
  const authCtx = useContext(AuthContext)
  const { Header, Content } = Layout;
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <>
      <Layout>
        <Header>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link to="/acceso">Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <button onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </Header>
        <Content>
          <p>Content</p>
        </Content>
      </Layout>
    </>
  )
};

export default PublicLayout;