import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../components/Auth/Form/Form';
import AuthContext from '../store/auth-context';

const Auth = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const login = (event, roleAccess) => {
    event.preventDefault();
    const expirationTime = new Date(new Date().getTime() + 10000);
    authCtx.login(`token-id-${roleAccess}`, expirationTime.toISOString());
    history.replace('/');
  }

  return (
    <>
      <Form login={login} />
    </>    
  )
};

export default Auth;