import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../components/Auth/Form/Form';
import AuthContext from '../store/auth-context';

const Auth = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const login = (event, roleAccess, userName) => {
    event.preventDefault();
    const expirationTime = new Date(new Date().getTime() + 60000);
    authCtx.login(
      `token-id-${roleAccess}`,
      expirationTime.toISOString(),
      roleAccess,
      userName
    );
    history.replace('/');
  }

  return (
    <>
      <Form login={login} />
    </>    
  )
};

export default Auth;