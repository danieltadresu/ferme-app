import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const Auth = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log('Hello-world');
    console.log('emailInputRef :>> ', emailInputRef);
    console.log('passwordInputRef :>> ', passwordInputRef);
    const expirationTime = new Date(new Date().getTime() + 10000);
    console.log('expirationTime :>> ', expirationTime);
    console.log('expirationTime.toISOString() :>> ', expirationTime.toISOString());
    authCtx.login('token-id-1', expirationTime.toISOString());
    history.replace('/');
  }

  return (
    <>
      <section>
        <form onSubmit={submitHandler}>
          <div>
            <label>
              Email
            </label>
            <input ref={emailInputRef} />
          </div>
          <div>
            <label>
              Contraseña
            </label>
            <input ref={passwordInputRef} />
          </div>
          <div>
            <button>Ingresar</button>
          </div>
        </form>
      </section>
    </>
  )
};

export default Auth;