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
    console.log('authCtx.userCart :>> ', authCtx.userCart);
    // if (!props.cartProducts) {
    //   return;
    // }
    console.log('props.delivery :>> ', props.delivery);
    // const data = [
    //   {
    //     "Id": 2,
    //     "ProductId": 1,
    //     "ProductQuantity": 12
    //   },
    //   {
    //     "Id": 1,
    //     "ProductId": 1,
    //     "'ProductQuantity": 1    
    //   }
    // ]
    console.log('authCtx.userCart :>> ', authCtx.userCart);
    const data = authCtx.userCart.map((cart) => {
      return {
        "Id": cart.id,
        "ProductId": cart.id,
        "ProductQuantity": cart.quantity,
      }
    })
    const totalPurchase = authCtx.userCart.map((item) => item.itemPrice).reduce((a, b) => a + b, 0);
    axios.post(`https://localhost:5001/api/order/${authCtx.personId}/${props.delivery.isHomeDelivery ? 1 : 2}/${totalPurchase}`, data).then((response) => {
      console.log('response :>> ', response);
      setStripeToken(response.data);
    });
    // const test = async () => {
    //   axios.post("https://localhost:5001/api/order", data);
    // };
    // const newCustomerPurchase = {
    //   id: 1,
    //   productQuantity: props.cartProducts.productQuantity ? props.cartProducts.productQuantity : 1,
    //   totalPurchase: props.cartProducts.price,
    //   paymentMethodId: 1,
    //   deliveryTypeId: props.delivery.isHomeDelivery ? 1 : 2,
    //   customerId: authCtx.personId,
    //   productId: props.cartProducts.id,
    //   createdat: 0,
    //   updatedat: 0,
    // };
    // console.log('newCustomerPurchase :>> ', newCustomerPurchase);
    // console.log('newCustomerPurchase :>> ', props.cartProducts);
    // axios.post(
    //   `https://localhost:5001/api/customerpurchase/session/${props.cartProducts.id}`, 
    //   newCustomerPurchase
    // )
    // .then((response) => {
    //   setStripeToken(response.data);
    // })
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
  delivery: PropTypes.object,
};

export default PurchaseStripeIntegration;