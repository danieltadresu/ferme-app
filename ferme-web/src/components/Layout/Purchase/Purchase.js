import React, { useState } from "react";
import { Row, Col, Tag, Card, Steps, Button, } from "antd";
import "antd/dist/antd.css";
import classes from './Purchase.module.css'
import PurchaseProducts from './PurchaseProducts/PurchaseProducts';
import PurchaseForm from './PurchaseForm/PurchaseForm';
import PurchaseSummary from './PurchaseSummary/PurchaseSummary';
import PurchaseStripeIntegration from './PurchaseStripeIntegration/PurchaseStripeIntegration';

const Purchase = () => {
  const [current, setCurrent] = React.useState(0);

  const steps = [
    {
      title: 'Resumen de Productos',
      content: <PurchaseProducts />,
    },
    {
      title: 'Datos de Compra',
      content: <PurchaseForm />,
    },
    {
      title: 'Detalle de Compra',
      content: <PurchaseSummary />,
    },
    {
      title: 'Ir a pagar',
      content: <PurchaseStripeIntegration />,
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
            <Card title="Proceso de Pago" style={{width: '100%'}} 
              extra={
                <>
                  <div className={classes['steps-action']}>
                    {current > 0 && (
                      <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
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

export default Purchase;
