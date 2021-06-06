import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../../store/auth-context';
import PropTypes from 'prop-types';
import { Result, Button } from 'antd';
import "antd/dist/antd.css";
import classes from './PurchaseStripeIntegration.module.css';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51IrBoLEskkhmHZqbEdjFy7Xfe1AdcJd1prD4btlivss9FlYQ216jNri7Ljxp9KJTddknOMMUKU8OEX5LTsMwbJbx00tWQtUVKM");

const PurchaseStripeIntegration = (props) => {

  const [ stripeToken, setStripeToken ] = useState();
  const authCtx = useContext(AuthContext);

  const purchaseHandler = async () => {
    if (!props.cartProducts) {
      return;
    }
    const newCustomerPurchase = {
      id: 1,
      productQuantity: 1,
      totalPurchase: props.cartProducts.price,
      paymentMethodId: 1,
      deliveryTypeId: 1,
      customerId: authCtx.personId,
      productId: props.cartProducts.id,
      createdat: 0,
      updatedat: 0,
      customerPurchaseCartId: 1,
    };
    axios.post(
      `https://localhost:5001/api/customerpurchase/session/${props.cartProducts.id}`, 
      newCustomerPurchase
    )
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
    if (stripeToken) {
      purchaseStripeHandler(); 
    }
  }, [stripeToken]);

  useEffect(() => {
    console.log('props.cartProducts :>> ', props.cartProducts);
  }, [props.cartProducts]);

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

PurchaseStripeIntegration.propTypes = {
  cartProducts: PropTypes.object,
};

export default PurchaseStripeIntegration;