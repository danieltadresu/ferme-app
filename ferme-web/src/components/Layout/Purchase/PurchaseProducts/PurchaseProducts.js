import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import classes from "./PurchaseProducts.module.css";
import "antd/dist/antd.css";
import axios from "axios";
import { Table, Tag, Space, Skeleton, Descriptions, Badge, Button, notification } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const PurchaseProducts = (props) => {
  const { id } = useParams();
  const [productId, setProductId] = useState(id);
  const [productData, setProductData] = useState();
  const [productQuantity, setProductQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async (value) => {
    axios
      .get(`https://localhost:5001/api/product/${value}`)
      .then((response) => {
        console.log("response :>> ", response);
        setProductData(response.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  useEffect(() => {
    console.log("productData :>> ", productData);
  }, [productData]);

  const increaseProductQuantityHandler = (val) => {
    const quantity = productQuantity;
    const newQuantity = quantity + val;
    console.log('productData :>> ', productData);
    console.log('newQuantity :>> ', newQuantity);
    console.log('productData.quantity :>> ', productData.quantity);
    if (newQuantity > productData.stock) {
      notification['warning']({
        message: 'No es posible aumentar el Producto',
        description: `El Producto ${productData.name.toUpperCase()} seleccionado tiene un Stock de ${productData.stock}`,
      });
    } else {
      setProductQuantity(newQuantity)
    }
  };

  const decreaseProductQuantityHandler = (val) => {
    const quantity = productQuantity;
    const newQuantity = quantity - val;
    setProductQuantity(newQuantity)
    props.selectedPurchaseProductValues(
      productData?.price * productQuantity,
      productQuantity
    );
  };

  useEffect(() => {
    console.log('productQuantitty :>> ', productQuantity);
    if (productQuantity > 1) {
      props.selectedPurchaseProductValues(
        productData?.price * productQuantity,
        productQuantity
      ); 
    }
  }, [productQuantity]);

  return (
    <div className={classes.container}>
      <Skeleton loading={isLoading}>
        <Descriptions title="" bordered>
          <Descriptions.Item label="Producto">
            {productData?.name.toUpperCase()}
          </Descriptions.Item>
          <Descriptions.Item label="Descripción del Producto">
            {productData?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Stock" span={3}>
            <Badge status="processing" text="Disponible" />
          </Descriptions.Item>
          <Descriptions.Item label="Precio de la Compra">
            <Tag color="red">
              ${productData?.price * productQuantity}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Cantidad productos seleccionados">
            <Tag color="geekblue">
              {productQuantity}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Stock del Producto">{productData?.stock}</Descriptions.Item>
          <Descriptions.Item label="Detalle del Producto">
            Producto disponible en tienda
            <br />
            Proveedor del Producto
            <br />
            {productData?.providerId}
            <br />
            Categoria del Producto
            <br />
            {productData?.categoryId}
            <br />
          </Descriptions.Item>
        </Descriptions>
        <div
          style={{
            width: '90%',
            margin: '1rem auto',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            onClick={() => increaseProductQuantityHandler(1)}
          >
            <PlusCircleOutlined />
          </Button>
          <Button
            onClick={() => decreaseProductQuantityHandler(1)}
          >
            <MinusCircleOutlined />
          </Button>
        </div>
      </Skeleton>
    </div>
  );
};

PurchaseProducts.propTypes = {
  selectedPurchaseProductValues: PropTypes.func,
};

PurchaseProducts.defaultProps = {
  selectedPurchaseProductValues: () => {},
};

export default PurchaseProducts;
