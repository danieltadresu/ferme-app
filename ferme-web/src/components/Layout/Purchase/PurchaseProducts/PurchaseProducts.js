import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import classes from './PurchaseProducts.module.css';
import "antd/dist/antd.css";
import axios from 'axios';
import { Table, Tag, Space, Skeleton } from 'antd';

const PurchaseProducts = () => {
  const { id } = useParams();
  const [productId, setProductId] = useState(id);
  const [fakeCart, setFakeCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async (value) => {
    const fakeProductsCart = [];
    axios
    .get(`https://localhost:5001/api/product/${value}`)
    .then((response) => {
      console.log('response :>> ', response);
      fakeProductsCart.push(response.data);
      setFakeCart(fakeProductsCart);
      setIsLoading(false);
    })
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  useEffect(() => {
    console.log('isLoading :>> ', isLoading);
  }, [isLoading]);

  const columns = [
    {
      title: 'Nombre del Producto',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Categoría',
      dataIndex: 'categoryId',
      key: 'categoryId',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div className={classes.container}>
        <Skeleton loading={isLoading}>
          <Table columns={columns} dataSource={fakeCart} pagination={false} />
        </Skeleton>
    </div>
  );
};

export default PurchaseProducts;