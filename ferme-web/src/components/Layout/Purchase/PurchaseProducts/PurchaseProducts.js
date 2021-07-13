import React, { useEffect, useState, useContext } from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import classes from "./PurchaseProducts.module.css";
import "antd/dist/antd.css";
import axios from "axios";
import { List, Statistic, Table, Tag, Space, Skeleton, Descriptions, Badge, Button, notification } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined, ArrowUpOutlined } from '@ant-design/icons';
import AuthContext from "../../../../store/auth-context";

const PurchaseProducts = (props) => {
  const authCtx = useContext(AuthContext);
  const [productData, setProductData] = useState(authCtx.userCart);
  const [productQuantity, setProductQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  console.log('authCtx :>> ', authCtx);

  return (
    <div className={classes.container}>
      <div className={classes['sub-container']}>
        <List
          itemLayout="horizontal"
          dataSource={productData}
          renderItem={item => (
            <List.Item
              actions={[<a key="list-loadmore-edit"><PlusCircleOutlined /></a>, <a key="list-loadmore-more"><MinusCircleOutlined /></a>]}
            >
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.description}
              />
              <List.Item.Meta
                title={<a href="https://ant.design">PRECIO UNITARIO</a>}
                description={`$${item.unitPrice}`}
              />
              <List.Item.Meta
                title={<a href="https://ant.design">CANTIDAD</a>}
                description={item.quantity}
              />
              <List.Item.Meta
                title={<a href="https://ant.design">SUB TOTAL</a>}
                description={`$${item.itemPrice}`}
              />
          </List.Item>
          )}
        />
      </div>
      <div className={classes['total-container']}>
        <Statistic
          title="Monto total de la Compra"
          value={authCtx.userCart
            .map((item) => item.itemPrice)
            .reduce((a, b) => a + b, 0)}
          // precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
        />
      </div>
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
