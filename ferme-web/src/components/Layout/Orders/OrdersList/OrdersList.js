import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Table, Tag, Space, Skeleton } from "antd";

import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "antd/dist/antd.css";
import classes from './OrdersList.module.css';
import AuthContext from "../../../../store/auth-context";

const OrdersList = () => {
  const authCtx = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomerPurchases = async () => {
    console.log('authCtx :>> ', authCtx);
    axios
      .get(`https://localhost:5001/api/order/customer/${authCtx.personId}`)
      .then((response) => {
        setPurchases(response.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomerPurchases();
  }, []);

  const columns = [
    {
      title: <span style={{ fontSize: ".7rem" }}>ID</span>,
      dataIndex: "id",
      key: "id",
    },
    // {
    //   title: <span style={{ fontSize: ".7rem" }}>PRODUCTO</span>,
    //   dataIndex: "productName",
    //   key: "productName",
    // },
    // {
    //   title: <span style={{ fontSize: ".7rem" }}>CANTIDAD</span>,
    //   dataIndex: "productQuantity",
    //   key: "productQuantity",
    // },
    {
      title: <span style={{ fontSize: ".7rem" }}>MONTO TOTAL</span>,
      dataIndex: "totalPurchase",
      key: "totalPurchase",
    },
    {
      title: <span style={{ fontSize: ".7rem" }}>DESPACHO</span>,
      dataIndex: "deliveryTypeName",
      key: "deliveryTypeName",
      render: (deliveryTypeName) => (
        <>
          {deliveryTypeName === "HOME DELIVERY" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              DESPACHO A DOMICILIO
            </Tag>
          ) : (
            <Tag icon={<ExclamationCircleOutlined />} color="warning">
              RETIRO EN TIENDA
            </Tag>
          )}
        </>
      ),
    },
    {
      title: <span style={{ fontSize: ".7rem" }}>DOCUMENTO</span>,
      dataIndex: "isInvoice",
      key: "isInvoice",
      render: (isInvoice) => (
        <>
          {isInvoice ? (
            <Tag color="blue">FACTURA</Tag>
          ) : (
            <Tag color="purple">BOLETA</Tag>
          )}
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
              target="_blank"
              href={`https://localhost:5001/api/file/bill/${id}`}
              // onClick={() => dowloadDocumentHandler(id)}
            >
              <FileSearchOutlined /> Ver Documento
            </a>
          </Space>
        </>
      ),
    },
  ];

  return (
    <div className={classes["orders-list"]}>
      <div className={classes.container}>
        <Card
          style={{ padding: "0px" }}
          type="inner"
          title="Ordenes de Compra"
          bodyStyle={{ width: "100%", margin: "0 auto", padding: "0" }}
        >
          <Skeleton loading={isLoading}>
            <Table columns={columns} dataSource={purchases} pagination={false} />
          </Skeleton>
        </Card>
      </div>
    </div>
  );
};

export default OrdersList;