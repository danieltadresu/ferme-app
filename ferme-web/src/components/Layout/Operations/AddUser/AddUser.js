import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Button, Card, Select, notification, List, Divider, Tag } from 'antd';
import { UserOutlined, CopyOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import classes from './AddUser.module.css'
import axios from 'axios';
const AddUser = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [ selectedUserRole, setSelectedUserRole ] = useState(false);
  const [ selectedUserRoleId, setSelectedUserRoleId ] = useState(undefined);

  const onFinish = (values) => {
    console.log('selectedUserRoleId :>> ', selectedUserRoleId);
    let dataUser = values
    dataUser.personRoleId = selectedUserRoleId;
    console.log('dataProduct :>> ', dataUser);
    axios.post('https://localhost:5001/api/person', dataUser)
    .then((response) => {
      console.log('repsonse :>> ', response);
    });
  };

  const selectedItemHandler = (val) => {
    props.selectedItem(val);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };

  const roles = [
    {
      id: 1,
      title: 'Administrador',
      roleDescription: `Puede comprar productos. Posee acceso a todos los módulos del sistema,
        pudiendo ingresar nuevos productos, generar nuevas boletas y órdenes 
        de compra, creación de usuarios y más.`,
    },
    {
      id: 5,
      title: 'Empleado',
      roleDescription: `Puede comprar Productos. Puede generar nuevas boletas, las cuales corresponden
        a las compras que se realizan presencialmente en la Ferretería.`,
    },
    {
      id: 2,
      title: 'Proveedor',
      roleDescription: `Puede comprar Productos. Posee acceso al módulo de ordenes de compra, donde 
        puede ingresar nuevos productos, eliminar, actualizar y buscar información de Productos.`,
    },
    // {
    //   title: 'Cliente personal natural',
    //   roleDescription: '',
    // },
    // {
    //   title: 'Cliente empresa',
    //   roleDescription: '',
    // },
  ];

  const selectRoleHandler = (roleId) => {
    console.log('roleId :>> ', roleId);
    setSelectedUserRoleId(roleId);
    setSelectedUserRole(true);
  };

  return (
    <div className={classes['add-user']}>
      <div className={classes.container}>
        <Card
          type="inner"
          title="Creación de Usuario"
          extra={
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => selectedItemHandler(0)}
            >
              Volver
            </Button>
          }
          style={{ width: '90%', margin: '0 auto' }}
        >
          {!selectedUserRole ? (
            <React.Fragment>
              <Divider orientation="center">
                <Tag icon={<CopyOutlined />} color="geekblue">
                  Rol de Usuario
                </Tag>
              </Divider>
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <List 
                    itemLayout="horizontal"
                    dataSource={roles}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<UserOutlined />}
                          title={<span style={{ cursor: 'pointer' }} onClick={() => selectRoleHandler(item.id)}>{item.title}</span>}
                          description={item.roleDescription}
                        />
                        {/* onClick={() => dowloadDocumentHandler(id)} */}
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                onFinish={onFinish}
              >
                <Divider orientation="center">
                  <Tag icon={<UserOutlined />} color="geekblue">
                    Datos particulares
                  </Tag>
                </Divider>
                <Form.Item
                  {...formItemLayout}
                  name="id"
                  label="ID"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese ID',
                    }
                  ]}
                >
                  <Input placeholder="1" />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  name="firstName"
                  label="Nombres"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese Nombre',
                    }
                  ]}
                >
                  <Input placeholder="Juan Antonio" />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  name="lastName"
                  label="Apellidos"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese Apellidos',
                    }
                  ]}
                >
                  <Input placeholder="Silva Contreras" />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  name="rut"
                  label="Rut"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese rut',
                    }
                  ]}
                >
                  <Input placeholder="11111111-1" />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  name="communeId"
                  label="Comuna"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese comuna',
                    }
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
                  {...formItemLayout}
                  name="address"
                  label="Dirección"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese dirección',
                    }
                  ]}
                >
                  <Input placeholder="Av. Jose Antonio Matta 1279" />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  name="phone"
                  label="Teléfono"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese teléfono',
                    }
                  ]}
                >
                  <Input placeholder="930290330" />
                </Form.Item>
                <Divider orientation="center">
                  <Tag icon={<UserOutlined />} color="geekblue">
                    Datos de acceso
                  </Tag>
                </Divider>
                <Form.Item
                  {...formItemLayout}
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese email',
                    }
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
                      message: 'Ingrese contraseña',
                    }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Clave"
                  />
                </Form.Item>
                <Row>
                  <Col
                    span={24}
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <Button
                      style={{
                        margin: '1rem 0',
                      }}
                      htmlType="submit"
                    >
                      Crear Usuario
                    </Button>
                  </Col>
                </Row>
              </Form>
            </React.Fragment>
          )}
        </Card>
      </div>
    </div>
  );
};

AddUser.propTypes = {
  selectedItem: PropTypes.func,
};

AddUser.defaultProps = {
  selectedItem: () => {},
};

export default AddUser;