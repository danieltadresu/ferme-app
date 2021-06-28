import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Tag,
  Row,
  Badge,
  Col,
  Radio,
  Select,
  Divider,
  Button,
  Alert,
  notification,
} from "antd";
import classes from "./SigninForm.module.css";
import { LockOutlined } from "@ant-design/icons";
import axios from "axios";

const SigninForm = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [clientType, setClientType] = useState();
  const [clientAccess, setClientAccess] = useState(false);
  const [clientData, setClientData] = useState();
  const [clientAccessData, setClientAccessData] = useState();

  const onAddClientTypeHandler = (roleId) => {
    setClientType(roleId);
  };

  const signinHandler = (values) => {
    setClientAccess(true);
    // setClientData(values);
    if (clientData) {
      setClientAccessData(values);
    } else {
      setClientData(values);
    }
  };

  useEffect(async () => {
    if (clientData && clientAccessData) {
      axios
        .post("https://localhost:5001/api/auth/signin", {
          ...clientData,
          email: clientAccessData.email,
          password: clientAccessData.password,
          personRoleId: clientType,
        })
        .then((response) => {
          notification['success']({
            message: 'Información',
            description:
              'Registro exitoso.',
          });
          history.replace("/");
        }).catch((e) => {
          notification['error']({
            message: 'Error',
            description:
              'Intentelo más tarde.',
          });
        });
    }
  }, [clientAccessData]);

  return (
    <React.Fragment>
      <h1 style={{ margin: "0 0 2rem 0" }}>Regístrate</h1>
      {!clientType ? (
        <>
          <Badge.Ribbon text="Recibirás boleta en tu compra">
            <Card
              hoverable
              style={{ width: "100%", margin: "1rem 0" }}
              onClick={() => onAddClientTypeHandler(3)}
            >
              <Card.Meta
                title={
                  <Row style={{ margin: "1rem 0" }}>
                    <Tag color="geekblue">CLIENTE PERSONA NATURAL</Tag>
                  </Row>
                }
                description="Compra online con despacho y retiro en tienda."
              />
            </Card>
          </Badge.Ribbon>
          <Badge.Ribbon text="Recibirás facturas en tu compras">
            <Card
              hoverable
              style={{ width: "100%", margin: "1rem 0" }}
              onClick={() => onAddClientTypeHandler(4)}
            >
              <Card.Meta
                title={
                  <Row style={{ margin: "1rem 0" }}>
                    <Tag color="geekblue">CLIENTE EMPRESA</Tag>
                  </Row>
                }
                description="Mejores precios comprando productos por mayor."
              />
            </Card>
          </Badge.Ribbon>
          <Badge.Ribbon text="">
            <Card
              hoverable
              style={{ width: "100%", margin: "1rem 0" }}
              // onClick={() => onAddProvider(p.id)}
            >
              <Card.Meta
                title={
                  <Row style={{ margin: "1rem 0" }}>
                    <Tag color="geekblue">¿ERES PROVEEDOR?</Tag>
                  </Row>
                }
                description="Crea una cuenta y regístra tus productos"
              />
            </Card>
          </Badge.Ribbon>
        </>
      ) : (
        <>
          <Divider orientation="left">
            <p style={{ fontSize: ".8rem" }}>
              {clientType === 3 && "CLIENTE PERSONA NATURAL"}
              {clientType === 4 && "CLIENTE EMPRESA"}
            </p>
          </Divider>
          <Form
            layout="vertical"
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={signinHandler}
            initialValues={{ remember: true }}
          >
            {!clientAccess ? (
              <>
                <Form.Item
                  name="firstName"
                  label={
                    clientType === 3 ? "Nombres" : "Nombres del representante"
                  }
                  rules={[
                    {
                      required: true,
                      message: "Ingrese nombres",
                    },
                  ]}
                >
                  <Input placeholder="Juan Manuel" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  label={
                    clientType === 3
                      ? "Apellidos"
                      : "Apellidos del representante"
                  }
                  rules={[
                    {
                      required: true,
                      message: "Ingrese apellidos",
                    },
                  ]}
                >
                  <Input placeholder="Silva Contreras" />
                </Form.Item>
                <Form.Item
                  name="rut"
                  label={clientType === 3 ? "Rut" : "Rut Empresa"}
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
                  name="communeId"
                  label={clientType === 3 ? "Dirección" : "Ubicación"}
                  rules={[
                    {
                      required: true,
                      message: "Ingrese dirección",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="1">Santiago</Select.Option>
                    <Select.Option value="2">Maipú</Select.Option>
                    <Select.Option value="3">Puente Alto</Select.Option>
                    <Select.Option value="4">La Florida</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
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
                  name="phone"
                  label={clientType === 3 ? "Telefono" : "Telefono empresa"}
                  rules={[
                    {
                      required: true,
                      message: "Ingrese teléfono",
                    },
                  ]}
                >
                  <Input placeholder="930290330" />
                </Form.Item>
                <Form.Item>
                  <Row justify="space-around">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={classes["login-form-button"]}
                      block
                    >
                      Ingresar
                    </Button>
                  </Row>
                </Form.Item>
              </>
            ) : (
              <>
                <section
                  style={{
                    width: "90%",
                    margin: "1rem auto",
                  }}
                >
                  <Alert
                    message="Te sugerimos que tu contraseña cuente con almenos 8 caracteres."
                    showIcon
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
                    message="Cuente con letras mayúsculas y minúsculas"
                    showIcon
                    // description="Cuente con letras mayúsculas y minúsculas."
                    type="success"
                  />
                </section>
                <Form.Item
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
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Clave"
                  />
                </Form.Item>
                <Form.Item>
                  <Row justify="space-around">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={classes["login-form-button"]}
                      block
                    >
                      Ingresar
                    </Button>
                  </Row>
                </Form.Item>
              </>
            )}
          </Form>
          <Divider />
        </>
      )}
    </React.Fragment>
  );
};

// SigninForm.propTypes = {
//   setIsVisible: PropTypes.func,
// };

// SigninForm.defaultProps = {
//   setIsVisible: () => {},
// };

export default SigninForm;
