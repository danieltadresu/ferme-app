import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classes from './Form.module.css';
import axios from 'axios';

const Form = (props) => {

  const email = useRef();
  const password = useRef();

  const loginHandler = (event) => {
    event.preventDefault();
    const dataUser = {
      email: email.current.value,
      password: password.current.value
    };
    axios.post('https://localhost:5001/api/auth/login', dataUser)
    .then((response) => {
      const isLogin = [202].includes(response.data.status) && true;
      if (isLogin) {
        props.login(event, response.data.roleId);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <section className={classes.container_login}>
        <div>
          <form className={classes.form} onSubmit={loginHandler}>
            <div className={classes.form_item}>
              <label>
                Email
              </label>
              <input type="email" ref={email} />
            </div>
            <div className={classes.form_item}>
              <label>
                Contraseña
              </label>
              <input type="password" ref={password} />
            </div>
            <div className={classes.form_item}>
              <button className={classes.button}>
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </section>
    </>    
  )
};


Form.propTypes = {
  login: PropTypes.func,
};

Form.defaultProps = {
  login: () => {},
};

export default Form;