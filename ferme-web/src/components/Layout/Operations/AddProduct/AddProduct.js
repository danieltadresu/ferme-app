import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Button, Card } from 'antd';
import 'antd/dist/antd.css';
import classes from './AddProduct.module.css'
const AddProduct = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

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
              name="creation"
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
              <Input placeholder="800000" />
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
              <Input placeholder="10" />
            </Form.Item>
            <Form.Item
              {...formItemLayout} 
              name="category"
              label="Categoría"
              rules={[
                {
                  required: true,
                  message: 'Ingrese una categoría',
                }
              ]}
            >
              <Input placeholder="Herramientas manuales" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="provider"
              label="Proveedor"
              rules={[
                {
                  required: true,
                  message: 'Ingrese un proveedor',
                }
              ]}
            >
              <Input placeholder="Santo Tomas Las Esquilas S.A" />
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