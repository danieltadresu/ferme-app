
import { Button, Result } from "antd";
import classes from './PurchaseSuccessNotification.module.css'

const PurchaseSuccessNotification = () => {

  const billDocument = `https://localhost:5001/api/file/bill/1`;

  return (
    <div className={classes.container}>
      <section className={classes.box}>
        <div className={classes.wrapper}>
          <Result
            status="success"
            title="Compra generada con éxito"
            extra={[
                <Button
                  type="primary"
                  key="console"
                  style={{marginTop: '1rem'}}
                >
                  Ver Detalle de Compra
                </Button>,
                <Button
                  type="primary"
                  key="console"
                  style={{marginTop: '1rem'}}
                  href={billDocument}
                >
                  Descargar Boleta
                </Button>,
            ]}
          />
        </div>
      </section>
    </div>
  );
};

export default PurchaseSuccessNotification;
