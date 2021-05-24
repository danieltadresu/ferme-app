
import { Button, Result } from "antd";
import classes from './PurchaseRejectedNotification.module.css'

const PurchaseRejectedNotification = () => {
  return (
    <div className={classes.container}>
      <section className={classes.box}>
        <div className={classes.wrapper}>
          <Result
            status="error"
            title="Compra rechazada con éxito"
            extra={
              <Button
                type="primary"
                key="console"
                style={{marginTop: '1rem'}}
              >
                Volver al Catálogo
              </Button>
            }
          />
        </div>
      </section>
    </div>
  );
};

export default PurchaseRejectedNotification;
