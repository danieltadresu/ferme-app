import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm/AuthForm";
import AuthContext from "../store/auth-context";

const Auth = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const login = (roleAccess, userName, personId, userCart) => {
    // event.preventDefault();
    // 01 MINUTOS -> 60000 MILISEGUNDOS
    // 10 MINUTOS -> 6000000 MILISEGUNDOS
    const expirationTime = new Date(new Date().getTime() + 6000000);
    authCtx.login(
      `token-id-${roleAccess}`,
      expirationTime.toISOString(),
      roleAccess,
      personId,
      userName,
      userCart,
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
