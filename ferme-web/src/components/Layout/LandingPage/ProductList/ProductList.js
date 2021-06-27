import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import AuthContext from "../../../../store/auth-context";
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
  Modal,
} from "antd";
import "antd/dist/antd.css";
import classes from "./ProductList.module.css";
import { PoweroffOutlined } from "@ant-design/icons";

const ProductList = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [recoveredProducts, setRecoveredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingCart, setLoadingCart] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cartData, setCartData] = useState(
    authCtx.userCart ? authCtx.userCart : []
  );

  const fetchProducts = async (filterValue) => {
    const filterByCategory = true;
    const products = [];
    const filterData = [1, 2].includes(filterValue)
      ? { filterType: !filterByCategory }
      : { filterType: filterByCategory };
    axios
      .post(`https://localhost:5001/api/product/all/${filterValue}`, filterData)
      .then((response) => {
        console.log('response :>> ', response);
        setIsLoading(false);
        for (const product of response.data) {
          products.push(product);
        }
        setRecoveredProducts(products);
      });
  };

  // const paymentHandler = (id) => {
  //   // if (!authCtx.isLoggedIn) {
  //   //   history.replace('/acceso');
  //   // };
  //   console.log('[ PRODUCT LIST ] authCtx :>> ', authCtx);
  //   console.log('[ PRODUCT LIST ] authCtx :>> ', authCtx.userCart);

  //   const currentCart = authCtx.userCart;
  //   const cart = [1, 2];
  //   authCtx.userCart = cart;
  //   console.log('[ PRODUCT LIST 2 ] authCtx :>> ', authCtx.userCart);

  //   history.replace(`/checkout/${id}`);
  // };

  const addCartHandler = (value) => {
    if (!authCtx.isLoggedIn) {
      history.replace("/acceso");
    }
    const currentCart = authCtx.userCart ? authCtx.userCart : [];

    const productExists = currentCart
      .map((c) => c.id)
      .find((cart) => cart === value.id)

    if (productExists) {
      const cartItemIndex = currentCart
        .map((c) => c.id)
        .findIndex((cart) => cart === value.id);
      currentCart[cartItemIndex].quantity = currentCart[cartItemIndex].quantity + 1;
      currentCart[cartItemIndex].itemPrice = currentCart[cartItemIndex].unitPrice * currentCart[cartItemIndex].quantity;
    } else {
      currentCart.push({
        id: value.id,
        quantity: 1,
        name: value.name,
        description: value.description,
        itemPrice: value.price,
        unitPrice: value.price,
      });
    }
    authCtx.userCart = currentCart;
    setCartData(currentCart);
    props.setCurrentCartData();
  };

  useEffect(() => {
    setIsLoading(true);
    fetchProducts(props.selectedItem);
  }, [props.selectedItem]);

  useEffect(() => {
    console.log("recoveredProducts :>> ", recoveredProducts);
  }, [recoveredProducts]);

  const style = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: 4,
    backgroundColor: "#1088e9",
    color: "#fff",
    textAlign: "center",
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
          renderItem={(item) => (
            <List.Item>
              <Card
                title={
                  <span style={{ fontSize: ".8rem", color: "#111827" }}>
                    {item.name.toUpperCase()}
                  </span>
                }
                cover={
                  <>
                    <Space style={{ width: "100%" }}>
                      <Image
                        width={"100%"}
                        height={"250px"}
                        src={item.imageUrl}
                        placeholder={
                          <Image preview={false} src={item.imageUrl} />
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
                          <p style={{ margin: 0 }}>${item.price}</p>
                        </Tag>
                      </Divider>
                    </>
                  }
                  description={item.description}
                />
                <Row className={classes["product-info"]}>
                  {/* <Tooltip title={`Existen ${item.stock} unidades disponibles`}>
                    <Badge count={item.stock}>
                        <span className="head-example" />
                      </Badge>
                  </Tooltip> */}

                  {/* <Button
            onClick={() => increaseProductQuantityHandler(1)}
          >
            <PlusCircleOutlined />
          </Button> */}
                  {item.stock > 0 ? (
                    <>
                      {/* <p>
                        {cartData && cartData.filter((cart) => cart.id === item.id)}
                        {cartData && cartData.map((c) => c.id)}
                      </p>
                      <hr />
                      <p>
                        {recoveredProducts && recoveredProducts.map((p) => p.id)}
                      </p>
                      <p>
                        {cartData && cartData.filter((cart) => cart.id === item.id)}
                        {cartData && cartData.map((c) => c.id).find((i) => i === item.id)}
                      </p> }
                      {{authCtx.isLoggedIn ? (
                        <>
                          {cartData &&
                            (cartData
                              .map((c) => c.id)
                              .find((i) => i === item.id) ? (
                              <h1>Hey!</h1>
                            ) : (
                              <Button
                                type="primary"
                                loading={loadingCart}
                                onClick={() => addCartHandler(item)}
                              >
                                Agregar al carrito
                              </Button>
                            ))}
                        </>
                      ) : (
                        <Button
                          type="primary"
                          loading={loadingCart}
                          onClick={() => addCartHandler(item)}
                        >
                          Agregar al carrito
                        </Button>
                      ))} */}
                      <Button
                        type="primary"
                        loading={loadingCart}
                        onClick={() => addCartHandler(item)}
                      >
                        Agregar al carrito
                      </Button>
                    </>
                  ) : (
                    <Tag color="red">PRODUCTO SIN STOCK DISPONIBLE</Tag>
                  )}
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
  setCurrentCartData: PropTypes.func,
};

ProductList.defaultProps = {
  selectedItem: 1,
  setCurrentCartData: () => {},
};

export default ProductList;
