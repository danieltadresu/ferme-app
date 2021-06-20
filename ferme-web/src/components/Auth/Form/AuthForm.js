import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classes from "./AuthForm.module.css";
import axios from "axios";
import Header from "../../Layout/Header/Header";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Card,
  Select,
  notification,
  Modal,
  Radio,
  Spin,
  Alert,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const AuthForm = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [isCredentialsSection, setIsCredentialsSection] = useState(false);
  const [isCustomer, setIsCustomer] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = (values) => {
    const dataUser = {
      email: values.email,
      password: values.password,
    };
    axios
      .post("https://localhost:5001/api/auth/login", dataUser)
      .then((response) => {
        const isLogin = [202].includes(response.data.status) && true;
        if (isLogin) {
          props.login(
            response.data.roleName,
            response.data.personName,
            response.data.personId,
            [],
          );
        } else {
          notification["error"]({
            message: "No es posible ingresar al sistema",
            description: "El email y la contraseña ingresada no son válidos.",
          });
        }
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  };

  const data = [
    {
      "Id": 2,
      "ProductId": 1,
      "ProductQuantity": 12
    },
    {
      "Id": 1,
      "ProductId": 1,
      "'ProductQuantity": 1    
    }
  ]  
  const test = async () => {
    axios.post("https://localhost:5001/api/order", data);
  };

  const signinHandler = () => {
    setVisible(true);
  };

  const closeSigninHandler = () => {
    setVisible(false);
    setIsCredentialsSection(false);
  };

  const signinCredentialsHandler = () => {
    setIsCredentialsSection(true);
  };

  const clientTypeHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsCustomer(!isCustomer);
    }, 1000);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
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
                      message: "Ingrese Email",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  name="password"
                  label="CLAVE"
                  rules={[
                    {
                      required: true,
                      message: "Ingrese Clave",
                    },
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
                    className={classes["login-form-button"]}
                    block
                  >
                    Ingresar
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Row justify="space-around">
                    <a onClick={signinHandler}>Crea tu cuenta</a>
                    <a onClick={test}>¿Olvidaste tu contraseña?</a>
                    <Modal
                      title="Registra tu cuenta"
                      centered
                      visible={visible}
                      // onOk={() => setVisible(false)}
                      // onCancel={() => setVisible(false)}
                      onOk={closeSigninHandler}
                      onCancel={closeSigninHandler}
                      footer={[
                        <Button key="back" onClick={closeSigninHandler}>
                          Cancelar
                        </Button>,
                        <React.Fragment>
                          {!isCredentialsSection ? (
                            <Button
                              key="submit"
                              onClick={signinCredentialsHandler}
                              type="primary"
                            >
                              Siguiente
                            </Button>
                          ) : (
                            <Button
                              key="submit"
                              onClick={signinCredentialsHandler}
                              type="primary"
                            >
                              Crear Usuario
                            </Button>
                          )}
                        </React.Fragment>,
                      ]}
                      width={1000}
                    >
                      {!isCredentialsSection ? (
                        <Spin spinning={isLoading}>
                          <Form
                            form={form}
                            name="advanced_search"
                            className="ant-advanced-search-form"
                          >
                            <Form.Item
                              {...formItemLayout}
                              name="role"
                              label="CLIENTE"
                              rules={[
                                {
                                  required: true,
                                  message: "Ingrese el tipo de cliente",
                                },
                              ]}
                            >
                              <Radio.Group
                                onChange={clientTypeHandler}
                                defaultValue={1}
                                value={1}
                              >
                                <Radio value={1}>Persona Natural</Radio>
                                <Radio value={2}>Empresa</Radio>
                              </Radio.Group>
                            </Form.Item>
                            <Form.Item
                              {...formItemLayout}
                              name="firstName"
                              label={
                                isCustomer
                                  ? "Nombres"
                                  : "Nombres del Representante"
                              }
                              rules={[
                                {
                                  required: true,
                                  message: "Ingrese Nombre",
                                },
                              ]}
                            >
                              <Input placeholder="Juan Antonio" />
                            </Form.Item>
                            <Form.Item
                              {...formItemLayout}
                              name="lastName"
                              label={
                                isCustomer
                                  ? "Nombres"
                                  : "Apellidos del Representante"
                              }
                              rules={[
                                {
                                  required: true,
                                  message: "Ingrese Apellidos",
                                },
                              ]}
                            >
                              <Input placeholder="Silva Contreras" />
                            </Form.Item>
                            <Form.Item
                              {...formItemLayout}
                              name="rut"
                              label={isCustomer ? "Rut" : "Rut Empresa"}
                              rules={[
                                {
                                  required: true,
                                  message: "Ingrese rut",
                                },
                              ]}
                            >
                              <Input placeholder="11111111-1" />
                            </Form.Item>
                            <Form.Item
                              {...formItemLayout}
                              name="communeId"
                              label={isCustomer ? "Comuna" : "Ubicación"}
                              rules={[
                                {
                                  required: true,
                                  message: "Ingrese comuna",
                                },
                              ]}
                            >
                              <Select>
                                <Select.Option value="1">
                                  Santiago
                                </Select.Option>
                                <Select.Option value="2">Maipú</Select.Option>
                                <Select.Option value="3">
                                  Puente Alto
                                </Select.Option>
                                <Select.Option value="4">
                                  La Florida
                                </Select.Option>
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...formItemLayout}
                              name="address"
                              label="Dirección"
                              rules={[
                                {
                                  required: true,
                                  message: "Ingrese dirección",
                                },
                              ]}
                            >
                              <Input placeholder="Av. Jose Antonio Matta 1279" />
                            </Form.Item>
                            <Form.Item
                              {...formItemLayout}
                              name="phone"
                              label={
                                isCustomer ? "Nombres" : "Telefono de Empresa"
                              }
                              rules={[
                                {
                                  required: true,
                                  message: "Ingrese teléfono",
                                },
                              ]}
                            >
                              <Input placeholder="930290330" />
                            </Form.Item>
                          </Form>
                        </Spin>
                      ) : (
                        <Form
                          form={form}
                          name="advanced_search"
                          className="ant-advanced-search-form"
                        >
                          <section
                            style={{
                              width: "90%",
                              margin: "1rem auto",
                            }}
                          >
                            <Alert
                              message="Información"
                              showIcon
                              description="Te sugerimos que tu contraseña cuente con almenos 8 caracteres."
                              type="success"
                            />
                          </section>
                          <section
                            style={{
                              width: "90%",
                              margin: "1rem auto 3rem auto",
                            }}
                          >
                            <Alert
                              message="Información"
                              showIcon
                              description="Cuente con letras mayúsculas y minúsculas."
                              type="success"
                            />
                          </section>
                          <Form.Item
                            {...formItemLayout}
                            name="email"
                            label="Email"
                            rules={[
                              {
                                required: true,
                                message: "Ingrese email",
                              },
                            ]}
                          >
                            <Input placeholder="joseperez@gmail.com" />
                          </Form.Item>
                          <Form.Item
                            {...formItemLayout}
                            name="password"
                            label="Contraseña"
                            rules={[
                              {
                                required: true,
                                message: "Ingrese contraseña",
                              },
                            ]}
                          >
                            <Input.Password
                              prefix={
                                <LockOutlined className="site-form-item-icon" />
                              }
                              type="password"
                              placeholder="Clave"
                            />
                          </Form.Item>
                        </Form>
                      )}
                    </Modal>
                  </Row>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

AuthForm.propTypes = {
  login: PropTypes.func,
};

AuthForm.defaultProps = {
  login: () => {},
};

export default AuthForm;
