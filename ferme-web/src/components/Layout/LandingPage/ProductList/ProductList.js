import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import AuthContext from '../../../../store/auth-context';
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
  Tooltip,
  Skeleton,
  Button,
} from 'antd';
import 'antd/dist/antd.css';
import classes from './ProductList.module.css';
import { PoweroffOutlined } from '@ant-design/icons';

const ProductList = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [recoveredProducts, setRecoveredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingCart, setLoadingCart] = useState(false);

  const fetchProducts = async (filterValue) => {
    const filterByCategory = true;
    const products = [];
    const filterData = [1, 2].includes(filterValue)
      ? { filterType: !filterByCategory } 
      : { filterType: filterByCategory };
    axios
    .post(`https://localhost:5001/api/product/all/${filterValue}`, filterData)
    .then((response) => {
      setIsLoading(false);
      for (const product of response.data) {
        products.push(product);
      }
      setRecoveredProducts(products);
    });
  };

  const paymentHandler = (id) => {
    // if (!authCtx.isLoggedIn) {
    //   history.replace('/acceso');
    // };
    history.replace(`/checkout/${id}`);
  };

  useEffect(() => {
    setIsLoading(true);
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
      <Skeleton loading={isLoading} active avatar>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
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
                        height={'250px'}
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
                  {/* <Tooltip title={`Existen ${item.stock} unidades disponibles`}>
                    <Badge count={item.stock}>
                        <span className="head-example" />
                      </Badge>
                  </Tooltip> */}
                  <Button
                    type="primary"
                    loading={loadingCart}
                    onClick={() => paymentHandler(item.id)}
                  >
                    Agregar al carrito
                  </Button>
                </Row>
              </Card>
            </List.Item>
          )}
        />
        <BackTop>
          <div style={style}>UP</div>
        </BackTop>
      </Skeleton>
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