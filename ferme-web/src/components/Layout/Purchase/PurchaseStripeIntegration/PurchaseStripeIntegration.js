import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../store/auth-context";
import PropTypes from "prop-types";
import { Result, Button } from "antd";
import "antd/dist/antd.css";
import classes from "./PurchaseStripeIntegration.module.css";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51IrBoLEskkhmHZqbEdjFy7Xfe1AdcJd1prD4btlivss9FlYQ216jNri7Ljxp9KJTddknOMMUKU8OEX5LTsMwbJbx00tWQtUVKM"
);

const PurchaseStripeIntegration = (props) => {
  const [stripeToken, setStripeToken] = useState();
  const authCtx = useContext(AuthContext);

  const purchaseHandler = async () => {
    const data = authCtx.userCart.map((cart) => {
      return {
        Id: cart.id,
        ProductId: cart.id,
        ProductQuantity: cart.quantity,
        ProductName: cart.name,
        ProductUnitPrice: cart.unitPrice,
      };
    });
    const totalPurchase = authCtx.userCart
      .map((item) => item.itemPrice)
      .reduce((a, b) => a + b, 0);
    const personId = authCtx.personId;
    const deliveryTypeId = props.delivery.isHomeDelivery ? 1 : 2;
    axios
      .post(
        `https://localhost:5001/api/order/${personId}/${deliveryTypeId}/${totalPurchase}`,
        data
      )
      .then((response) => {
        setStripeToken(response.data);
      });
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
          <Button type="primary" key="console" onClick={purchaseHandler}>
            Ir al sitio
          </Button>
        }
      />
      ,
    </div>
  );
};

PurchaseStripeIntegration.propTypes = {
  cartProducts: PropTypes.object,
  delivery: PropTypes.object,
};

export default PurchaseStripeIntegration;
