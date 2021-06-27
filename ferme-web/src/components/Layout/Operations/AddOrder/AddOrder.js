import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Card,
  Skeleton,
  Tag,
  List,
  Space,
  Table,
  Modal,
  notification,
  Alert,
} from "antd";

import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import classes from "./AddOrder.module.css";
import axios from "axios";
const AddOrder = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();

  const [providers, setProviders] = useState([]);
  const [providerData, setProviderData] = useState();
  const [selectedProvider, setSelectedProvider] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(async () => {
    axios.get("https://localhost:5001/api/provider/all").then((response) => {
      console.log("response :>> ", response);
      setProviders(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(async () => {
    if (selectedProvider) {
      console.log("selectedProvider :>> ", selectedProvider);
      axios
        .get(`https://localhost:5001/api/product/provider/${selectedProvider}`)
        .then((response) => {
          console.log("response :>> ", response);
          setProducts(
            response.data
              ?.map((p) => {
                return {
                  ...p,
                  quantity: 0,
                  totalItem: 0,
                };
              })
              .sort((a, b) => a.id - b.id)
          );
        });
    }
  }, [selectedProvider]);

  const selectedItemHandler = (val) => {
    props.selectedItem(val);
  };

  const onAddProvider = (value) => {
    setSelectedProvider(value);
    axios
      .get(`https://localhost:5001/api/provider/${value}`)
      .then((response) => {
        setProviderData(response.data);
      });
  };

  const columns = [
    {
      title: <span style={{ fontSize: ".7rem" }}>ID</span>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <span style={{ fontSize: ".7rem" }}>NOMBRE DEL PRODUCTO</span>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <span style={{ fontSize: ".7rem" }}>PRECIO</span>,
      dataIndex: "price",
      key: "price",
    },
    {
      title: <span style={{ fontSize: ".7rem" }}>CANTIDAD</span>,
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => (
        <>
          <Space size="middle">
            <a
              style={{
                color: "#0918EB",
                cursor: "pointer",
                fontSize: ".8rem",
              }}
            >
              {quantity}
            </a>
          </Space>
        </>
      ),
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
              onClick={() => addItemHandler(id)}
            >
              <PlusCircleOutlined style={{ fontSize: "1rem" }} />
            </a>
          </Space>
        </>
      ),
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
              onClick={() => removeItemHandler(id)}
            >
              <MinusCircleOutlined style={{ fontSize: "1rem" }} />
            </a>
          </Space>
        </>
      ),
    },
  ];

  const addItemHandler = (value) => {
    const productItem = products.find((p) => p.id === value);
    productItem.quantity += 1;
    productItem.totalItem = productItem.price * productItem.quantity;
    const filterProducts = products.filter((p) => p.id !== value);
    filterProducts.push(productItem);
    setProducts(filterProducts.sort((a, b) => a.id - b.id));
  };

  const removeItemHandler = (value) => {
    const productItem = products.find((p) => p.id === value);
    productItem.quantity = productItem.quantity - 1;
    productItem.totalItem = productItem.price * productItem.quantity;
    const filterProducts = products.filter((p) => p.id !== value);
    filterProducts.push(productItem);
    setProducts(filterProducts.sort((a, b) => a.id - b.id));
  };

  const purchaseDetailHandler = () => {
    if (
      products &&
      products.length > 0 &&
      products.map((p) => p.quantity).reduce((a, b) => a + b, 0)
    ) {
      setIsModalVisible(true);
    } else {
      notification["warning"]({
        message: "No es posible visualizar la información",
        description: "Debes agregar los productos que desees comprar.",
      });
    }
  };

  const onSubmit = () => {
    console.log('selectedProvider :>> ', selectedProvider);
    console.log('providerData :>> ', providerData);
    console.log('products :>> ', products);
    console.log('filtered products :>> ', products.filter((p) => p.quantity > 0));
  };

  return (
    <div className={classes["add-order"]}>
      <div className={classes.container}>
        <Card
          style={{ padding: "0px" }}
          type="inner"
          title="Generación de Order de Compra de Productos"
          extra={<Button onClick={() => selectedItemHandler(0)}>Volver</Button>}
          bodyStyle={{ width: "100%", margin: "0 auto", padding: "0" }}
        >
          <Skeleton loading={loading}>
            {selectedProvider ? (
              <React.Fragment>
                {products && (
                  <Skeleton loading={loading}>
                    {selectedProvider && (
                      <React.Fragment>
                        {products && (
                          <>
                            <Table
                              columns={columns}
                              dataSource={products}
                              pagination={false}
                            />
                            <Row>
                              <Col
                                span={24}
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                <Button
                                  style={{
                                    margin: "1rem 0",
                                  }}
                                  htmlType="submit"
                                  onClick={purchaseDetailHandler}
                                >
                                  Ver Detalle de Orden de Compra
                                </Button>
                              </Col>
                            </Row>
                          </>
                        )}
                      </React.Fragment>
                    )}
                  </Skeleton>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {providers &&
                  providers.map((p) => {
                    return (
                      <Card
                        key={p.id}
                        hoverable
                        style={{ width: "60%", margin: "2rem auto" }}
                        onClick={() => onAddProvider(p.id)}
                      >
                        <Card.Meta
                          title={<Tag color="geekblue">{p.name}</Tag>}
                          description="Proveedor"
                        />
                      </Card>
                    );
                  })}
              </React.Fragment>
            )}
          </Skeleton>
        </Card>
        <Modal
          width={1000}
          title="Detalle de Orden de Compra"
          visible={isModalVisible}
          centered
          onOk={() => onSubmit()}
          onCancel={() => setIsModalVisible(false)}
        >
          {products && products.length > 0 && (
            <React.Fragment>
              <Alert
                message="Monto total de la Compra"
                type="info"
                showIcon
                description={`$${products
                  .map((p) => p.totalItem)
                  .reduce((a, b) => a + b, 0)}`}
                style={{ margin: "0.5rem 0 " }}
              />
              <Alert
                message={`PROVEEDOR ${providerData && providerData.name}`}
                type="info"
                showIcon
                description={
                  "El pedido será revisado por el Proveedor y si se realiza el Despacho en tienda, se realizará el cambio de Estado"
                }
                style={{ margin: "0.5rem 0 " }}
              />
              <List
                style={{ margin: "1rem 0" }}
                itemLayout="horizontal"
                dataSource={
                  products && products.length > 0
                    ? products.filter((p) => p.quantity > 0)
                    : []
                }
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      title={<a href="https://ant.design">{item.name}</a>}
                      description={
                        <Tag color="geekblue" style={{ margin: ".2rem 0" }}>
                          ${item.price} PRECIO UNITARIO
                        </Tag>
                      }
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Tag color="geekblue" style={{ margin: ".2rem 0" }}>
                        {item.quantity}{" "}
                        {item.quantity === 1 ? "UNIDAD" : "UNIDADES"}
                      </Tag>
                      <Tag color="red" style={{ margin: ".2rem 0" }}>
                        ${item.totalItem} TOTAL
                      </Tag>
                    </div>
                  </List.Item>
                )}
              />
            </React.Fragment>
          )}
        </Modal>
      </div>
    </div>
  );
};

AddOrder.propTypes = {
  selectedItem: PropTypes.func,
};

AddOrder.defaultProps = {
  selectedItem: () => {},
};

export default AddOrder;
