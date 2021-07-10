import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Row,
  Col,
  Button,
  Card,
  Table,
  Space,
  Skeleton,
  Drawer,
  Form,
  Input,
  Select,
} from "antd";
import "antd/dist/antd.css";
import classes from "./ProductList.module.css";
import {
  FileSearchOutlined,
} from "@ant-design/icons";
const ProductList = (props) => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [form] = Form.useForm();

  const fetchAvailableProducts = async () => {
    console.log("[ fetchAvailableProducts ]");
    axios
      .get("https://localhost:5001/api/product/available-products")
      .then((response) => {
        console.log("response :>> ", response);
        setAvailableProducts(response.data.sort((a, b) => a.id - b.id));
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // fetchCustomerPurchases();
    fetchAvailableProducts();
  }, []);

  useEffect(() => {
    console.log("availableProducts :>> ", availableProducts);
  }, [availableProducts]);

  const selectedItemHandler = (val) => {
    props.selectedItem(val);
  };

  const selectedProductHandler = async (val) => {
    // props.selectedProductDetail(val);
    console.log("val :>> ", val);

    axios.get(`https://localhost:5001/api/product/${val}`).then((response) => {
      console.log("response :>> ", response);
      setSelectedProduct(response.data);
      setIsVisible(val);
    });

    // setIsVisible(val);
  };

  useEffect(() => {
    if (selectedProduct) {
      form.setFieldsValue({
        name: selectedProduct.name,
        description: selectedProduct.description,
        createdat: selectedProduct.createdat,
        price: selectedProduct.price,
        stock: selectedProduct.stock,
        categoryId: selectedProduct.categoryId,
        providerId: selectedProduct.providerId,
      });
    }
  }, [selectedProduct]);

  const columns = [
    {
      title: <span style={{ fontSize: ".7rem" }}>ID</span>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <span style={{ fontSize: ".7rem" }}>NOMBRE</span>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <span style={{ fontSize: ".7rem" }}>FECHA DE INGRESO</span>,
      dataIndex: "createdAtFromUnixTime",
      key: "createdAtFromUnixTime",
    },
    {
      title: <span style={{ fontSize: ".7rem" }}>PRECIO</span>,
      dataIndex: "price",
      key: "price",
    },
    {
      title: <span style={{ fontSize: ".7rem" }}>STOCK</span>,
      dataIndex: "stock",
      key: "stock",
    },
    {
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <>
          <Space size="middle">
            <a
              style={{
                color: "#0918EB",
                cursor: "pointer",
                fontSize: ".8rem",
              }}
              // target="_blank"
              // href={`https://localhost:5001/api/file/bill/${id}`}
              onClick={() => selectedProductHandler(id)}
            >
              <FileSearchOutlined /> Ver Detalle
            </a>
          </Space>
        </>
      ),
    },
  ];

  const onFinish = async (value) => {
    console.log("form.getFieldsValues() :>> ", form.getFieldsValue());
    // const data = form.getFieldsValue();
    // console.log('data :>> ', data);
    const data = form.getFieldsValue();
    data.id = selectedProduct.id;
    axios.put("https://localhost:5001/api/product/", data).then((response) => {
      console.log('response :>> ', response);
    });
  };

  return (
    <div className={classes["product-list"]}>
      <div className={classes.container}>
        <Card
          style={{ padding: "0px" }}
          type="inner"
          title='Productos'
          extra={<Button onClick={() => selectedItemHandler(0)}>Volver</Button>}
          bodyStyle={{ width: "100%", margin: "0 auto", padding: "0" }}
        >
          <Skeleton loading={isLoading}>
            <Table
              columns={columns}
              dataSource={availableProducts}
              pagination={false}
            />
          </Skeleton>
          <Drawer
            title="Edita el Producto"
            width={720}
            onClose={() => setIsVisible(false)}
            visible={isVisible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: "right",
                }}
              >
                <Button style={{ marginRight: 8 }}>Cancel</Button>
                <Button type="primary" htmlType="submit" onClick={onFinish}>
                  Submit
                </Button>
              </div>
            }
          >
            <Form
              layout="vertical"
              hideRequiredMark
              form={form}
              onFinish={onFinish}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Nombre del Producto"
                    rules={[
                      {
                        required: true,
                        message: "Ingrese nombre",
                      },
                    ]}
                  >
                    <Input placeholder="Clavos" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="imageUrl"
                    label="Imagen de Presentación"
                    rules={[{ required: true, message: "Please enter url" }]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="Please enter url"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="description"
                    label="Descripción del Producto"
                    rules={[
                      {
                        required: true,
                        message: "Ingrese descripción",
                      },
                    ]}
                  >
                    <Input placeholder="Clavos" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="createdat"
                    label="Fecha de registro"
                    rules={[{ required: true, message: "Please enter url" }]}
                  >
                    <Input placeholder="Clavos" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="price"
                    label="Precio del Producto"
                    rules={[
                      {
                        required: true,
                        message: "Ingrese precio",
                      },
                    ]}
                  >
                    <Input placeholder="10000" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="stock"
                    label="Stock"
                    rules={[{ required: true, message: "Ingrese Stock" }]}
                  >
                    <Input placeholder="10" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="categoryId"
                    label="Categoría"
                    rules={[
                      {
                        required: true,
                        message: "Ingrese categoría",
                      },
                    ]}
                  >
                    <Select>
                      <Select.Option value={2}>Martillos</Select.Option>
                      <Select.Option value={3}>Clavos</Select.Option>
                      <Select.Option value={5}>Taladro</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="providerId"
                    label="Proveedor"
                    rules={[
                      {
                        required: true,
                        message: "Ingrese proveedor",
                      },
                    ]}
                  >
                    <Select>
                      <Select.Option value={1}>GRANDIOSO</Select.Option>
                      <Select.Option value={2}>
                        DISTRIBUIDORA FERRETERA MAIRA S.A
                      </Select.Option>
                      <Select.Option value={3}>LOS ÁLAMOS</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
        </Card>
      </div>
    </div>
  );
};

ProductList.propTypes = {
  selectedItem: PropTypes.func,
};

ProductList.defaultProps = {
  selectedItem: () => {},
};

export default ProductList;
