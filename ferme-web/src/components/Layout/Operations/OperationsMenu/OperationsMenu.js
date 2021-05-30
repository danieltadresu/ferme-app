import PropTypes from 'prop-types';
import classes from './OperationsMenu.module.css';
import { Alert, Row, Col, Collapse, Button, Card } from 'antd';
import 'antd/dist/antd.css';
import TextLoop from 'react-text-loop';
const OperationsMenu = (props) => {

  const selectedItemHandler = (val) => {
    props.selectedItem(val);
  };

  return (
    <div className={classes['operations-menu']}>
      <div className={classes.container}>
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={16} xl={12}>
            <Collapse accordion>
              <Collapse.Panel header="Administración de Productos" key="1">
                <Collapse defaultActiveKey="1">
                <Collapse.Panel header="Crear Producto" key="1">
                  <Alert
                    message="Información"
                    showIcon
                    description="Acá podrás crear los nuevos productos de la Ferretería. Estos se verán en el catálogo."
                    type="info"
                    action={
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => selectedItemHandler(1)}
                      >
                        IR AL FORMULARIO
                      </Button>
                    }
                  />
                </Collapse.Panel>
                <Collapse.Panel header="Consultar información de Producto" key="2">
                  <Alert
                    message="Información"
                    showIcon
                    description={
                      <TextLoop mask>
                        <span>Acá podrás consultar información de Productos</span>
                        <span>Actualizar sus datos</span>
                        <span>Actualizar su stock</span>
                        <span>Eliminar el Producto</span>
                      </TextLoop>
                    }
                    type="warning"
                    action={
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => selectedItemHandler(2)}
                      >
                        IR AL FORMULARIO
                      </Button>
                    }
                  />
                </Collapse.Panel>
              </Collapse>
            </Collapse.Panel>
              <Collapse.Panel header="Administración de Boletas y Facturas" key="2">
                <p>Hey</p>
              </Collapse.Panel>
              <Collapse.Panel header="Administración de Órdenes de Compra" key="3">
              <Collapse defaultActiveKey="1">
                  <Collapse.Panel header="Generar orden de Compra de Productos" key="1">
                    <Alert
                      message="Información"
                      showIcon
                      description="Acá podrás generar nuevas órdenes de compra, las cuales seran enviadas vía correo electrónico a tu Proveedor"
                      type="info"
                      action={
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => selectedItemHandler(1)}
                        >
                          IR AL FORMULARIO
                        </Button>
                      }
                    />
                  </Collapse.Panel>
                  <Collapse.Panel header="Consultar información de Ordenes de Compra" key="2">
                    <Alert
                      message="Información"
                      showIcon
                      description={
                        <TextLoop mask>
                          <span>Acá podrás consultar información de las órdenes de Compra</span>
                          <span>Actualizar sus datos</span>
                          <span>Eliminar órdenes de compra</span>
                        </TextLoop>
                      }
                      type="warning"
                      action={
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => selectedItemHandler(2)}
                        >
                          IR AL FORMULARIO
                        </Button>
                      }
                    />
                  </Collapse.Panel>
                </Collapse>
              </Collapse.Panel>
                <Collapse.Panel header="Administración de Usuarios del Sistema" key="4">
                <Collapse defaultActiveKey="1">
                  <Collapse.Panel header="Crear Usuario" key="1">
                    <Alert
                      message="Información"
                      showIcon
                      description="Acá podrás crear nuevos usuarios del sistema, permitiendo asignar roles y permisos en el sistema"
                      type="info"
                      action={
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => selectedItemHandler(1)}
                        >
                          IR AL FORMULARIO
                        </Button>
                      }
                    />
                  </Collapse.Panel>
                  <Collapse.Panel header="Consultar información de Usuarios" key="2">
                    <Alert
                      message="Información"
                      showIcon
                      description={
                        <TextLoop mask>
                          <span>Acá podrás consultar información de los Usuarios del Sistema</span>
                          <span>Actualizar sus datos</span>
                          <span>Eliminar usuarios</span>
                          <span>Asignar roles y permisos dentro del sistema</span>
                        </TextLoop>
                      }
                      type="warning"
                      action={
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => selectedItemHandler(2)}
                        >
                          IR AL FORMULARIO
                        </Button>
                      }
                    />
                  </Collapse.Panel>
                </Collapse>
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
    </div>
  );
};

OperationsMenu.propTypes = {
  selectedItem: PropTypes.func,
};

OperationsMenu.defaultProps = {
  selectedItem: () => {},
};

export default OperationsMenu;