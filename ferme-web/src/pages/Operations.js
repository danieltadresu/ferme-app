import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header/Header';
import OperationsMenu from '../components/Layout/Operations/OperationsMenu/OperationsMenu';
import AddProduct from '../components/Layout/Operations/AddProduct/AddProduct';
import ProductDetail from '../components/Layout/Operations/ProductDetail/ProductDetail';
import BillList from '../components/Layout/Operations/BillList/BillList';
import AddUser from '../components/Layout/Operations/AddUser/AddUser';
import UserList from '../components/Layout/Operations/UserList/UserList';
import AddOrder from '../components/Layout/Operations/AddOrder/AddOrder';
import OrderList from '../components/Layout/Operations/OrderList/OrderList';
import 'antd/dist/antd.css';
const Operations = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const itemChangeHandler = (value) => {
    console.log('value Operations!:>> ', value);
    setSelectedItem(value);
  };

  return (
    <>
      <Header />
      {selectedItem === 0 && <OperationsMenu selectedItem={itemChangeHandler} />}
      {selectedItem === 1 && <AddProduct selectedItem={itemChangeHandler} />}
      {selectedItem === 2 && <ProductDetail />}
      {selectedItem === 4 && <BillList selectedItem={itemChangeHandler} />}
      {selectedItem === 5 && <AddOrder selectedItem={itemChangeHandler} />}
      {selectedItem === 6 && <OrderList selectedItem={itemChangeHandler} />}
      {selectedItem === 7 && <AddUser selectedItem={itemChangeHandler} /> }
      {selectedItem === 8 && <UserList selectedItem={itemChangeHandler} /> }
    </>
  );
};

export default Operations;