import React, { useEffect, useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import { Row, Col, Tag, Card, Steps, Button, Modal, List } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import classes from "./LandingPage.module.css";
import "antd/dist/antd.css";
import ProductList from "./ProductList/ProductList";
import AuthContext from "../../../store/auth-context";

const catalogFilter = {
  bestSellingProducts: 1,
  theCheapestProducts: 2,
  byCategories: 3,
};

const LandingPage = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [current, setCurrent] = React.useState(0);
  const [visible, setVisible] = useState(false);
  const [cartData, setCartData] = useState(authCtx.userCart);

  useEffect(() => {
    console.log("props from LandingPage.js :>> ", props);
    setVisible(props.modalCartIsVisible);
    setCartData(authCtx.userCart);
    // console.log('props from LandingPage.js authCtx.userCart.length :>> ', authCtx.userCart.length);
  }, [props]);

  useEffect(() => {
    console.log("cartData on LandingPage.js !!!!!:>> ", cartData);
  }, [cartData]);

  useEffect(() => {
    console.log("visible on useEffect LandingPage.js :>> ", visible);
  }, [visible]);

  const addProductsHandler = () => {
    console.log("addProductsHandler :>> ");
    setVisible(true);
    props.setModalVisible(true);
  };

  const modalCartHandler = () => {
    setVisible(false);
    props.setModalVisible(false);
  };

  const steps = [
    {
      title: "Los más vendidos",
      content: (
        <ProductList
          selectedItem={catalogFilter.bestSellingProducts}
          setCurrentCartData={() => addProductsHandler()}
        />
      ),
    },
    {
      title: "Los más económicos",
      content: (
        <ProductList
          selectedItem={catalogFilter.theCheapestProducts}
          setCurrentCartData={() => addProductsHandler()}
        />
      ),
    },
    {
      title: "Según categoría",
      content: (
        <ProductList
          selectedItem={catalogFilter.byCategories}
          setCurrentCartData={() => addProductsHandler()}
        />
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className={classes.container}>
      <section className={classes.box}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card
              title="Filtra tus productos"
              style={{ width: "100%" }}
              extra={
                <>
                  <div className={classes["steps-action"]}>
                    {current > 0 && (
                      <Button
                        style={{ margin: "0 8px" }}
                        onClick={() => prev()}
                      >
                        Anterior
                      </Button>
                    )}
                    {current < steps.length - 1 && (
                      <Button type="primary" onClick={() => next()}>
                        Siguiente
                      </Button>
                    )}
                  </div>
                </>
              }
            >
              <Steps current={current}>
                {steps.map((item) => (
                  <Steps.Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className={classes["steps-content"]}>
                {steps[current].content}
              </div>
            </Card>
          </Col>
        </Row>
        <Modal
          title="Carro"
          centered
          visible={visible}
          onOk={() => history.replace('/checkout')}
          onCancel={modalCartHandler}
          width={1000}
        >
          <p>some contents...</p>
          {cartData && (
            <List
              itemLayout="horizontal"
              dataSource={cartData}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  actions={[
                    <a key="list-loadmore-edit">
                      <PlusCircleOutlined />
                    </a>,
                    <a key="list-loadmore-more">
                      <MinusCircleOutlined />
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={item.description}
                  />
                  <div>
                    <Tag color="red">
                      {item.quantity}{" "}
                      {item.quantity === 1 ? "UNIDAD" : "UNIDADES"}
                    </Tag>
                  </div>
                </List.Item>
              )}
            />
          )}
          {/* <div>
          {authCtx.userCart.map((cart) => {
            return (
              <p>
                {cart.id}
              </p>
            )
          })}
        </div> */}
        </Modal>
      </section>
    </div>
  );
};

LandingPage.propTypes = {
  setModalVisible: PropTypes.func,
  modalCartIsVisible: PropTypes.bool.isRequired,
};

LandingPage.defaultProps = {
  setModalVisible: () => {},
};

export default LandingPage;
