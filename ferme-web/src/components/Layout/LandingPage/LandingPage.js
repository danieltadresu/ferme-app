import React, { useState } from "react";
import { Row, Col, Tag, Card, Steps, Button, message } from "antd";
import classes from "./LandingPage.module.css";
import "antd/dist/antd.css";
import ProductList from './ProductList/ProductList';

const catalogFilter = {
  bestSellingProducts: 1,
  theCheapestProducts: 2,
  byCategories: 3,
};

const App = () => {
  const [current, setCurrent] = React.useState(0);

  const steps = [
    {
      title: 'Los más vendidos',
      content: <ProductList
        selectedItem={catalogFilter.bestSellingProducts}
      />,
    },
    {
      title: 'Los más económicos',
      content: <ProductList
        selectedItem={catalogFilter.theCheapestProducts}
      />,
    },
    {
      title: 'Según categoría',
      content: <ProductList 
        selectedItem={catalogFilter.byCategories}
      />,
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
            <Card title="Filtra tus productos" style={{width: '100%'}} 
              extra={
                <>
                  <div className={classes['steps-action']}>
                    {current > 0 && (
                      <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                      </Button>
                    )}
                    {current < steps.length - 1 && (
                      <Button type="primary" onClick={() => next()}>
                        Next
                      </Button>
                    )}
                  </div>
                </>
              }>
              <Steps current={current}>
                {steps.map(item => (
                  <Steps.Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className={classes['steps-content']}>{steps[current].content}</div>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default App;
