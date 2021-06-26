import React, { useContext } from "react";
import PropTypes from "prop-types";
import classes from "./OperationsMenu.module.css";
import { Alert, Row, Col, Collapse, Button, Card, Space } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import TextLoop from "react-text-loop";
import AuthContext from "../../../../store/auth-context";
const OperationsMenu = (props) => {
  const authCtx = useContext(AuthContext);

  const selectedItemHandler = (val) => {
    console.log("val :>> ", val);
    props.selectedItem(val);
  };

  return (
    <div className={classes["operations-menu"]}>
      <div className={classes.container}>
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={16} xl={12}>
            <Collapse accordion>
              <Collapse.Panel
                header="Órdenes de Compra de Productos"
                key="3"
              >
                <Collapse defaultActiveKey="2">
                  <Collapse.Panel
                    header="Generar orden de Compra de Productos"
                    key="1"
                    collapsible={
                      authCtx.roleAccess !== "ADMIN" ? "disabled" : "header"
                    }
                  >
                    <Alert
                      message="Información"
                      showIcon
                      description="Acá podrás generar nuevas órdenes de compra, las cuales seran enviadas vía correo electrónico a tu Proveedor"
                      type="info"
                      action={
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => selectedItemHandler(5)}
                        >
                          VER
                        </Button>
                      }
                    />
                  </Collapse.Panel>
                  <Collapse.Panel
                    header="Consultar información de Ordenes de Compra"
                    key="2"
                  >
                    <Alert
                      message="Información"
                      showIcon
                      description={
                        <TextLoop mask>
                          <span>
                            Acá podrás consultar información de las órdenes de
                            Compra
                          </span>
                          <span>Actualizar sus datos</span>
                          <span>Eliminar órdenes de compra</span>
                        </TextLoop>
                      }
                      type="warning"
                      action={
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => selectedItemHandler(6)}
                        >
                          IR AL FORMULARIO
                        </Button>
                      }
                    />
                  </Collapse.Panel>
                </Collapse>
              </Collapse.Panel>
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
                  <Collapse.Panel
                    header="Consultar información de Producto"
                    key="2"
                  >
                    <Alert
                      message="Información"
                      showIcon
                      description={
                        <TextLoop mask>
                          <span>
                            Acá podrás consultar información de Productos
                          </span>
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
              <Collapse.Panel
                header="Administración de Boletas y Facturas"
                key="2"
                collapsible={
                  authCtx.roleAccess !== "ADMIN" ? "disabled" : "header"
                }
              >
                <Collapse defaultActiveKey="1">
                  <Collapse.Panel
                    header="Ingresar nueva Boleta o Factura"
                    key="1"
                  >
                    <Alert
                      message="Información"
                      showIcon
                      description="Acá podrás ingresar las nuevas boletas o facturas cuando las ventas se realizan de manera presencial en el local."
                      type="info"
                      action={
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => selectedItemHandler(3)}
                        >
                          IR AL FORMULARIO
                        </Button>
                      }
                    />
                  </Collapse.Panel>
                  <Collapse.Panel
                    header="Consultar información de Boletas y Facutas"
                    key="2"
                  >
                    <Alert
                      message="Información"
                      showIcon
                      description={
                        <TextLoop mask>
                          <span>
                            Acá podrás consultar información de
                            <br />
                            todas las Boletas y Facturas
                            <br />
                            que han sido ingresadas al sistema
                          </span>
                          <span>Actualizar sus datos</span>
                          <span>Descargar de Boletas y Facturas</span>
                        </TextLoop>
                      }
                      type="warning"
                      action={
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => selectedItemHandler(4)}
                        >
                          VER
                        </Button>
                      }
                    />
                  </Collapse.Panel>
                </Collapse>
              </Collapse.Panel>
              <Collapse.Panel
                header="Administración de Usuarios del Sistema"
                key="4"
                // collapsible="disabled"
                collapsible={
                  authCtx.roleAccess !== "ADMIN" ? "disabled" : "header"
                }
              >
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
                          onClick={() => selectedItemHandler(7)}
                        >
                          IR AL FORMULARIO
                        </Button>
                      }
                    />
                  </Collapse.Panel>
                  <Collapse.Panel
                    header="Consultar información de Usuarios"
                    key="2"
                  >
                    <Alert
                      message="Información"
                      showIcon
                      description={
                        <TextLoop mask>
                          <span>
                            Acá podrás consultar información de los Usuarios del
                            Sistema
                          </span>
                          <span>Actualizar sus datos</span>
                          <span>Eliminar usuarios</span>
                          <span>
                            Asignar roles y permisos dentro del sistema
                          </span>
                        </TextLoop>
                      }
                      type="warning"
                      action={
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => selectedItemHandler(8)}
                        >
                          VER
                        </Button>
                      }
                    />
                  </Collapse.Panel>
                </Collapse>
              </Collapse.Panel>
              <Collapse.Panel
                header="Reportería"
                key="5"
                collapsible={
                  authCtx.roleAccess !== "ADMIN" ? "disabled" : "header"
                }
              >
                <Collapse defaultActiveKey="1">
                  <Collapse.Panel
                    header="Informe de Stock de Productos"
                    key="1"
                  >
                    <Alert
                      message="Stock de Productos"
                      showIcon
                      description=""
                      type="info"
                      action={
                        <Space size="middle">
                          <a
                            style={{
                              color: "#0918EB",
                              cursor: "pointer",
                              fontSize: ".8rem",
                            }}
                            target="_blank"
                            href={
                              "https://localhost:5001/api/file/stock-report"
                            }
                          >
                            <FileSearchOutlined /> Ver Informe
                          </a>
                        </Space>
                      }
                    />
                  </Collapse.Panel>
                  <Collapse.Panel header="Informe de Productos" key="2">
                    <Alert
                      message="Productos"
                      showIcon
                      description=""
                      type="info"
                      action={
                        <Space size="middle">
                          <a
                            style={{
                              color: "#0918EB",
                              cursor: "pointer",
                              fontSize: ".8rem",
                            }}
                            target="_blank"
                            href={
                              "https://localhost:5001/api/file/product-report"
                            }
                          >
                            <FileSearchOutlined /> Ver Informe
                          </a>
                        </Space>
                      }
                    />
                  </Collapse.Panel>
                  <Collapse.Panel header="Informe de Proveedores" key="3">
                    <Alert
                      message="Proveedores"
                      showIcon
                      description=""
                      type="info"
                      action={
                        <Space size="middle">
                          <a
                            style={{
                              color: "#0918EB",
                              cursor: "pointer",
                              fontSize: ".8rem",
                            }}
                            target="_blank"
                            href={
                              "https://localhost:5001/api/file/provider-report"
                            }
                          >
                            <FileSearchOutlined /> Ver Informe
                          </a>
                        </Space>
                      }
                    />
                  </Collapse.Panel>
                  <Collapse.Panel header="Informe de Ventas" key="4">
                    <Alert
                      message="Ventas Totales"
                      showIcon
                      description=""
                      type="info"
                      action={
                        <Space size="middle">
                          <a
                            style={{
                              color: "#0918EB",
                              cursor: "pointer",
                              fontSize: ".8rem",
                            }}
                          >
                            <FileSearchOutlined /> Ver Informe
                          </a>
                        </Space>
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
