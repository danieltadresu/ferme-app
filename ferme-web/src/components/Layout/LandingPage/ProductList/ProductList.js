import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Row,
  List,
  Card,
  Image,
  Space,
  Tag,
  Divider,
  BackTop,
  Badge,
  Tooltip
} from 'antd';
import 'antd/dist/antd.css';
import classes from './ProductList.module.css';
const ProductList = (props) => {
  const [recoveredProducts, setRecoveredProducts] = useState([]);

  const fetchProducts = (filterValue) => {
    console.log('filterValue :>> ', filterValue);
    const products = [];
    axios.get('https://localhost:5001/api/product/all')
    .then((response) => {
      console.log('response :>> ', response);
      for(const product of response.data) {
        products.push(product);
      };
      setRecoveredProducts(products);
    });
  };

  useEffect(() => {
    fetchProducts(props.selectedItem);
  }, [props.selectedItem])

  useEffect(() => {
    console.log('recoveredProducts :>> ', recoveredProducts);
  }, [recoveredProducts]);

  const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  };

  return (
    <div className={classes.container}>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={recoveredProducts}
        renderItem={item => (
          <List.Item>
            <Card
              title={item.name}
              cover={
                <>
                  <Space style={{width: '100%'}}>
                    <Image 
                      width={'100%'}
                      src={item.imageUrl}
                      placeholder={
                        <Image
                          preview={false}
                          src={item.imageUrl}
                        />
                      }
                    />
                  </Space>
                </>
              }
            >
              <Card.Meta
                title={
                  <>
                    <Divider orientation="left">
                      <Tag color="geekblue">
                        <p style={{margin: 0}}>
                          ${item.price}
                        </p>
                      </Tag>
                    </Divider>
                  </>
                }
                description={item.description}
              />
              <Row className={classes['product-info']}>
                <Tooltip title={`Existen ${item.stock} unidades disponibles`}>
                  <Badge count={item.stock}>
                      <span className="head-example" />
                    </Badge>
                </Tooltip>
              </Row>
            </Card>
          </List.Item>
        )}
      />
      <BackTop>
        <div style={style}>UP</div>
      </BackTop>
    </div>
  );
};

ProductList.propTypes = {
  selectedItem: PropTypes.number,
};

ProductList.defaultProps = {
  selectedItem: 1,
};

export default ProductList;