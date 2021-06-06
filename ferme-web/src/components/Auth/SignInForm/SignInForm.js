import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classes from './SignInForm.module.css';
import axios from 'axios';
import Header from '../../Layout/Header/Header';
import { Form, Row, Col, Input, Button, Card, Select, notification, Divider, Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const SignIn = (props) => {

  const [isCustomer, setIsCustomer] = useState(true);

  // const loginHandler = (values) => {
  //   const dataUser = {
  //     email: values.email,
  //     password: values.password,
  //   };
  //   axios.post('https://localhost:5001/api/auth/login', dataUser)
  //   .then((response) => {
  //     const isLogin = [202].includes(response.data.status) && true;
  //     if (isLogin) {
  //       props.login(
  //         response.data.roleName,
  //         response.data.personName,
  //         response.data.personId,
  //       );
  //     } else {
  //       notification['error']({
  //         message: 'No es posible ingresar al sistema',
  //         description: 'El email y la contraseña ingresada no son válidos.',
  //       });
  //     };
  //   })
  //   .catch((error) => {
  //     console.log('error :>> ', error);
  //   });
  // };

  const onFinish = (values) => {
    console.log('values :>> ', values);
  };

  const clientTypeHandler = () => {
    setIsCustomer(!isCustomer);
  };

  return (
    <>
      <Header />
      <div className={classes.signin}>
        <div className={classes.container}>
          <Row justify="center">
            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                layout="vertical"
                onFinish={onFinish}
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
                <Divider />
                <Form.Item
                  name="role"
                  label="CLIENTE"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese el tipo de cliente',
                    }
                  ]}
                >
                <Radio.Group onChange={clientTypeHandler} defaultValue={1} value={1}>
                  <Radio value={1}>Cl. Persona natural</Radio>
                  <Radio value={2}>Cl. Empresa</Radio>
                </Radio.Group>
                </Form.Item>

                {isCustomer ? (
                  <h1>Is Customer!</h1>
                ) : (
                  <h1>Is not Customer!</h1>
                )}

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={classes['login-form-button']}
                    block
                  >
                    Crear Usuario
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </>    
  )
};


SignIn.propTypes = {
  login: PropTypes.func,
  signin: PropTypes.func,
};

SignIn.defaultProps = {
  login: () => {},
  signin: () => {},
};

export default SignIn;