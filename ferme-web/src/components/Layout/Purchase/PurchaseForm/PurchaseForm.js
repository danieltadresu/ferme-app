import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Input, Button, Card, Radio, Select } from 'antd';
import classes from './PurchaseForm.module.css';
const PurchaseForm = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);
  const [isDelivery, setIsDelivery] = useState();
  const [isAvailableDelivery, setIsAvailableDelivery] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
    setIsDelivery(e.target.value === 1);
  };

  const onFinish = (values) => {
    console.log('values :>> ', values);
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
          <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
          >
            <Form.Item
              {...formItemLayout}
              name="deliveryType"
              label="Tipo de despacho"
              rules={[
                {
                  required: true,
                  message: 'Ingrese el tipo de despacho',
                }
              ]}
            >
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>Despacho a Domicilio</Radio>
                <Radio value={2}>Retiro en Tienda</Radio>
              </Radio.Group>
            </Form.Item>
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

export default PurchaseForm;