import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classes from './Form.module.css';

const Form = (props) => {

  const email = useRef();
  const password = useRef();

  const loginHandler = (event) => {
    event.preventDefault();
    const dataUser = {
      email: email.current.value,
      password: password.current.value
    };
    console.log(dataUser);
    const response = new Promise((resolve) => {
      fetch('https://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataUser)
      })
      .then((responseData) => {
        resolve(responseData);
      })
    })
    response.then((data) => {
      if (data.status === 200) {
        props.login(event);
      }
    })
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