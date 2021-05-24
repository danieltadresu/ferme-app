import { useEffect, useState } from 'react';
import { Result, Button } from 'antd';
import "antd/dist/antd.css";
import classes from './PurchaseStripeIntegration.module.css';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51IrBoLEskkhmHZqbEdjFy7Xfe1AdcJd1prD4btlivss9FlYQ216jNri7Ljxp9KJTddknOMMUKU8OEX5LTsMwbJbx00tWQtUVKM");

const PurchaseStripeIntegration = () => {

  const [ stripeToken, setStripeToken ] = useState();

  const purchaseHandler = async () => {
    const newCustomerPurchase = {
      id: 1,
      productQuantity: 1,
      totalPurchase: 500,
      paymentMethodId: 1,
      deliveryTypeId: 1,
      customerId: 1,
      productId: 1,
      createdat: 0,
      updatedat: 0,
    };
    axios.post('https://localhost:5001/api/customerpurchase/session', newCustomerPurchase)
    .then((response) => {
      setStripeToken(response.data);
    })
  };

  const purchaseStripeHandler = async () => {
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      sessionId: stripeToken,
    });
  };

  useEffect(() => {
    purchaseStripeHandler();
  }, [stripeToken]);

  return (
    <div className={classes.container}>
      <Result
        title="A continuación serás redirigido hacia un sitio externo donde podrás realizar tu pago"
        subTitle="El sistema de pago se encuentra protegido y podrás realizar la operación con tranquilidad."
        extra={
          <Button
            type="primary"
            key="console"
            onClick={purchaseHandler}
          >
            Ir al sitio
          </Button>
        }
      />,
    </div>
  );
};

export default PurchaseStripeIntegration;