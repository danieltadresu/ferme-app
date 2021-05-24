import { Result, Button } from 'antd';
import "antd/dist/antd.css";
import classes from './PurchaseStripeIntegration.module.css';

const PurchaseStripeIntegration = () => {
  return (
    <div className={classes.container}>
      <Result
        title="A continuación serás redirigido hacia un sitio externo donde podrás realizar tu pago"
        subTitle="El sistema de pago se encuentra protegido y podrás realizar la operación con tranquilidad."
        extra={
          <Button type="primary" key="console">
            Ir al sitio
          </Button>
        }
      />,
    </div>
  );
};

export default PurchaseStripeIntegration;