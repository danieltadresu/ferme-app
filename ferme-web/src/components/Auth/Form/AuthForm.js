import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classes from './AuthForm.module.css';
import axios from 'axios';
import Header from '../../Layout/Header/Header';
import { Form, Row, Col, Input, Button, Card, Select, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const AuthForm = (props) => {

  const loginHandler = (values) => {
    const dataUser = {
      email: values.email,
      password: values.password,
    };
    axios.post('https://localhost:5001/api/auth/login', dataUser)
    .then((response) => {
      const isLogin = [202].includes(response.data.status) && true;
      if (isLogin) {
        props.login(
          response.data.roleName,
          response.data.personName,
          response.data.personId,
        );
      } else {
        notification['error']({
          message: 'No es posible ingresar al sistema',
          description: 'El email y la contraseña ingresada no son válidos.',
        });
      };
    })
    .catch((error) => {
      console.log('error :>> ', error);
    });
  };

  return (
    <>
      <Header />
      <div className={classes.login}>
        <div className={classes.container}>
          <Row justify="center">
            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                layout="vertical"
                onFinish={loginHandler}
              >
                <Form.Item
                  name="email"
                  label="EMAIL"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese Email',
                    }
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  name="password"
                  label="CLAVE"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese Clave',
                    }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Clave"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={classes['login-form-button']}
                    block
                  >
                    Ingresar
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Row justify="space-around">
                    <a onClick={props.signin}>Crea una cuenta</a>
                    <a>¿Olvidaste tu contraseña?</a>
                  </Row>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </>    
  )
};


AuthForm.propTypes = {
  login: PropTypes.func,
  signin: PropTypes.func,
};

AuthForm.defaultProps = {
  login: () => {},
  signin: () => {},
};

export default AuthForm;