import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./PurchaseSuccessNotification.module.css";

const PurchaseSuccessNotification = () => {
  const { id } = useParams();
  const [orderId, setOrderId] = useState(id);
  const billDocument = `https://localhost:5001/api/file/bill/${orderId}`;

  useEffect(() => {
    console.log('id :>> ', orderId);
  }, [orderId]);

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
                style={{ marginTop: "1rem" }}
              >
                Ver Detalle de Compra
              </Button>,
              <Button
                type="primary"
                key="console"
                style={{ marginTop: "1rem" }}
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
