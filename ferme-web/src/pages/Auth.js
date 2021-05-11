import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../components/Auth/Form/Form';
import AuthContext from '../store/auth-context';

const Auth = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const login = (event) => {
    event.preventDefault();
    const expirationTime = new Date(new Date().getTime() + 10000);
    authCtx.login('token-id-1', expirationTime.toISOString());
    history.replace('/');
  }

  return (
    <>
      <Form login={login} />
    </>    
  )
};

export default Auth;