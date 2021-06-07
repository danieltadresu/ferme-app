import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthForm from "../components/Auth/Form/AuthForm";
import SignInForm from "../components/Auth/SignInForm/SignInForm";
import AuthContext from "../store/auth-context";

const Auth = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const login = (roleAccess, userName, personId) => {
    // event.preventDefault();
    // 01 MINUTOS -> 60000 MILISEGUNDOS
    // 10 MINUTOS -> 600000 MILISEGUNDOS
    const expirationTime = new Date(new Date().getTime() + 600000);
    authCtx.login(
      `token-id-${roleAccess}`,
      expirationTime.toISOString(),
      roleAccess,
      personId,
      userName
    );
    history.replace("/");
  };

  return (
    <>
      <AuthForm login={login} />
    </>
  );
};

export default Auth;
