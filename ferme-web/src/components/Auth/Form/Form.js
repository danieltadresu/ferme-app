import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classes from './Form.module.css';
import axios from 'axios';
import Header from '../../../components/Layout/Header/Header';
import Button from '../../UI/Button/Button';

import 'antd/dist/antd.css';

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
      console.log('response :>> ', response);
      const isLogin = [202].includes(response.data.status) && true;
      if (isLogin) {
        props.login(
          event, 
          response.data.roleName,
          response.data.personName,
          response.data.personId,
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <Header />
      <section className={classes.container_login}>
        <div>
          <form className={classes.form} onSubmit={loginHandler}>
            <div className={classes.form_item}>
              <label>
                Email
              </label>
              <input type="email" ref={email} style={{display: 'block', padding: '.8rem .8rem', height: '.7rem', border: '1px solid black'}} />
            </div>
            <div className={classes.form_item}>
              <label>
                Contraseña
              </label>
              <input type="password" ref={password} style={{display: 'block', padding: '.8rem .8rem', height: '.7rem'}} />
            </div>
            <div className={classes.form_item_botton}>
              {/* <button className={classes.button}>
                Ingresar
              </button> */}
              <Button title="Ingresar" type="success" />
            </div>
            <div className={classes.form_item_account}>
              <span className={classes.create_account}>Crea una cuenta</span>
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