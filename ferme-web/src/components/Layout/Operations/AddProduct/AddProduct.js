import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Button, Card, Select, notification } from 'antd';
import 'antd/dist/antd.css';
import classes from './AddProduct.module.css'
import axios from 'axios';
import AuthContext from "../../../../store/auth-context";
const AddProduct = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let dataProduct = values;

    // dataProduct = {
    //   id: 6,
    //   name: "HAMMER RED AND BIG",
    //   description: "A BIG AND RED HAMMER",
    //   createdat: 1621642759,
    //   updatedat: 1621642759,
    //   price: 10000,
    //   stock: 2,
    //   imageUrl: "https://m.media-amazon.com/images/I/51Z-pyj1qjL._AC_SX522_.jpg",
    //   categoryId: 2,
    //   providerI: 1
    // }
    console.log('dataProduct :>> ', dataProduct);
    axios.post(`https://localhost:5001/api/product/${authCtx.personId}`, dataProduct)
    .then((response) => {
      console.log('response :>> ', response);
      notification['success']({
        message: 'Producto registrado',
        description: 'Puedes consultar el nuevo producto creado en el catálogo.',
      });
      form.resetFields();
    })
    .catch((error) => {
      notification['error']({
        message: 'Hubo un error al crear el producto',
        description: 'Puedes intentarlo más tarde.',
      });
      form.resetFields();
    });
  };

  // const loginHandler = (event) => {
  //   event.preventDefault();
  //   const dataUser = {
  //     email: email.current.value,
  //     password: password.current.value
  //   };
  //   axios.post('https://localhost:5001/api/auth/login', dataUser)
  //   .then((response) => {
  //     const isLogin = [202].includes(response.data.status) && true;
  //     if (isLogin) {
  //       props.login(
  //         event, 
  //         response.data.roleName,
  //         response.data.personName,
  //       );
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  const selectedItemHandler = (val) => {
    props.selectedItem(val);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };

  return (
    <div className={classes['add-product']}>
      <div className={classes.container}>
        <Card
          type="inner"
          title="Creación de Producto"
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
          <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
          >
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
              name="code"
              label="Código"
              rules={[
                {
                  required: true,
                  message: 'Ingrese código',
                }
              ]}
            >
              <Input placeholder="CCC8848D" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="name"
              label="Nombre"
              rules={[
                {
                  required: true,
                  message: 'Ingrese nombre',
                }
              ]}
            >
              <Input placeholder="Clavos" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="description"
              label="Descripcion"
              rules={[
                {
                  required: true,
                  message: 'Ingrese una descripción',
                }
              ]}
            >
              <Input placeholder="Descripción" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="imageUrl"
              label="Imagen"
              rules={[
                {
                  required: true,
                  message: 'Ingrese una imagen',
                }
              ]}
            >
              <Input placeholder="https://m.media-amazon.com/images/I/51Z-pyj1qjL._AC_SX522_.jpg" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="createdat"
              label="Fecha de registro"
              rules={[
                {
                  required: true,
                  message: 'Ingrese una fecha de creación',
                }
              ]}
            >
              <Input placeholder="" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="price"
              label="Precio"
              rules={[
                {
                  required: true,
                  message: 'Ingrese un precio',
                }
              ]}
            >
              <Input placeholder="800000" type="number" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="stock"
              label="Stock"
              rules={[
                {
                  required: true,
                  message: 'Ingrese un stock',
                }
              ]}
            >
              <Input placeholder="10" type="number" />
            </Form.Item>
            <Form.Item
              {...formItemLayout} 
              name="categoryId"
              label="Categoría"
              rules={[
                {
                  required: true,
                  message: 'Ingrese una categoría',
                }
              ]}
            >
              <Select style={{ width: 120 }}>
                <Select.Option value="2">Martillos</Select.Option>
                <Select.Option value="3">Clavos</Select.Option>
                <Select.Option value="5">Taladro</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayout} 
              name="providerId"
              label="Proveedor"
              rules={[
                {
                  required: true,
                  message: 'Ingrese un proveedor',
                }
              ]}
            >
              <Select style={{ width: 120 }}>
                <Select.Option value="1">GRANDIOSO</Select.Option>
                <Select.Option value="2">DISTRIBUIDORA FERRETERA MAIRA S.A</Select.Option>
                <Select.Option value="3">LOS ÁLAMOS</Select.Option>
              </Select>
            </Form.Item>
            <Row>
              <Col
                span={24}
                style={{
                  textAlign: 'right',
                }}
              >
                <Button
                  style={{
                    margin: '0 8px',
                  }}
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Clear
                </Button>
              </Col>
            </Row>
            <Row>
              <Col
                span={24}
                style={{
                  textAlign: 'right',
                }}
              >
                <Button
                  style={{
                    margin: '0 8px',
                  }}
                  htmlType="submit"
                >
                  Crear Producto
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </div>
  );
};

AddProduct.propTypes = {
  selectedItem: PropTypes.func,
};

AddProduct.defaultProps = {
  selectedItem: () => {},
};

export default AddProduct;