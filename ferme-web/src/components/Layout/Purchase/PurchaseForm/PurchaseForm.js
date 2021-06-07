import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Button, Card, Radio, Select, Alert, List, Typography } from 'antd';
import classes from './PurchaseForm.module.css';
const PurchaseForm = (props) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);
  const [isDelivery, setIsDelivery] = useState();
  const [isAvailableDelivery, setIsAvailableDelivery] = useState();

  const deliveryTypeHandler = (value) => {
    setIsDelivery(value === 'DESPACHO A DOMICILIO.');
  };

  const onFinish = (values) => {
    console.log('values :>> ', values);
    props.selectedPurchaseFormValues(values, isDelivery);
  };

  useEffect(() => {
    console.log('isDelivery :>> ', isDelivery);
  }, [isDelivery]);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };

  return (
    <div className={classes.container}>
      <section className={classes.box}>
        <Card
          type="inner"
          style={{ width: '90%', margin: '2rem auto' }}
        >
          <List
            style={{
              marginTop: '1rem',
              marginBottom: '1rem'
            }}
            header={<div>Tipo de Despacho</div>}
            bordered
            dataSource={[
              'DESPACHO A DOMICILIO.',
              'RETIRO EN TIENDA.',
            ]}
            renderItem={item => (
              <List.Item>
                <Typography.Text
                  mark
                  style={{cursor: 'pointer'}}
                  onClick={() => deliveryTypeHandler(item)}
                >
                  {item}
                </Typography.Text>
              </List.Item>
            )}
          />
          {isDelivery ? (
            <Alert
              style={{margin: '2rem 0'}}
              message="Información de Despacho"
              description="Los despachos solo se realizan en la Comuna de Santiago."
              type="warning"
              showIcon
            />
          ) : (
            <React.Fragment>
              <Alert
                style={{margin: '2rem 0'}}
                message="Información de Ubicación"
                description="Nuestra local se encuentra ubicado en Av. Manuel Antonio Matta 1872."
                type="success"
                showIcon
              />
              <Alert
                style={{margin: '2rem 0'}}
                message="Nuestros Horarios"
                description="17:42."
                type="success"
                showIcon
              />
            </React.Fragment>
          )}
          <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
          >
            {isDelivery && (
              <React.Fragment>
                <Form.Item
                  {...formItemLayout}
                  name="commune"
                  label="Comuna"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese la comuna',
                    }
                  ]}
                >
                  <Select>
                    <Select.Option value="1">Santiago</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  name="address"
                  label="Dirección"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese dirección'
                    }
                  ]}
                >
                  <Input placeholder="Av. Matta 1879" />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  name="reference"
                  label="Referencia"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese una referencia'
                    }
                  ]}
                >
                  <Input.TextArea placeholder="Ubicación cercaca a Metro Irarrazaval. Calle 1234 Poste verde" allowClear />
                </Form.Item>
              </React.Fragment>
            )}
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
                <Button
                  style={{
                    margin: '0 8px',
                  }}
                  htmlType="submit"
                >
                  Guardar Datos
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </section>
    </div>
  )
};

PurchaseForm.propTypes = {
  selectedPurchaseFormValues: PropTypes.func,
};

PurchaseForm.defaultProps = {
  selectedPurchaseFormValues: () => {},
};

export default PurchaseForm;