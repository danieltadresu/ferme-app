import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Select,
  Button,
  Card,
  Table,
  Tag,
  Space,
  Skeleton,
  Modal,
  Descriptions,
  Badge,
  Statistic,
  Row,
  Col,
  Divider,
  notification,
} from "antd";
import "antd/dist/antd.css";
import classes from "./OrderList.module.css";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  FileSearchOutlined,
  BulbOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import AuthContext from "../../../../store/auth-context";
import moment from 'moment';
const OrderList = (props) => {
  const authCtx = useContext(AuthContext);
  const [orderProducts, setOrderProducts] = useState([]);
  const [orderProductsById, setOrderProductsById] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchOrderProducts = async () => {
    axios
      .get("https://localhost:5001/api/providerorder/all")
      .then((response) => {
        setOrderProducts(response.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchOrderProducts();
  }, []);

  const selectedItemHandler = (val) => {
    props.selectedItem(val);
  };

  const orderDetailHandler = async (value) => {
    console.log("value :>> ", value);
    axios
      .get(`https://localhost:5001/api/providerorder/${value}`)
      .then((response) => {
        setOrderProductsById(response.data);
        setIsModalVisible(true);
        console.log("response.data :>> ", response.data);
        // setIsModalVisible(true);
        // setIsLoading(false);
      });
  };

  // useEffect(() => {
  //   setIsModalVisible(true);
  // }, [orderProductsById]);

  const getStatusName = (value) => {
    switch (value) {
      case "SENT":
        return "ENVIADO";
        break;
      case "RECEIVED":
        return "RECIBIDO";
        break;
      case "DISPATCHED":
        return "DESPACHADO";
        break;
      case "ACCEPTED":
        return "ACEPTADO";
        break;
      case "REJECTED":
        return "RECHAZADO";
        break;
      default:
        return "SIN INFORMACION";
        break;
    }
  };

  const getStatusIcon = (value) => {
    switch (value) {
      case "SENT":
        return <ExclamationCircleOutlined />;
        break;
      case "RECEIVED":
        return <CheckCircleOutlined />;
        break;
      case "DISPATCHED":
        return <BulbOutlined />;
        break;
      case "ACCEPTED":
        return <CheckOutlined />;
        break;
      case "REJECTED":
        return <CloseCircleOutlined />;
        break;
      default:
        return <CheckCircleOutlined />;
        break;
    }
  };

  const getStatusTagColor = (value) => {
    switch (value) {
      case "SENT":
        return "blue";
        break;
      case "RECEIVED":
        return "green";
        break;
      case "DISPATCHED":
        return "volcano";
        break;
      case "ACCEPTED":
        return "geekblue";
        break;
      case "REJECTED":
        return "red";
        break;
      default:
        return "green";
        break;
    }
  };

  const columns = [
    {
      title: <span style={{ fontSize: ".7rem" }}>ID</span>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <span style={{ fontSize: ".7rem" }}>MONTO TOTAL</span>,
      dataIndex: "totalPurchase",
      key: "totalPurchase",
    },
    {
      title: <span style={{ fontSize: ".7rem" }}>CANTIDAD PRODUCTOS</span>,
      dataIndex: "productsQuantity",
      key: "productsQuantity",
    },
    {
      title: <span style={{ fontSize: ".7rem" }}>ESTADO</span>,
      dataIndex: "orderStatusName",
      key: "orderStatusName",
      render: (orderStatusName) => (
        <Tag
          icon={getStatusIcon(orderStatusName)}
          color={getStatusTagColor(orderStatusName)}
        >
          {getStatusName(orderStatusName)}
        </Tag>
      ),
    },
    {
      title: <span style={{ fontSize: ".7rem" }}>GIRO DEL PROVEEDOR</span>,
      dataIndex: "providerName",
      key: "providerName",
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
                cursor: "pointer",
              }}
              onClick={() => orderDetailHandler(id)}
            >
              <FileSearchOutlined style={{ fontSize: "1rem" }} /> Ver Detalle
            </a>
          </Space>
        </>
      ),
    },
  ];

  const onSubmit = async (value) => {
    const orderData = value;
    const dispatchedStatusId = 2;
    const sentStatusId = 5;
    const receivedStatusId = 1;
    const acceptedStatusId = 3;
    const rejectedStatusId = 4;
    console.log('orderData :>> ', orderData);
    if (orderData.orderStatusId === dispatchedStatusId) {
      if (authCtx.roleAccess === "ADMIN") {
        axios
          .get(
            `https://localhost:5001/api/providerorder/accept/${orderData.id}`
          )
          .then((response) => {
            console.log("response :>> ", response);
            notification["success"]({
              message: "Operación realizada con éxito",
              description:
                "Solicitud de orden de Compra fué Aceptada y los productos han sido agregados correctamente al catálogo.",
            });
          });
      } else {
        // alerta notificando que debe ser admin para aceptarla
        notification["error"]({
          message: "No es posible realizar la operación",
          description:
            "Problemas de autenticación. Para aceptar la solicitud debe ser Administrador del Sistema.",
        });
      }
    } else if (
      [sentStatusId, receivedStatusId].includes(orderData.orderStatusId)
    ) {
      console.log('orderData.orderStatusId :>> ', orderData.orderStatusId);
      if (authCtx.roleAccess === "PROVIDER") {
        axios
          .get(
            `https://localhost:5001/api/providerorder/update-provider-status/${orderData.id}`
          )
          .then((response) => {
            console.log("response :>> ", response);
            notification["success"]({
              message: "Operación realizada con éxito",
              description:
                "Solicitud ha sido actualizada por el Proveedor..",
            });
          });
      } else {
        // alerta notificando que debe ser admin para aceptarla
        notification["error"]({
          message: "No es posible realizar la operación",
          description:
            "Problemas de autenticación. Para aceptar la solicitud debe ser Proveedor del Sistema.",
        });
      }
    } else if (orderData.orderStatusId === acceptedStatusId) {
      notification["info"]({
        message: "No es posible realizar la operación",
        description:
          "Solicitud de orden de Compra ya se encuentra Aceptada y los productos han sido agregados correctamente al catálogo.",
      });
    } else if (orderData.orderStatusId === rejectedStatusId) {
      notification["error"]({
        message: "No es posible realizar la operación",
        description:
          "La orden se encuentra en estado de Rechazada. Te sugerimos volver a Ingresar una nueva Orden de Compra.",
      });
    }
  };

  return (
    <div className={classes["order-list"]}>
      <div className={classes.container}>
        <Card
          style={{ padding: "0px" }}
          type="inner"
          title="Orden de Compra de Productos"
          extra={<Button onClick={() => selectedItemHandler(0)}>Volver</Button>}
          bodyStyle={{ width: "100%", margin: "0 auto", padding: "0" }}
        >
          <Skeleton loading={isLoading}>
            <Table
              columns={columns}
              dataSource={orderProducts}
              pagination={false}
            />
          </Skeleton>
        </Card>
        <Modal
          width={1000}
          title="Detalle de Orden de Compra de Productos"
          visible={isModalVisible}
          centered
          onOk={() => onSubmit(orderProductsById)}
          onCancel={() => setIsModalVisible(false)}
        >
          <Row gutter={16} style={{ margin: "0 0 2rem 0" }}>
            <Col span={12}>
              <Statistic
                title="Estado de la solicitud"
                value={orderProductsById.orderStatusName}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Proveedor"
                value={orderProductsById.providerName}
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ margin: "0 0 2rem 0" }}>
            <Col span={12}>
              <Statistic
                title="Fecha de ingreso"
                value={moment(orderProductsById.createdAt).format('DD/MM/YYYY')}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Última fecha de actualización"
                value={moment(orderProductsById.updatedat).format('DD/MM/YYYY')}
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ margin: "0 0 2rem 0" }}>
            <Col span={12}>
              <Statistic
                title="Precio Total"
                value={orderProductsById.totalPurchase}
                valueStyle={{ color: "#3f8600" }}
                prefix={<DollarOutlined />}
              />
            </Col>
          </Row>
          {orderProductsById.providerProducts &&
            orderProductsById.providerProducts.length > 0 &&
            orderProductsById.providerProducts.map((product) => {
              return (
                <React.Fragment>
                  <Divider />
                  <Descriptions
                    bordered
                    size="small"
                    style={{ margin: "1rem 0" }}
                  >
                    <Descriptions.Item label="ID" span={3}>
                      <p>{product.id}</p>
                    </Descriptions.Item>
                    <Descriptions.Item label="Nombre del Producto" span={3}>
                      {product.productName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Precio unitario" span={3}>
                      ${product.productUnitPrice}
                    </Descriptions.Item>
                    <Descriptions.Item label="Cantidad" span={3}>
                      {product.productQuantity}
                    </Descriptions.Item>
                    <Descriptions.Item label="Precio total" span={3}>
                      ${product.productUnitPrice * product.productQuantity}
                    </Descriptions.Item>
                  </Descriptions>
                </React.Fragment>
              );
            })}
        </Modal>
      </div>
    </div>
  );
};

OrderList.propTypes = {
  selectedItem: PropTypes.func,
};

OrderList.defaultProps = {
  selectedItem: () => {},
};

export default OrderList;
